# assets/ — Fotos del guide Paseo Santiago

El guide (`backup-guia-paseo-santiago.html`) muestra una foto por cada **plato**
y cada **lugar**. Cada tarjeta apunta a `assets/<slug>.jpg`. Si el archivo no
existe todavía, la tarjeta cae con elegancia al degradado (no se rompe nada).

## Poblar las fotos (stock libre, licencia comercial)

Requiere una red con salida a `commons.wikimedia.org` y `upload.wikimedia.org`
(el entorno de Claude en la web bloquea esos hosts por política de red, así que
esto se corre en una máquina con red abierta):

```bash
pip install Pillow
python3 assets/fetch_photos.py                 # 11 platos + 23 atracciones
python3 assets/fetch_photos.py --restaurants   # además, foto representativa por restaurante
python3 assets/fetch_photos.py --only uxmal chichen-itza   # re-hacer algunos
python3 assets/fetch_photos.py --force         # re-descargar todo
```

El script:
1. Busca en **Wikimedia Commons** el término `q` de cada ítem en `photos.manifest.json`.
2. Acepta sólo licencias libres para uso comercial: **CC0 / Dominio Público / CC-BY / CC-BY-SA**.
3. Prefiere fotos horizontales y de buena resolución.
4. Optimiza con Pillow a **máx. 1000px de ancho, JPEG calidad 82** (~100–250 KB).
5. Escribe `assets/<slug>.jpg` y actualiza `CREDITS.md` + `credits.json` con la atribución.

## Ajustar una foto

¿No te gustó la que eligió? Cambia el término `q` de ese slug en
`photos.manifest.json` y vuelve a correr con `--only <slug> --force`. O reemplaza
el `assets/<slug>.jpg` a mano (respeta el nombre del slug).

## Restaurantes

Los 15 restaurantes específicos (Kuuk, Micaela, Apoala…) tienen `fetch:false`
porque una foto de stock genérica no es ese local. La tarjeta ya está lista para
foto: basta con dejar un `assets/resto-<slug>.jpg` real, o correr
`--restaurants` para una imagen **representativa** de su tipo de cocina (queda
marcada como representativa en `CREDITS.md`).

## Atribución

`CREDITS.md` se genera solo y cumple el requisito de atribución de CC-BY/CC-BY-SA.
Si publicas el guide de cara a huéspedes y alguna foto quedó CC-BY(-SA), conviene
enlazar `CREDITS.md` desde el pie del guide.
