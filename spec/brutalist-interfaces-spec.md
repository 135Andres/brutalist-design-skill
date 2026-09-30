# Especificación — skill general de diseño brutalista (`brutalist-interfaces`)

> **BORRADOR — 2026-09-29.** Especificación en construcción, no la skill. Diseñada por
> secciones en una sesión de Claude Code (Opus 5.5) con revisión del maintainer sección a
> sección. Las decisiones que la gobiernan están en
> [`DECISIONS.md`](../decisions/DECISIONS.md) (`[DR5-n]`, `[A-n]`). Nada de este
> documento es una decisión del maintainer salvo lo que cita `[DR5]`; lo marcado
> `[propuesta]` es del agente.

## Estado de las secciones

| Sección | Estado | Fecha |
|---|---|---|
| 1 — RECREAR (`references/recreate.md`) | **Cerrada** por el maintainer (rev. 5) | 2026-09-29 |
| 2 — Movimiento (`references/motion.md`) | **Rev. 3, pendiente de revisión** | 2026-09-29 |
| Escalera (`references/effects.md`) | Definida aquí (transversal a S1 y S2); pendiente de revisión con S2 | 2026-09-29 |
| `references/resources.md` | Puntero mínimo, pendiente de revisión con S2 | 2026-09-29 |
| 3 — Modo creativo (DERIVAR es una forma posible) | **Experimental**: no se especifica hasta experimentar (adenda al quinto ciclo) | 2026-09-29 |
| Editar páginas ya hechas («darle más sazón») | **Propuesta del maintainer, sin especificar**: ¿modo propio o parte del modo creativo? Primera prueba de la capacidad (sobre artefacto propio; falta una sobre página ajena): [`../experiments/FINDINGS.md`](../experiments/FINDINGS.md) | 2026-09-29 |
| Pendientes | `SKILL.md` (distribuidor), `verify.md`, `critique.md`, `stacks.md`, instalador por herramienta, pruebas | — |

## Etiquetas de origen

`[DR5-n]` / `[A-n]` [`DECISIONS.md`](../decisions/DECISIONS.md) · `[CD]` claude-design/SKILL.md
(adaptación local de una skill de diseño) · `[Impeccable]` pbakaus/impeccable ·
`[prev]` investigación y método previos, hechos en un contexto privado y **no incluidos**
en este repositorio (solo se porta el método, generalizado) · `[WCAG]` norma externa ·
`[propuesta]` del agente.

## Marco

- Skill **general** `[DR5-1]`; dos modos, RECREAR y un modo creativo `[DR5-2]`, `[A-1]`;
  stack del proyecto `[DR5-3]`; formato Agent Skills con carga por capas `[DR5-6]`.
- Del trabajo previo `[prev]` se porta **solo el método** (referencia→principio,
  composición, interacción, motion, verificación, crítica) y los pitfalls de navegador,
  generalizados. Las reglas propias del proyecto de origen **se dejan atrás**.
- La skill **no depende de ninguna web en tiempo de ejecución**.
- **La skill no le impone nada al usuario** (instrucción del maintainer, 2026-09-29).
  RECREAR reproduce fielmente, sin sermón de originalidad. La exigencia de carácter y
  autenticidad recae sobre lo que la **skill produce** en su modo creativo, nunca sobre
  el usuario. Sin puntuación, sin checklist, sin juicio al usuario; la autoevaluación no
  prueba calidad: el humano juzga el resultado.

## Vocabulario (propio de la skill)

**Estado epistémico** — solo para propiedades de la referencia:

| Estado | Significado |
|---|---|
| `observed` | visible directamente (texto legible, proporción en píxeles) |
| `measured` | calculado desde píxeles observados con una regla declarada y repetible |
| `estimated` | juicio visual; método explícito, confianza baja por defecto; nunca se presenta como `measured` |
| `ambiguous` | varias lecturas posibles, listadas |
| `unknown` | no determinable desde la referencia |


**Inventario en tres partes** (no se mezclan):

| Parte | Marcador |
|---|---|
| Referencia | estado epistémico (tabla anterior) |
| Inferencias | `INFERENCE` — lectura sobre algo no visible (término ya usado en `[prev]`) |
| Supuestos y decisiones | `DECISION` — motivo, confianza, a qué afecta; sin estado epistémico |

**Informe** — una fila por elemento: elemento · dimensión · **acción** · **fidelidad** ·
**estado** · evidencia · método.

- Acción: `CONSTRUIDO · SUSTITUIDO · AÑADIDO · INVENTADO · OMITIDO`.
- Fidelidad (solo filas con contraparte en la referencia, bajo las condiciones registradas):
  `REPRODUCIDO` (coincide bajo las condiciones registradas; no «idéntico») ·
  `APROXIMADO` (diferencia visible, reconocibilidad conservada; si es efecto de identidad,
  además pérdida grave) · `DIVERGENTE` · `NO COMPARADO` (hecho del proceso) · `—` (sin
  contraparte).
- Estado: vocabulario epistémico.
- Sin totales, porcentajes ni puntuación.

---

## Escalera — `references/effects.md` (transversal)

**Hogar único** de la escalera y de la regla de peldaño; `recreate.md` y `motion.md` la
referencian, no la repiten.

### Peldaños `[DR5-4]`

1. **Nativo del navegador** — estático: CSS, filtros/máscaras SVG *(subdivisión:
   propuesta)*; movimiento: transiciones/animaciones CSS, Web Animations, scroll-driven,
   View Transitions, `linear()`.
2. **Librería de animación** — solo movimiento (para lo estático se salta).
3. **WebGL / shaders** — estático y movimiento.

**Vía alternativa** `[propuesta]`: **asset pre-renderizado** (imagen/vídeo). No es un
peldaño «más potente»; es el recurso cuando lo vivo no es viable. Fidelidad `APROXIMADO`
si sustituye algo interactivo.

La escalera es agnóstica: **no lista herramientas**. Las herramientas concretas viven en
`resources.md`.

Eje de **intensidad visual**: descriptivo, no ordena.

### Papel de un efecto (RECREAR)

- **Identidad**: sin él la referencia deja de ser reconocible.
- **Decoración**: el resto.
- Disputa conservada: un análisis previo `[prev]` clasificó el ticker de #37 como
  decorativo con el criterio «¿revela información?»; con el de RECREAR («¿se reconoce sin
  él?») es probablemente identidad. Cada criterio vale en su modo.

### Regla de peldaño — coste y permiso separados

- **Coste (peldaño por defecto)**: el **mayor** de
  (a) el que exige el **aspecto estático** para ser fiel (un efecto de identidad se
  construye en el peldaño necesario; si se aproxima, pérdida grave avisada antes de
  entregar), y
  (b) el que exige el **movimiento según la referencia** — solo una fuente animada puede
  exigirlo.
  El movimiento inventado **prefiere el peldaño más bajo que lo consiga**.
- **Permiso**: inventar movimiento que requiera un peldaño **mayor** que el de coste
  **se permite si se declara**: `DECISION` + motivo concreto (p. ej. «interrupción
  conservando velocidad, que CSS no hace»). Lo que no se admite es **subir en silencio**.
  *(Formulación pendiente de la pregunta abierta B.)*

---

## Sección 1 — RECREAR (`references/recreate.md`) — CERRADA (rev. 5)

Se carga desde el `SKILL.md` distribuidor. Referencia, sin duplicar, `derive.md`,
`motion.md`, `effects.md`, `verify.md`, `critique.md` de la misma skill.

### 0. Derechos, antes de medir `[CD:575-590]`, adaptado

- Reproducción literal admisible: diseño propio del usuario; licencia que lo permite;
  dominio público; ejercicio de estudio no publicado como obra propia.
- Fuera de límites siempre: publicar como propia la identidad distintiva de otra marca
  (logotipo, marca denominativa, pantallas de marca, copy con copyright).
- Derechos desconocidos: se recrea como estudio, archivos marcados
  `study — not for publication`, y el informe lo dice. Qué hacer con el resultado lo
  decide el usuario; la skill no le redirige a otro modo.
- El paso 0 es higiene legal para no exponer al usuario, no un mandato de creatividad.
- La skill no verifica licencias; registra lo que el usuario declara.
- «Never to copy» venía de un método previo `[prev]` con el alcance de otro proyecto; no
  aplica a RECREAR `[DR5-1]`.

### 1. Clasificar la referencia

Por imagen y, si es mixta, por región: captura plana · foto de pantalla · mockup en
dispositivo (perspectiva) · escaneo/impreso · render o composición 3D · póster/collage
(no-UI).

- Solo en regiones de captura plana se miden retícula y métricas tipográficas; en las
  demás se registra carácter observado, no medidas.
- Ejemplo: #36 es captura plana con regiones render 3D (logotipo en bloques, torre)
  `[prev]`: se mide la sidebar, no la torre.
- Si la imagen no es UI, qué parte es navegable es invención y se etiqueta.

### 2. Inventario (`inventory.md`, antes del código; tres partes)

**Referencia**
- Lienzo: proporción en píxeles `observed`.
- Retícula horizontal: fracción del ancho `measured` (invariante a DPR y escala); px solo
  con DPR conocido.
- Ritmo vertical: escala propia relativa a una unidad observada (interlineado o altura x
  del cuerpo), no % del ancho.
- Texto: transcripción literal (caja, saltos, puntuación) `observed`; `[ilegible]`;
  lectura parcial `ambiguous` con candidatas.
- Tipografía por papel: clasificación, peso, caja, tracking, tamaño relativo
  `observed`/`measured`. Identificación: `observed` si es inequívoca, si no `ambiguous`
  con candidatas.
- Paleta: `scripts/sample_palette` (archivo) registra región, nº de píxeles y método
  (mediana de parche plano / clúster) → `measured`; advertencias: antialiasing, perfil de
  color, compresión, degradados. A ojo → `estimated`, método «visual».
- Efectos: cada uno con papel (identidad/decoración) y coste (`effects.md`).
- Estados (hover, foco, activo, carga, vacío, error, comportamiento): `unknown`.
- Fuera del recorte: `unknown`.
- Rasgos que sugieren movimiento: `observed` (ver S2 §1).

**Inferencias** — ver S2 §1.

**Supuestos y decisiones**
- Ancho CSS y DPR supuestos (p. ej. «1440 CSS px, DPR 1»): elegidos una vez, usados en
  construcción y comparación. DPR conocido de verdad → pasa a Referencia `observed`.
- Fuente sustituta: confianza alta/media/baja; cambia métricas y saltos de línea; se
  compensa ajustando tamaño/tracking hasta igualar el corte de la línea más visible, y se
  declara. En el informe: fila `SUSTITUIDO`.
- Assets: reproducir (derechos, o geometría trivial) / sustituir (placeholder de mismas
  proporciones y tono) / omitir; licencia de fuentes sustitutas.

### 3. Efectos

Ver `effects.md` (papel, escalera, regla de peldaño). Orden de construcción: estructura
**junto con** efectos de identidad → tipografía → color y textura → decoración.

### 4. Construcción

- Stack detectado `[DR5-3]`.
- Horizontal en `%`/`fr`/`vw` con `clamp`; vertical en unidades de la escala de ritmo
  (`em`/`rem`/`lh`).
- **Build de fidelidad**: se añaden solo cosas que no cambian el aspecto en reposo —
  semántica, anillo de foco, alt, `prefers-reduced-motion` — marcadas `AÑADIDO`.
- **Contraste < AA** `[DR5-7]`: aviso en el informe con pares y ratios medidos;
  corrección como **variante separada** (`build-a11y`) marcada `AÑADIDO`; nunca dentro
  del build de fidelidad.

### 5. Comparación (rúbrica fija)

- Condiciones registradas: viewport = ancho supuesto × alto proporcional; DPR supuesto;
  zoom 100 %; fuentes cargadas (`document.fonts.ready`); animaciones congeladas en su
  estado inicial.
- Contenido constante (texto transcrito; sustitutos de igual tamaño): forma contra forma.
- Sin circularidad: no valida el ancho supuesto; los ratios siguen comparables.
- Diferencias por dimensión del inventario, no por impresión.
- `scripts/overlay.html` (superposición con opacidad regulable) + diff de píxeles
  opcional como pista, no puntuación.
- **Máximo dos rondas** de ajuste `[Impeccable]`; lo restante se reporta.
- Sin navegador: código contra inventario, dimensión por dimensión; «comparación visual
  no realizada».

### 6. Paso a movimiento

`motion.md` debe abrir declarando que la referencia es estática y todo movimiento es
invención (o cuál es la fuente animada y qué muestra).

### 7. Móvil

Derivado de los principios registrados del escritorio (identidad, jerarquía, efectos de
identidad conservados); `INVENTADO`, «derivado de: …».

### 8. Evidencia en archivos

`recreations/<slug>/`: referencia (o ruta) · `inventory.md` · `palette.json` + script ·
build · capturas (ref, build, overlay) · `report.md`. Lo que solo vive en el chat no cuenta.
*Pendiente de la pregunta C:* exportar además el inventario como `DESIGN.md` (formato de
designmd.ai; no sus diseños).

### 9. Informe (`report.md`)

Columnas del vocabulario. Sin puntuación.

---

## Sección 2 — Movimiento (`references/motion.md`) — REV. 3, PENDIENTE

Cargado por RECREAR (desde S1 §6) y DERIVAR. **Dependencia hacia adelante**: DERIVAR no
está diseñado; el §1 solo está definido para RECREAR.

### 0. Declaración de fuente (obligatoria)

- Primera línea de `motion-plan.md`: «La referencia es estática; todo el movimiento de
  este build es invención».
- Con GIF/vídeo: cuál es, qué muestra; fotogramas extraídos por script. Solo lo que esa
  fuente muestra puede llegar a `REPRODUCIDO`.
- Sin fuente animada: filas de movimiento `INVENTADO`, fidelidad `—`, comportamiento
  `unknown`.

### 1. Rasgos, inferencias y decisiones (solo RECREAR)

- **Rasgo** (lo visible: «texto cortado en el borde y repetido», #37 `[prev]`) →
  Referencia, `observed`.
- **Lectura de movimiento** («sugiere una marquesina horizontal») → Inferencias,
  `INFERENCE`, enlazada a su rasgo; el comportamiento sigue `unknown`.
- **Adoptarla** → `DECISION` que enlaza la inferencia. Puede rechazarse.
- Una inferencia no prueba velocidad, dirección ni disparador.

### 2. Carácter del movimiento

- Duración, easing y parámetros de muelle **no se miden en una imagen estática**: son
  `DECISION`. Solo con GIF/vídeo pasan a `measured`.
- Materia visual → materia de movimiento (bordes duros → cortes o `steps()`; bloques
  pesados → masa sin rebote; mono cruda → aparición carácter a carácter; grano → textura
  viva; lúdico/escultórico → muelle permitido) — **heurísticas** `[propuesta]`, no leyes;
  cada una como `DECISION` con motivo.
- **Movimiento con parámetros físicos**: cada entrada como muelle (rigidez,
  amortiguación, masa) o duración + curva; nunca «suave»/«rápido» sin número. Concepto
  tomado de Kinetics (el concepto no es protegible; **sus valores y su código no se
  copian**: el repo no tiene licencia). La skill trae su propio `scripts/spring_to_css`
  `[propuesta]`: simula el muelle y emite `linear()` y, cuando cabe, `cubic-bezier`.
- Capacidades nativas: un `cubic-bezier` da **como mucho un sobrepaso con un pequeño
  rebote** (o movimiento críticamente amortiguado); oscilaciones sostenidas → `linear()`
  muestreado, también nativo (peldaño 1). El peldaño 2 queda para lo que CSS no hace:
  **interrupción conservando velocidad** y **física movida por gestos**.

### 3. Plan de movimiento (`motion-plan.md`)

Cuatro capas: momento principal (normalmente uno; heurística `[prev]`) · estados de
interacción (táctil aparte: no hay hover) · scroll · bucles ambientales. Por entrada:
disparador, propiedad, parámetros (`DECISION`), peldaño, inferencia de origen o «sin
inferencia», variante reducida con la misma relación final `[prev]`. El movimiento
decorativo no está prohibido: se juzga por aporte y coste `[prev]`.

### 4. Peldaño

Aplica la regla de `effects.md` (coste y permiso). Ejemplos: el 3D de #36 en WebGL por
su aspecto estático → hacerlo girar no cuesta peldaño nuevo; la marquesina de #37 sin
fuente animada → peldaño 1 por coste; si el plan pide que se detenga conservando
velocidad al pasar el cursor, subir al 2 es admisible **declarado**. Herramientas
concretas: `resources.md`.

### 5. Accesibilidad y rendimiento (añadidos, no fidelidad)

- `prefers-reduced-motion` en CSS **y** JS, incluido el scroll programático `[prev]`.
- Nada que destelle más de 3 veces por segundo `[WCAG 2.3.1]`.
- Mecanismo para pausar, detener u ocultar la información que se mueve y cumple **las
  tres**: arranca sola, dura > 5 s y se presenta en paralelo con otro contenido
  `[WCAG 2.2.2]`. Una marquesina junto a contenido las cumple normalmente.
- Por defecto se animan propiedades que el navegador anima en el compositor
  (`transform`, `opacity`); ir más allá (`clip-path`, `filter`, `mask`,
  `grid-template-rows`) si se verifica fluido `[prev]` — precedente: `grid 0fr → 1fr`
  muestreado en `[prev]`.
- Bucles fuera de pantalla o en pestaña oculta se pausan; WebGL con respaldo estático.
- Equivalente de teclado y táctil para todo lo que dispara el puntero; conducta de foco
  y semántica según convenciones de sistemas reales (component.gallery) — conducta, no
  estilo.
- Todo marcado `AÑADIDO`.

### 6. Verificación

Antes/durante/después con fotogramas o vídeo en archivos; pestaña oculta congela el
reloj `[prev]`; sin navegador, «movimiento no observado» (columna método). **Máximo dos
rondas** de ajuste `[Impeccable]`.

### 7. Informe

Columnas del vocabulario. Sin puntuación.

---

## `references/resources.md` — puntero mínimo (pendiente)

Criterio de admisión: un recurso entra solo si cambia una sección; el contenido se
pliega en esa sección y aquí queda el puntero y la licencia.

```markdown
# Resources — pointers only

The skill does not depend on any of these at runtime; what matters is folded into the
reference files. Style catalogs: study them to name the default you are subverting;
never clone a catalog style as the design.

| Use | Resource | Folded into | License (as recorded 2026-09-29) |
|---|---|---|---|
| Describing motion as spring parameters (concept only) | kinetics.colorion.co · github.com/ckissi/kinetics | motion.md §2 | **None found** (no LICENSE file, no package.json field, not in README) → all rights reserved: do not copy code or parameter values |
| Rung-1 type effects | text-effects.colorion.co · github.com/ckissi/colorion-text-effects | effects.md (examples) | **Declared MIT** in README.md:5 and site footer; **no LICENSE file** in repo |
| Rung-2 option, framework-agnostic | animejs.com | motion.md §4 | verify at time of use |
| Real motion to observe; animated source for study | scrolltide.co | motion.md §0; test corpus | «© 2026 Scrolltide. All rights reserved.», mostly paid: study only |
| Focus/semantics conventions | component.gallery | motion.md §5 | verify at time of use |
| DESIGN.md format (if export adopted) | designmd.ai | recreate.md §8 | verify at time of use |
| Flat captures for RECREAR tests | minimal.gallery, appshot.gallery | test corpus | verify at time of use |
| Default aesthetic to subvert; mechanics bank (catalogs) | magicui, aceternity, animate-ui, 21st.dev, shadcn/ui, uiverse | derive.md, critique.md | verify at time of use |
```

Notas:
- Subconjunto de text-effects útil para brutalismo (glitch, sliced, split-flap,
  dot-matrix, LED, barcode, pixel-sort, CRT) frente a aurora/glass/neon: **heurística de
  gusto**, no propiedad de la librería.
- text-effects: la web dice 90 efectos, el README del repo 81 (observado por el
  maintainer; discrepancia sin resolver).
- Excluidos (no cambian ninguna sección): kage.design, vibeprompts.dev, rtk (flujo de
  trabajo con IAs, no diseño), glass.samasante, gradientbuttons, circleloaders, 3dicons,
  mapcn, navbar/footer/cta/404s galleries, microkit, uiable, kitbitz, styles.refero.

---

## Preguntas abiertas

Del registro de decisiones: nombre de la skill y del modo creativo; lugar de «editar
páginas ya hechas» (ver [`DECISIONS.md`](../decisions/DECISIONS.md)).

De este diseño:
- **A.** Si el proyecto ya usa una librería de animación, ¿usarla cuenta como subir de
  peldaño?
- **B.** ¿El movimiento inventado puede justificar un peldaño mayor (declarado), o solo
  el aspecto estático y una fuente animada pueden? *(La regla de `effects.md` asume que
  sí, declarado; pendiente de confirmación.)*
- **C.** ¿RECREAR exporta también el inventario como `DESIGN.md`?

## Dependencias hacia adelante

- DERIVAR (Sección 3): `motion.md` §1, `resources.md` (catálogos), `derive.md`.
- `critique.md`, `verify.md`, `stacks.md`, `SKILL.md`, instalador y pruebas `[DR5-5]`.
