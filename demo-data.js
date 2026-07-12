// Datos SIMULADOS para previsualizar el panel (resultados.html?demo=1).
// No son reales y no tocan Supabase. Se usan solo cuando la URL lleva ?demo=1.
window.DEMO_DATA = [
  {
    creado_en:"2026-07-12T20:15:00Z", evaluador:"Ana Robles", fecha:"2026-07-12", personas:"4",
    rating:8, recomienda:"Sí, claro", avance_bien:138, avance_reg:2, avance_mal:2, avance_total:149,
    items:{ "hab3::18":"mal", "hab1::18":"mal", "cocina::5":"reg", "tech::1":"reg" },
    notas:{ hab3:"El aire del cuarto de arriba tarda muchísimo en enfriar.", cocina:"La cafetera goteaba." },
    final:{ gusto:"La alberca al atardecer es una maravilla, nos la vivimos ahí.",
      molesto:"El cuarto de arriba seguía caliente aún con el aire al máximo.",
      falta:"Una secadora de ropa y más ganchos en los clósets.",
      libre:"En general muy bien; con esos detalles queda perfecta." },
    resumen:"⭐ 8/10 · Sí volvería. Focos: cuarto de arriba caliente, ruido calle cuarto 1, cafetera."
  },
  {
    creado_en:"2026-07-12T19:40:00Z", evaluador:"Sofía Marín", fecha:"2026-07-12", personas:"6",
    rating:7, recomienda:"Sí, claro", avance_bien:132, avance_reg:2, avance_mal:2, avance_total:149,
    items:{ "hab1::18":"mal", "tech::1":"reg", "cocina::5":"mal", "piscina::0":"reg" },
    notas:{ hab1:"El ruido de la calle se mete mucho de noche." },
    final:{ gusto:"La ubicación, todo a distancia de caminar.",
      molesto:"Se escucha muchísimo la calle en el cuarto 1, no dormí bien.",
      falta:"Una cafetera que de verdad sirva.", libre:"" },
    resumen:"⭐ 7/10 · Sí volvería. Focos: ruido cuarto 1, cafetera descompuesta, wifi lento."
  },
  {
    creado_en:"2026-07-12T18:05:00Z", evaluador:"Regina Paredes", fecha:"2026-07-12", personas:"5",
    rating:9, recomienda:"Sí, claro", avance_bien:140, avance_reg:1, avance_mal:0, avance_total:149,
    items:{ "tech::1":"reg" },
    notas:{},
    final:{ gusto:"El diseño de la casa, las fotos no le hacen justicia.",
      molesto:"Nada grave la verdad.",
      falta:"Blackout en el cuarto principal, entra mucha luz temprano.",
      libre:"La recomiendo totalmente." },
    resumen:"⭐ 9/10 · Sí volvería. Foco menor: wifi lento por la tarde."
  },
  {
    creado_en:"2026-07-12T16:30:00Z", evaluador:"Ximena Cortés", fecha:"2026-07-12", personas:"4",
    rating:6, recomienda:"Tal vez", avance_bien:120, avance_reg:3, avance_mal:2, avance_total:149,
    items:{ "hab3::18":"mal", "medio_bano::2":"mal", "limpieza::1":"reg", "hab2::8":"reg", "cocina::5":"reg" },
    notas:{ medio_bano:"Huele a drenaje, hay que revisar.", limpieza:"Olor a encierro al llegar." },
    final:{ gusto:"La terraza está increíble para la tarde.",
      molesto:"El medio baño tenía mal olor por el drenaje.",
      falta:"Más presión en el agua caliente del cuarto 2.",
      libre:"Con esos ajustes sería un 9." },
    resumen:"⭐ 6/10 · Tal vez. Focos: drenaje medio baño, cuarto arriba caliente, olor al llegar."
  },
  {
    creado_en:"2026-07-12T14:50:00Z", evaluador:"Fernanda Lara", fecha:"2026-07-12", personas:"8",
    rating:8, recomienda:"Sí, claro", avance_bien:136, avance_reg:0, avance_mal:2, avance_total:149,
    items:{ "hab1::18":"mal", "piscina::0":"mal" },
    notas:{ piscina:"Agua turbia al llegar, mejoró al segundo día." },
    final:{ gusto:"La cocina amplia, cocinamos para 8 sin problema.",
      molesto:"La piscina estaba algo verde el primer día.",
      falta:"Nada importante.", libre:"" },
    resumen:"⭐ 8/10 · Sí volvería. Focos: piscina turbia al inicio, ruido cuarto 1."
  },
  {
    creado_en:"2026-07-11T22:10:00Z", evaluador:"Carla Méndez", fecha:"2026-07-11", personas:"3",
    rating:5, recomienda:"No", avance_bien:110, avance_reg:3, avance_mal:3, avance_total:149,
    items:{ "hab3::18":"mal", "hab1::18":"mal", "tech::1":"reg", "cocina::5":"mal", "limpieza::1":"reg", "hab4::18":"reg" },
    notas:{ hab3:"Insoportable el calor arriba.", hab4:"Una cama se siente vencida." },
    final:{ gusto:"La sala es cómoda.",
      molesto:"Varios cuartos con problemas: el de arriba caliente y el 1 ruidoso.",
      falta:"Mantenimiento general antes de abrir.",
      libre:"Aún no la siento lista para recibir huéspedes." },
    resumen:"⭐ 5/10 · No volvería. Focos: calor arriba, ruido cuarto 1, cafetera, cama vencida."
  },
  {
    creado_en:"2026-07-11T20:00:00Z", evaluador:"Daniela Ruiz", fecha:"2026-07-11", personas:"4",
    rating:9, recomienda:"Sí, claro", avance_bien:141, avance_reg:2, avance_mal:0, avance_total:149,
    items:{ "tech::1":"reg", "hab2::8":"reg" },
    notas:{},
    final:{ gusto:"Todo impecable y la atención de la anfitriona.",
      molesto:"El wifi bajaba un poco en la tarde.",
      falta:"", libre:"Volvería sin dudarlo." },
    resumen:"⭐ 9/10 · Sí volvería. Focos menores: wifi tarde, agua caliente cuarto 2."
  },
  {
    creado_en:"2026-07-11T18:25:00Z", evaluador:"Paulina Vega", fecha:"2026-07-11", personas:"5",
    rating:7, recomienda:"Tal vez", avance_bien:130, avance_reg:2, avance_mal:1, avance_total:149,
    items:{ "hab1::18":"mal", "cocina::5":"reg", "piscina::0":"reg" },
    notas:{ hab1:"La ventana no aísla el ruido." },
    final:{ gusto:"El jardín y las plantas, muy cuidados.",
      molesto:"El ruido de la calle en el cuarto 1.",
      falta:"Cortinas más gruesas.", libre:"" },
    resumen:"⭐ 7/10 · Tal vez. Focos: ruido cuarto 1, cafetera, piscina."
  },
  {
    creado_en:"2026-07-11T16:40:00Z", evaluador:"Mariana Soto", fecha:"2026-07-11", personas:"6",
    rating:8, recomienda:"Sí, claro", avance_bien:137, avance_reg:2, avance_mal:0, avance_total:149,
    items:{ "hab3::18":"reg", "tech::1":"reg" },
    notas:{},
    final:{ gusto:"La alberca y el ambiente en general.",
      molesto:"El cuarto de arriba un poco caluroso a mediodía.",
      falta:"Un ventilador extra arriba.", libre:"Muy linda experiencia." },
    resumen:"⭐ 8/10 · Sí volvería. Focos menores: calor arriba, wifi."
  },
  {
    creado_en:"2026-07-11T13:15:00Z", evaluador:"Valeria Núñez", fecha:"2026-07-11", personas:"4",
    rating:4, recomienda:"No", avance_bien:105, avance_reg:1, avance_mal:3, avance_total:149,
    items:{ "hab3::18":"mal", "limpieza::1":"mal", "medio_bano::2":"reg", "cocina::5":"mal" },
    notas:{ limpieza:"Polvo en repisas y olor a encierro.", cocina:"La cafetera no encendía." },
    final:{ gusto:"La ubicación.",
      molesto:"Llegó con olor a encierro y el cuarto de arriba caliente.",
      falta:"Limpieza mucho más a fondo.",
      libre:"Le falta para el precio que se pretende cobrar." },
    resumen:"⭐ 4/10 · No volvería. Focos: limpieza/olor, calor arriba, cafetera."
  }
];
