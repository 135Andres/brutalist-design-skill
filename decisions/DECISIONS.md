# Registro de decisiones

> Decisiones del maintainer sobre la skill. **Solo se añade**: nada se reescribe; una
> decisión nueva que cambia otra lo dice y la señala. Lo que no cita a este archivo no es
> decisión. Lo marcado `[propuesta]` es del agente.
>
> El trabajo empezó en un contexto privado (2026-09-27 → 2026-09-29) que no forma parte
> de este repositorio. Aquí se registran solo las decisiones sobre la skill general.

## DR5 — skill general de diseño brutalista (2026-09-29)

- **DR5-1 · Skill general.** No ligada a ningún proyecto. En palabras del maintainer:
  «General, hecho para diseños brutalistas creativos. Quiero que se puedan recrear todas
  las imagenes de diseños brutalistas con animaciones y bonitas que hay en pinterest.»
  Las reglas propias de proyectos anteriores no se portan; la regla «reference to
  principle, never to copy» de un método anterior **no aplica a RECREAR**.
- **DR5-2 · Dos modos:** RECREAR (reproducir una referencia visual como interfaz) y
  DERIVAR (extraer principios y producir algo original). *Alcance modificado por A-1.*
- **DR5-3 · Stack:** el del proyecto donde trabaje la IA; la skill no fija uno.
- **DR5-4 · Efectos y animación: escalera completa.** Primero lo nativo del navegador; si
  hace falta, librerías de animación; después WebGL/shaders.
- **DR5-5 · Pruebas:** con las referencias #35–#38 y más imágenes que añadirá el
  maintainer (las imágenes no se publican: ver A-3).
- **DR5-6 · Forma:** formato abierto Agent Skills (`SKILL.md` + `references/` +
  `scripts/`) con carga por capas, más un instalador por herramienta.
- **DR5-7 · Fidelidad vs accesibilidad (RECREAR):** en modo estudio se conserva el color
  original, se avisa, y la corrección se ofrece como variante marcada AÑADIDO. No se
  corrige en silencio.

**Defaults propuestos por el agente y aceptados** («sí, vamos con A»):
nombre provisional `brutalist-interfaces`; contenido de la skill en **inglés** (los
documentos de trabajo siguen en español).

## A-1 · Modo creativo abierto (2026-09-29)

*Modifica DR5-2.* RECREAR queda igual; el segundo modo es un **modo creativo aún sin
definir**, del que DERIVAR es solo una forma posible.

1. **La skill no le impone nada al usuario.** RECREAR reproduce fielmente, sin sermón de
   originalidad; su único límite es la higiene de derechos. La exigencia de carácter
   recae sobre lo que la skill produce en su modo creativo. Sin puntuación, checklist ni
   juicio al usuario; el humano juzga.
2. **El modo creativo se define experimentando.** En palabras del maintainer: «Puede ser
   derivar, crear desde 0, podria aplicar los principios de derivar pero en vez de
   intentar recrear, haria que la IA se inspire. Esto es más sobre que la IA inspire al
   usuario, tal vez que le haga preguntas que el usuario pueda digerir, tal vez que haga
   bosquejos, tal vez que haga una ronda de preguntas, hay que experimentar sobre esto
   porque crear no tiene pies ni cabeza.»

Consecuencias: el modo creativo no se especifica hasta tener resultados; su nombre sigue
sin decidir. **Propuesta del maintainer** registrada después: que la skill sepa **editar
páginas ya hechas** («darle más sazón»); sin decidir si es modo propio o parte del
creativo.

## A-2 · Repositorio propio y orientación a imágenes (2026-09-29)

1. El trabajo vive en su propio repositorio, `brutalist-design-skill`, con git.
2. Orientación, en palabras del maintainer: «no es necesario que quede 1 diseño desde el
   principio, recordemos que se tiene que explorar y experimentar diferentes diseños, por
   eso vamos a esforzarnos en hacer muy buenoel apartado de recreacion o inspiracion en
   base a imagenes».

`[propuesta]` estructura: `spec/`, `decisions/`, `skill/`, `references/`, `experiments/`,
`tools/`.

## A-3 · Repositorio público (2026-09-29)

1. **Nada del contexto privado de origen** se publica: ni su investigación, ni sus
   experimentos, ni sus muestras. Solo el trabajo general sobre la skill.
2. **Licencia:** Apache-2.0.
3. **Imágenes de referencia:** derechos desconocidos → **no se versionan** (`.gitignore`);
   solo su descripción en `references/README.md`.

## Preguntas abiertas

- Nombre de la skill (`brutalist-interfaces` es provisional) y del modo creativo.
- ¿«Editar páginas ya hechas» es modo propio o parte del modo creativo?
- Del spec: A (¿una librería ya presente cuenta como subir peldaño?), B (¿el movimiento
  inventado puede justificar un peldaño mayor, declarado?), C (¿RECREAR exporta
  `DESIGN.md`?).
