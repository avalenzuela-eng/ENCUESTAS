-- ============================================================
-- Tabla de respuestas · Checklist Casa Santiago (LOHR)
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- ============================================================

create table if not exists public.respuestas (
  id           uuid primary key default gen_random_uuid(),
  creado_en    timestamptz not null default now(),
  evaluador    text,
  fecha        text,
  personas     text,
  rating       integer,
  recomienda   text,
  avance_bien  integer,
  avance_reg   integer,
  avance_mal   integer,
  avance_total integer,
  items        jsonb,
  notas        jsonb,
  final        jsonb,
  resumen      text
);

-- Seguridad a nivel de fila (RLS)
alter table public.respuestas enable row level security;

-- Cualquiera (rol anon) puede INSERTAR una respuesta (la encuesta es pública),
-- pero NADIE anónimo puede LEER las respuestas de otros. Tú las ves desde el
-- panel de Supabase (Table editor) o las exportas a CSV.
drop policy if exists "anon puede insertar respuestas" on public.respuestas;
create policy "anon puede insertar respuestas"
  on public.respuestas
  for insert
  to anon
  with check (true);
