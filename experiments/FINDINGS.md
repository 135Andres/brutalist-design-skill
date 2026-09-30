# Hallazgos de experimentos

> Experimentos del modo creativo y de edición, hechos con el brief de un proyecto privado
> que **no está en este repositorio**. Aquí solo quedan las lecciones generales para la
> skill, sin contenido de ese proyecto. Reacciones del maintainer: resumidas o citadas
> cuando no revelan el proyecto. El agente no puntúa; el maintainer juzga.

## Modo creativo — formatos probados

| Formato | Qué es | Resultado |
|---|---|---|
| 1 · Preguntas digeribles | 5 preguntas con opciones **visuales** (bosquejos ASCII como vista previa), luego un bosquejo construido | Reacción al formato: «Me inspiró». Al bosquejo: bueno y fluido; «se parece mucho a como lo mostró en la terminal»; la tipografía enorme, «muucho ruido» |
| 2 · Bosquejos primero, desde imágenes | 4 bosquejos divergentes sin preguntar, **cada uno inspirado en una imagen de referencia** (#35–#38), tomando principios, no textos ni marcas | reacción pendiente |
| 3 · Provocaciones | 3 premisas inesperadas, una frase + un bosquejo cada una | sin probar |
| 4 · DERIVAR clásico | una referencia → principios explícitos → 3 direcciones | sin probar |

Lecciones:
- Una respuesta del maintainer a veces **no elige** y trae una idea propia (una
  animación): las preguntas deben dejar espacio a eso.
- Las vistas previas ASCII en las preguntas se parecieron al resultado construido, y el
  maintainer lo valoró.
- La orientación del maintainer es **explorar muchos diseños**, no converger pronto (A-2).

## Editar una página ya hecha — primera prueba

Sobre un bosquejo propio del agente (limitación: conoce el código y la intención;
**falta una prueba sobre una página ajena**).

1. **Primer intento — recomponer.** El maintainer eligió, sobre una vista previa ASCII,
   reordenar la página. Ya construida, la rechazó: «Me gustó menos que el anterior». Solo
   se salvó lo que **menos** cambió.
2. **Segundo intento — cambio mínimo.** La página original intacta; solo la tipografía
   grande, con 4 familias × 2 escalas conmutables en vivo. En pausa sin elección
   («podemos dejar este diseño para luego»).

Lecciones para la sección de edición:
- **Una elección sobre bosquejo es una hipótesis**, no un criterio cerrado: construir
  barato y enseñar antes de dar la edición por buena.
- **Sobre una página que gusta, empezar por el cambio mínimo** que resuelve la queja
  concreta; escalar (reestilizar → recomponer) solo si no basta.
- Mapear cada movimiento a un playbook existente (Impeccable: `quieter`, `bolder`,
  `delight`, `typeset`; claude-design: RESTYLE vs RECOMPOSE) funcionó como registro.
- «Darle sazón» no puede significar «más grande»: carácter por comportamiento y detalle.
- Arreglar la **verdad** de la página antes de pulir su diseño.
- Una variante conmutable en vivo (familia/escala) deja comparar sin rehacer.

## Verificación — lecciones técnicas

- Las comprobaciones automáticas **fallan en silencio**: un texto cortado por
  `overflow:hidden` no da overflow de página; hubo que medir cada elemento contra su
  escenario. Siempre mirar capturas.
- Líneas ocultas con `opacity:0` siguen ocupando sitio: un auto-scroll al final mostraba
  una caja vacía. Ocultar con `display:none` + animación de entrada.
- Una familia ancha a la escala de una condensada se sale: el «mismo tamaño» es el mayor
  que cabe.
- Filtros SVG (goo + iluminación) dan relieve 3D blando en el peldaño nativo; las formas
  pequeñas pueden no pasar el umbral del filtro.
- `-webkit-text-stroke` sobre fuentes variables deja ver solapes internos de contornos.
- Movimiento automático > 5 s en paralelo con contenido: botón de pausa (WCAG 2.2.2).

Herramienta de capturas: [`../tools/shots.mjs`](../tools/shots.mjs).
