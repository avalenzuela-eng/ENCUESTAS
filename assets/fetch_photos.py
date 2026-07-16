#!/usr/bin/env python3
"""
Descarga y optimiza las fotos del guide Paseo Santiago desde Wikimedia Commons.

Uso:
    pip install Pillow
    python3 assets/fetch_photos.py                 # platos + atracciones (fetch=true)
    python3 assets/fetch_photos.py --restaurants   # incluye fotos representativas de restaurantes
    python3 assets/fetch_photos.py --only chichen-itza uxmal   # solo algunos slugs
    python3 assets/fetch_photos.py --force         # re-descarga aunque ya exista el jpg

Requiere red abierta hacia commons.wikimedia.org y upload.wikimedia.org.
Genera assets/<slug>.jpg y actualiza assets/CREDITS.md con la atribución de cada foto.

Solo acepta licencias reutilizables comercialmente: CC0 / Public Domain /
CC-BY / CC-BY-SA. Cualquier imagen con otra licencia se descarta.
"""
import argparse, json, os, re, sys, time, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(HERE, "photos.manifest.json")
API = "https://commons.wikimedia.org/w/api.php"
UA = "PaseoSantiagoGuide/1.0 (LOHR Collection guest guide; contact a.valenzuela@agrans.com)"

# Sólo licencias libres para uso comercial (con o sin atribución).
FREE_RE = re.compile(r"(^cc0|public domain|^pd|^cc[\s-]?by([\s-]?sa)?\b)", re.I)


def api(params):
    params = {**params, "format": "json"}
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45) as r:
        return json.load(r)


def strip_html(s):
    return re.sub(r"<[^>]+>", "", s or "").strip()


def find_image(query):
    """Devuelve (info) del mejor candidato libre, o None."""
    try:
        r = api({
            "action": "query", "generator": "search",
            "gsrsearch": query, "gsrnamespace": 6, "gsrlimit": 25,
            "prop": "imageinfo",
            "iiprop": "url|size|mime|extmetadata",
            "iiurlwidth": 1600,
        })
    except Exception as e:
        print(f"    ! error API: {e}")
        return None
    pages = (r.get("query") or {}).get("pages") or {}
    cands = []
    for p in pages.values():
        ii = (p.get("imageinfo") or [None])[0]
        if not ii:
            continue
        mime = ii.get("mime", "")
        if mime not in ("image/jpeg", "image/png"):
            continue
        w, h = ii.get("width", 0), ii.get("height", 0)
        if w < 1000:
            continue
        md = ii.get("extmetadata", {})
        lic = md.get("LicenseShortName", {}).get("value", "")
        if not FREE_RE.search(lic or ""):
            continue
        author = strip_html(md.get("Artist", {}).get("value", "")) or "Wikimedia Commons"
        landscape = 1 if w >= h else 0
        score = landscape * 1_000_000 + min(w, 4000)  # prefiere horizontal y grande
        cands.append({
            "score": score, "title": p.get("title", ""),
            "thumburl": ii.get("thumburl") or ii.get("url"),
            "url": ii.get("url"), "w": w, "h": h,
            "license": lic, "author": author,
            "descurl": ii.get("descriptionurl", ""),
        })
    if not cands:
        return None
    cands.sort(key=lambda c: c["score"], reverse=True)
    return cands[0]


def optimize(src_bytes, dest, max_width, quality):
    from PIL import Image, ImageOps
    import io
    im = Image.open(io.BytesIO(src_bytes))
    im = ImageOps.exif_transpose(im)
    if im.mode not in ("RGB",):
        im = im.convert("RGB")
    if im.width > max_width:
        h = round(im.height * max_width / im.width)
        im = im.resize((max_width, h), Image.LANCZOS)
    im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--restaurants", action="store_true", help="incluye slugs de restaurantes (fetch=false)")
    ap.add_argument("--only", nargs="*", default=None, help="lista de slugs a procesar")
    ap.add_argument("--force", action="store_true", help="re-descarga aunque exista")
    args = ap.parse_args()

    cfg = json.load(open(MANIFEST, encoding="utf-8"))
    opt = cfg["optimize"]
    items = cfg["items"]

    if args.only:
        items = [i for i in items if i["slug"] in set(args.only)]
    else:
        items = [i for i in items if i.get("fetch") or (args.restaurants and i.get("type") == "resto")]

    credits = []
    ok = skip = fail = 0
    for it in items:
        slug, name, q = it["slug"], it["name"], it["q"]
        dest = os.path.join(HERE, slug + ".jpg")
        if os.path.exists(dest) and not args.force:
            print(f"= {slug}: ya existe, skip")
            skip += 1
            continue
        print(f"· {slug}: buscando \"{q}\" …")
        info = find_image(q)
        if not info:
            print(f"    ✗ sin candidato libre para {name}")
            fail += 1
            continue
        try:
            req = urllib.request.Request(info["thumburl"], headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=90) as r:
                data = r.read()
            optimize(data, dest, opt["max_width"], opt["quality"])
            kb = os.path.getsize(dest) // 1024
            print(f"    ✓ {os.path.basename(info['title'])} · {info['w']}x{info['h']} · {info['license']} → {kb} KB")
            credits.append({**it, **info})
            ok += 1
            time.sleep(0.4)  # cortesía con la API
        except Exception as e:
            print(f"    ✗ error descargando/optimizando: {e}")
            fail += 1

    # CREDITS.md (merge con lo ya existente por slug)
    write_credits(credits)
    print(f"\nListo. ok={ok} skip={skip} fail={fail}")
    if fail:
        print("Reintenta los que fallaron con --only <slug> o ajusta 'q' en photos.manifest.json")


def write_credits(new_rows):
    """Persiste en credits.json (merge por slug) y renderiza CREDITS.md."""
    jpath = os.path.join(HERE, "credits.json")
    data = {}
    if os.path.exists(jpath):
        try:
            data = json.load(open(jpath, encoding="utf-8"))
        except Exception:
            data = {}
    for r in new_rows:
        title = os.path.basename(r["title"]).replace("File:", "")
        data[r["slug"]] = {
            "name": r["name"], "author": r["author"],
            "license": r["license"], "file": title, "descurl": r["descurl"],
        }
    json.dump(data, open(jpath, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

    lines = [
        "# Créditos de fotos — Paseo Santiago",
        "",
        "Todas las imágenes provienen de **Wikimedia Commons** bajo licencias de uso libre",
        "(CC0 / Dominio Público / CC-BY / CC-BY-SA). Este archivo cumple el requisito de",
        "atribución. Generado automáticamente por `assets/fetch_photos.py`.",
        "",
        "| slug | lugar / plato | autor | licencia | archivo |",
        "| --- | --- | --- | --- | --- |",
    ]
    for slug in sorted(data):
        d = data[slug]
        lines.append(f"| `{slug}` | {d['name']} | {d['author']} | {d['license']} | [{d['file']}]({d['descurl']}) |")
    open(os.path.join(HERE, "CREDITS.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print(f"CREDITS.md actualizado ({len(data)} entradas)")


if __name__ == "__main__":
    main()
