# Nilo Website - Landing Page

## Descripción
Landing page profesional para Nilo, una plataforma que combina IA y contacto humano para convertir intención en ventas reales.

## Estructura del Proyecto
```
Nilo_website/
│
├── index.html          # Estructura HTML principal
├── styles.css          # Loader CSS (importa el resto)
├── styles.base.css     # Estilos base (sin breakpoints)
├── styles.max-1600.css # Overrides <= 1600px
├── styles.max-1200.css # Overrides <= 1200px
├── styles.max-992.css  # Overrides <= 992px
├── styles.max-768.css  # Overrides <= 768px
├── styles.max-480.css  # Overrides <= 480px
├── styles.max-360.css  # Overrides <= 360px
└── (Ajustes por altura desktop incluidos en styles.base.css)
└── README.md          # Este archivo
```

## Características
- ✅ Diseño responsive (desktop, tablet, mobile)
- ✅ Navegación intuitiva con scroll suave
- ✅ Secciones claramente definidas:
  - Hero con imagen y CTAs
  - Problema y solución
  - 3 pilares de la solución (IA, Multicanalidad, Personas)
  - Productos (Recuperación de carritos, Widget, Upselling)
  - Confianza y estadísticas
  - Precios
  - CTA final
  - Footer completo con newsletter
- ✅ Animaciones sutiles en cards flotantes
- ✅ Colores y tipografía según diseño de Figma

## Colores Principales
- **Azul primario**: #3771d1
- **Azul secundario**: #2270d7
- **Naranja**: #f6793a
- **Rojo**: #F93939
- **Texto oscuro**: #1e2c50
- **Fondo claro**: #faf8f5
- **Blanco**: #FFFFFF

## Tipografía
- **Fuente**: Inter (Google Fonts)
- **Pesos**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold), 900 (Black)

## Imágenes
Las imágenes están alojadas en los servidores de Figma a través de la API de MCP. 

⚠️ **IMPORTANTE**: Las URLs de las imágenes tienen una validez de 7 días desde su generación (hasta aproximadamente el 18 de febrero de 2026).

### Solución para imágenes permanentes:
1. Descarga las imágenes desde las URLs actuales
2. Guárdalas en una carpeta `/assets/images/` en el proyecto
3. Actualiza las rutas en `index.html` de:
   ```html
   src="https://www.figma.com/api/mcp/asset/..."
   ```
   a:
   ```html
   src="assets/images/nombre-imagen.png"
   ```

### Lista de imágenes utilizadas:
- Logo de Nilo
- Imagen hero (fondo con textura)
- Imagen principal mujer en laptop
- Iconos de secciones de problema
- Imágenes de las 3 soluciones
- Iconos de productos
- Banderas de países
- Gráficos decorativos CTA
- Iconos de redes sociales

## Cómo abrir el proyecto

### Opción 1: Directamente en el navegador
1. Navega hasta la carpeta del proyecto
2. Haz doble clic en `index.html`
3. Se abrirá en tu navegador predeterminado

### Opción 2: Con un servidor local (recomendado)
Si tienes Python instalado:
```bash
# Python 3
python -m http.server 8000
```

Si tienes Node.js instalado:
```bash
# Con npx (no requiere instalación)
npx serve
```

Luego abre `http://localhost:8000` en tu navegador.

## Personalización

### Cambiar colores
Edita las variables CSS en el archivo `styles.base.css`:
```css
:root {
    --color-primary: #3771d1;
    --color-secondary: #f6793a;
    /* ... más variables */
}
```

### Modificar textos
Todos los textos están en `index.html` y son fácilmente editables.

### Ajustar espaciados
Los espaciados (padding, margin) están definidos en `styles.css` por sección.

## Compatibilidad
- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Dispositivos móviles (responsive)

## Próximos pasos sugeridos
1. **Descargar y alojar imágenes localmente** para evitar que expiren
2. **Implementar formularios funcionales** (newsletter, contacto)
3. **Añadir animaciones avanzadas** con bibliotecas como AOS o GSAP
4. **Optimizar imágenes** con formatos modernos (WebP, AVIF)
5. **Añadir analytics** (Google Analytics, Facebook Pixel, etc.)
6. **Implementar SEO básico** (meta tags, schema markup)
7. **Configurar dominio y hosting** para producción

## Notas técnicas
- HTML5 semántico
- CSS3 moderno con variables y grid/flexbox
- Sin dependencias de JavaScript (todo es HTML/CSS puro)
- Arquitectura desktop-first con media queries `max-width` (1600/1200/992/768/480/360)
- Accesibilidad básica implementada (aria-labels, alt texts)

## Licencia
Proyecto creado para RECSA - Todos los derechos reservados © NILO SE 2026

---

**Creado desde diseño de Figma**  
Fecha: 11 de febrero de 2026  
Diseño original: https://www.figma.com/design/5YY5zVFqG3yCnJYLfbaR9C/Nilo