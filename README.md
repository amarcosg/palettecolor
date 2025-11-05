# 🎨 Generador de Paletas de Colores

Una aplicación web interactiva que genera paletas de colores armónicas basadas en teoría del color. Perfecta para diseñadores, desarrolladores y creativos que buscan combinaciones de colores profesionales y complementarias.

## ✨ Características

- **6 Esquemas de Color Armónicos**: Genera paletas basadas en teoría del color profesional
  - 🎨 **Monocromático**: Variaciones de un mismo color
  - 🌈 **Análogo**: Colores adyacentes en el círculo cromático
  - ⚖️ **Complementario**: Colores opuestos que se equilibran
  - 🔺 **Triádico**: Tres colores equidistantes
  - 🎯 **Complementario Dividido**: Base + adyacentes al complementario
  - 🔷 **Tetrádico**: Cuatro colores en armonía perfecta
- **Conversión de Colores**: Sistema completo de conversión HEX ↔ RGB ↔ HSL
- **Bloqueo de Colores**: Bloquea tus colores favoritos y genera nuevos para los demás
- **Atajos de Teclado**: Usa la barra espaciadora para generar paletas rápidamente
- **Copiar al Portapapeles**: Haz clic en el código de color para copiarlo
- **Diseño Responsivo**: Funciona perfectamente en móviles, tablets y escritorio
- **Interfaz Moderna**: Diseño atractivo con animaciones suaves

## 🚀 Cómo Usar

1. Abre `index.html` en tu navegador
2. **Selecciona un esquema de color** del menú desplegable (Monocromático, Análogo, Complementario, etc.)
3. Presiona la **barra espaciadora** o el botón **"Generar Paleta"**
4. Haz **clic en un color** para bloquearlo/desbloquearlo
5. Haz **clic en el código HEX** para copiarlo al portapapeles
6. **¿Encontraste un color que te gusta?** Bloquéalo y genera nuevos colores - los nuevos se crearán en armonía con tu color bloqueado
7. Cambia de esquema en cualquier momento para explorar diferentes armonías basadas en tus colores bloqueados

### 💡 Consejo Pro
Cuando bloqueas colores, el generador los usa como referencia para crear la paleta. Esto significa que puedes:
- Bloquear tu color de marca y generar paletas que lo complementen
- Encontrar un color perfecto y explorar variaciones armónicas
- Combinar múltiples colores bloqueados y llenar los espacios restantes coherentemente

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con Grid y Flexbox
- **JavaScript**: Lógica de generación y manipulación del DOM

## 📁 Estructura del Proyecto

```
palettecolor/
├── index.html      # Estructura HTML principal
├── style.css       # Estilos y diseño
├── script.js       # Lógica de la aplicación
└── README.md       # Documentación
```

## 🎯 Funcionalidades Implementadas

### Teoría del Color y Armonías
- **6 algoritmos de armonía de color** basados en el círculo cromático
- **Sistema de conversión de colores**: HEX ↔ RGB ↔ HSL
- Generación inteligente de colores base con saturación y luminosidad óptimas
- Normalización de ángulos de matiz para cálculos precisos

### Esquemas de Color Profesionales
1. **Monocromático**: Variaciones de luminosidad y saturación del mismo tono
2. **Análogo**: Colores cercanos (-30° a +30°) que crean armonía sutil
3. **Complementario**: Colores opuestos (180°) con alto contraste
4. **Triádico**: Tres colores equidistantes (120°) vibrantes y equilibrados
5. **Complementario Dividido**: Base + dos adyacentes al complementario
6. **Tetrádico**: Cuatro colores en cuadrado (90°) para paletas ricas

### Sistema de Bloqueo Inteligente
- Toggle de bloqueo por color con un clic
- Indicadores visuales (icono de candado y borde)
- **Persistencia de colores bloqueados**: Los colores fijados nunca se regeneran
- **Generación coherente**: Los nuevos colores usan los bloqueados como referencia
- Si bloqueas un color, los nuevos se generarán siguiendo el esquema de armonía **basándose en el color bloqueado**
- Ejemplo: Si bloqueas un azul y usas esquema "Complementario", los nuevos colores serán azules y naranjas que complementen tu azul específico

### Interactividad
- Selector de esquema de color con cambio dinámico
- Event listeners para teclado (barra espaciadora)
- Event listeners para clicks en cajas y códigos
- Notificaciones al copiar colores
- Regeneración automática al cambiar esquema

### Experiencia de Usuario
- Animaciones y transiciones suaves
- Feedback visual en hover
- Notificaciones temporales
- Diseño responsivo
- Selector estilizado con estados hover y focus

## 🎓 ¿Por qué Armonías de Color?

Las armonías de color no son aleatorias - están basadas en **teoría del color científica** y el círculo cromático. Cada esquema tiene un propósito específico:

- **Monocromático** → Elegancia y sofisticación (ideal para branding minimalista)
- **Análogo** → Armonía natural y relajante (común en naturaleza)
- **Complementario** → Máximo contraste y energía (llamativo y dinámico)
- **Triádico** → Balance vibrante (usado en logos como Burger King, Google)
- **Complementario Dividido** → Contraste sofisticado sin ser abrumador
- **Tetrádico** → Riqueza visual y versatilidad (perfecto para diseños complejos)

Este generador no solo crea colores bonitos, sino **combinaciones que funcionan** según principios de diseño profesional.

## 💡 Casos de Uso

- **Diseñadores**: Encuentra combinaciones profesionales para proyectos
- **Desarrolladores**: Genera paletas armónicas para interfaces web
- **Artistas**: Busca inspiración basada en teoría del color
- **Marketers**: Crea esquemas de branding con fundamento científico
- **Estudiantes**: Aprende teoría del color de forma práctica e interactiva

## 🌟 Próximas Mejoras Posibles

- Exportar paletas a diferentes formatos (CSS, SCSS, JSON, imagen PNG/SVG)
- Guardar paletas favoritas en localStorage
- Compartir paletas vía URL (codificando colores en la URL)
- Ajustes manuales de tonalidad/saturación/brillo con sliders
- Modo oscuro para la interfaz
- Historial de paletas generadas
- Previsualización en elementos UI (botones, tarjetas, texto)
- Verificación de contraste WCAG para accesibilidad
- Importar imagen y extraer paleta de colores
- Nombres de colores descriptivos (ej: "Azul Oceánico")

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

---

**Desarrollado como proyecto de portafolio para demostrar habilidades en JavaScript y manipulación del DOM**
