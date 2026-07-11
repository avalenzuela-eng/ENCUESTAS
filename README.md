# ENCUESTAS — Paseo Santiago · LOHR Collection

Guía digital de página única (single-file) para la propiedad **Paseo Santiago** de
LOHR Collection. Construida como un único `index.html` con estilos y scripts
embebidos, mapa Leaflet e imágenes en base64.

## Estructura

- `index.html` — la aplicación completa (HTML + CSS + JS + imágenes embebidas).

## Desarrollo

Al ser un archivo único, basta con abrir `index.html` en el navegador o servirlo
con cualquier servidor estático:

```bash
python3 -m http.server 8000
# luego abrir http://localhost:8000
```

## Despliegue

El proyecto se despliega en Vercel como sitio estático.
