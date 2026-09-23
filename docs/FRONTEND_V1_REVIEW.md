# Lolitas — Frontend v1.0
Fecha: 23/09/2026

**Estado: implementado localmente y listo para revisión visual.** No publicado. Backend, Supabase, administración y datos originales sin cambios.

## Decisiones para comparar

| Bloque | Implementación | Motivo |
| --- | --- | --- |
| /perfiles | Hero borgoña editorial de altura natural y serif protagonista | Mantener la entrada narrativa sin imponer una pantalla completa |
| Selección | Máximo 2 perfiles destacados, con imagen de 88 × 112 px | Dar una primera orientación sin duplicar grandes bloques |
| Exploración | 4 columnas en escritorio y 2 en móvil/tablet, desplazamiento vertical leve en la segunda columna de escritorio | Densidad de catálogo con composición editorial, sin precios ni controles de compra |
| Filtros | Todos, Cena, Copas, Salida, Eventos, En casa | Continuidad con las experiencias de Home |
| Búsqueda | Nombre, ciudad e idioma; ignora mayúsculas y tildes | Búsqueda discreta y resultados previsibles |
| Paginación | 8 resultados iniciales; Cargar más añade 8 | Recorrido limitado al entrar, ampliación voluntaria y foco en el primer resultado nuevo |
| Vista rápida | Se conserva su información y carrusel; diálogos nativos y galería anidada | Escape, foco contenido y retorno al disparador |
| Perfil completo | Presentación, idiomas, disponibilidad orientativa, experiencias, galería ampliable y afinidades relacionadas | Completar el recorrido sin simular solicitudes reales |
| Home | Experiencias enlazadas al filtro, selección pública, Cómo funciona y CTA final | Conectar descubrimiento con selección |
| Acceso y registro | Formularios visuales con validación, mostrar contraseña y respuesta de demostración | Recorrer la interfaz sin guardar ni enviar datos |
| Identidad | Marfil, borgoña, rosa corporativos; serif, reglas finas y asimetría | Conservar Lolitas y evitar paneles o estética tecnológica |

**Contenido público:** solo perfiles con estado published. Actualmente Laura cumple esa condición; Marta está en revisión y Sofía en borrador. No se alteraron esos estados para rellenar la retícula.

## Archivos modificados

Todas las rutas corresponden a **C:/Users/lacri/projects/client-projects/lolitas/web**.

| Archivo | Cambio |
| --- | --- |
| app/perfiles/page.tsx | Hero editorial y montaje del explorador |
| components/profiles/ProfilesExplorer.tsx | Destacados, filtros, búsqueda, vacío y carga progresiva |
| components/profiles/ProfileCard.tsx | Tarjeta compacta editorial |
| components/profiles/ProfileQuickView.tsx | Diálogo accesible y coordinación con galería |
| components/profiles/ProfileGallery.tsx | Diálogo nativo, teclado y retorno del foco |
| app/perfiles/[slug]/page.tsx | Página completa, metadata y exclusión de perfiles no publicados |
| components/layout/Navbar.tsx | Navegación pública y menú móvil accesible |
| app/page.tsx | Integración de cierre y footer |
| components/marketing/ExperienceJourney.tsx | Enlaces por experiencia y desplazamiento reducido |
| components/marketing/FeaturedProfiles.tsx | Selección de perfiles publicados |
| components/marketing/Hero.tsx | Integración del medio adaptativo; retirada de parallax continuo |
| app/layout.tsx | Metadata global, iconos, idioma y enlace para saltar al contenido |
| app/globals.css | Foco visible, formularios, enlaces y movimiento reducido |

## Archivos nuevos

| Archivo | Función |
| --- | --- |
| lib/public-profiles.ts | Estados públicos, experiencias, normalización y filtrado |
| lib/site.ts | Dominio, indexación y metadata compartida |
| components/layout/Footer.tsx | Footer público |
| components/marketing/HomeClosing.tsx | Cómo funciona y CTA final |
| components/marketing/HeroMedia.tsx | Vídeo condicionado por ancho, movimiento reducido y ahorro de datos |
| public/images/hero/lolitas-hero-poster.webp | Póster optimizado conservando el JPG original |
| components/profiles/ProfilePhotos.tsx | Galería ampliable del perfil completo |
| components/auth/AuthView.tsx | Vista compartida de formularios de demostración |
| app/acceso/page.tsx | Acceso visual |
| app/registro/page.tsx | Registro visual |
| app/not-found.tsx | 404 pública |
| app/robots.ts | Reglas de rastreo |
| app/sitemap.ts | Sitemap de rutas y perfiles públicos |
| tests/profiles.fixture.ts | 24 perfiles exclusivos de pruebas |
| tests/profiles.test.mjs | Pruebas de filtros, escala y estados públicos |
| docs/FRONTEND_V1_REVIEW.md | Este informe |

## Validación realizada

- **Lint:** sin errores ni advertencias.
- **Build de producción:** correcto, incluida comprobación TypeScript y generación de 13 páginas.
- **Pruebas automatizadas:** 4/4 mediante node --test tests/profiles.test.mjs.
- **Escala en navegador:** fixture de 24 perfiles, carga 8 → 16 → 24, retirada de Cargar más al finalizar y foco trasladado al perfil 9 tras la primera ampliación.
- **Filtros combinados:** En casa + sofia devuelve 8 perfiles del fixture; búsqueda sin coincidencias muestra el estado vacío; restablecer recupera la selección.
- **Diálogos:** galería sobre Quick View; Escape cierra solo la galería y devuelve foco; segundo Escape cierra Quick View y devuelve foco a la tarjeta.
- **Responsive:** inspección a 320, 390, 768 y 1440 px, sin desbordamiento horizontal de página en las vistas revisadas. Filtros con desplazamiento propio.
- **Home móvil:** no monta el elemento vídeo. En escritorio se verificó el control Pausar/Reproducir.
- **Menú móvil:** apertura, Escape y retorno del foco comprobados.
- **Registro:** envío de datos ficticios muestra confirmación de vista previa y limpia el formulario, sin creación de cuenta.
- **HTTP:** /, /perfiles, /perfiles/laura, /acceso y /registro responden 200. /perfiles/marta, /perfiles/sofia y /no-existe responden 404.
- **SEO local:** noindex, robots bloqueado y sitemap vacío sin direcciones localhost publicadas.
- **Integridad:** git diff --check sin errores de espacios.
- La ruta temporal de prueba de 24 perfiles se eliminó antes del build final; el fixture no aparece en rutas públicas.

## Rendimiento y límites

| Aspecto | Resultado o límite |
| --- | --- |
| Póster del hero | De 1.447.491 a 39.152 bytes, aproximadamente 97,3 % menos |
| Imágenes | next/image, tamaños adaptativos, proporciones reservadas, carga diferida y precarga del hero |
| Vídeo | Original de 3.254.886 bytes conservado; no montado en móvil, con preferencia de movimiento reducido o ahorro de datos; pausa fuera de vista |
| Fuentes | Se mantienen las familias y alternativas existentes; no se incorporaron fuentes externas |
| Core Web Vitals | Optimizaciones básicas implementadas; sin medición de campo ni puntuación Lighthouse certificada |
| Acceso y solicitudes | Interfaces de demostración; autenticación y reservas pendientes de la fase backend |
| Datos | Mocks estáticos originales; no sincronizados con localStorage del admin |
| Publicación | Sin despliegue, commit ni push |

## SEO para publicación

Configurar **NEXT_PUBLIC_SITE_URL** con el origen HTTPS confirmado y **SITE_INDEXABLE=true** al publicar contenido definitivo. Después generar de nuevo el build.

El sitemap incluirá Home, /perfiles y los perfiles publicados. Acceso y registro mantienen noindex; robots excluye administración. Estas reglas son indicaciones de rastreo, no control de acceso.

## Revisión visual propuesta

- Comparar 2 columnas móviles con una sola columna si se prioriza fotografía sobre densidad.
- Ajustar el tamaño del hero y el espacio antes de los filtros después de revisar en el dispositivo habitual.
- Sustituir imágenes y datos de demostración antes de publicar.
- Confirmar el dominio y los textos operativos cuando se retome el backend.

Vista local: http://localhost:3000/perfiles

