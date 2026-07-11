# ENCUESTAS — Checklist · Casa Santiago

Encuesta / checklist de "prueba de estancia" para la casa **Casa Santiago** de
LOHR Collection. App de página única (single-file): recorrido por áreas con
acordeones, evaluación Bien / Regular / Mal por punto, barra de progreso,
calificación 1–10, notas por área, veredicto final y resumen exportable a
WhatsApp o portapapeles. Guarda el avance en el propio dispositivo
(localStorage).

## Estructura

- `index.html` — la encuesta/checklist completa (HTML + CSS + JS embebidos). **Es la que se despliega.**
- `backup-guia-paseo-santiago.html` — respaldo de la guía de huéspedes de Paseo Santiago (proyecto distinto, no se despliega desde aquí).

## Despliegue

Conectado a Vercel (proyecto **checklist-casa-santiago**). Cada push a la rama
de producción redespliega automáticamente `index.html` en
`checklist-casa-santiago.vercel.app`.

## Desarrollo local

```bash
python3 -m http.server 8000   # abrir http://localhost:8000
```
