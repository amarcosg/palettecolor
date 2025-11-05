// Array para almacenar los colores y su estado de bloqueo
let colors = [];
let currentScheme = 'monochromatic';

// Inicializar la aplicación
function init() {
    generatePalette();
    setupEventListeners();
}

// ===== FUNCIONES DE CONVERSIÓN DE COLOR =====

// Convertir HEX a RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Convertir RGB a HEX
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Convertir RGB a HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Convertir HSL a RGB
function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// Convertir HEX a HSL
function hexToHsl(hex) {
    const rgb = hexToRgb(hex);
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

// Convertir HSL a HEX
function hslToHex(h, s, l) {
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// ===== ESQUEMAS DE COLOR =====

// Generar un color base aleatorio
function generateBaseColor() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 40) + 60; // 60-100% saturación
    const l = Math.floor(Math.random() * 30) + 40; // 40-70% luminosidad
    return { h, s, l };
}

// Normalizar ángulo de matiz (0-360)
function normalizeHue(hue) {
    return ((hue % 360) + 360) % 360;
}

// Esquema Monocromático: Variaciones de luminosidad y saturación del mismo color
function generateMonochromatic(baseColor) {
    const colors = [];
    const variations = [-30, -15, 0, 15, 30]; // Variaciones de luminosidad

    variations.forEach(lVar => {
        const l = Math.max(20, Math.min(80, baseColor.l + lVar));
        const s = Math.max(40, Math.min(100, baseColor.s + (lVar * 0.5)));
        colors.push(hslToHex(baseColor.h, s, l));
    });

    return colors;
}

// Esquema Análogo: Colores adyacentes en el círculo cromático
function generateAnalogous(baseColor) {
    const colors = [];
    const angles = [-30, -15, 0, 15, 30]; // Ángulos cercanos

    angles.forEach(angle => {
        const h = normalizeHue(baseColor.h + angle);
        const s = Math.max(50, Math.min(90, baseColor.s + (Math.random() * 20 - 10)));
        const l = Math.max(30, Math.min(70, baseColor.l + (Math.random() * 20 - 10)));
        colors.push(hslToHex(h, s, l));
    });

    return colors;
}

// Esquema Complementario: Colores opuestos
function generateComplementary(baseColor) {
    const colors = [];
    const complementHue = normalizeHue(baseColor.h + 180);

    // Color base y variaciones
    colors.push(hslToHex(baseColor.h, baseColor.s, baseColor.l - 10));
    colors.push(hslToHex(baseColor.h, baseColor.s, baseColor.l));
    colors.push(hslToHex(baseColor.h, baseColor.s - 20, baseColor.l + 20));

    // Colores complementarios
    colors.push(hslToHex(complementHue, baseColor.s, baseColor.l));
    colors.push(hslToHex(complementHue, baseColor.s - 15, baseColor.l + 10));

    return colors;
}

// Esquema Triádico: Tres colores equidistantes (120° de separación)
function generateTriadic(baseColor) {
    const colors = [];
    const hues = [
        baseColor.h,
        normalizeHue(baseColor.h + 120),
        normalizeHue(baseColor.h + 240)
    ];

    // Dos variaciones del primer color
    colors.push(hslToHex(hues[0], baseColor.s, baseColor.l - 10));
    colors.push(hslToHex(hues[0], baseColor.s, baseColor.l + 10));

    // Un color de cada uno de los otros dos
    colors.push(hslToHex(hues[1], baseColor.s - 10, baseColor.l));
    colors.push(hslToHex(hues[2], baseColor.s - 10, baseColor.l + 5));
    colors.push(hslToHex(hues[1], baseColor.s + 10, baseColor.l - 15));

    return colors;
}

// Esquema Complementario Dividido: Color base + 2 colores adyacentes al complementario
function generateSplitComplementary(baseColor) {
    const colors = [];
    const complementHue = normalizeHue(baseColor.h + 180);

    // Color base y variación
    colors.push(hslToHex(baseColor.h, baseColor.s, baseColor.l - 10));
    colors.push(hslToHex(baseColor.h, baseColor.s, baseColor.l));
    colors.push(hslToHex(baseColor.h, baseColor.s - 20, baseColor.l + 15));

    // Complementarios divididos
    colors.push(hslToHex(normalizeHue(complementHue - 30), baseColor.s, baseColor.l));
    colors.push(hslToHex(normalizeHue(complementHue + 30), baseColor.s, baseColor.l + 5));

    return colors;
}

// Esquema Tetrádico: Cuatro colores en un cuadrado (90° de separación)
function generateTetradic(baseColor) {
    const colors = [];
    const hues = [
        baseColor.h,
        normalizeHue(baseColor.h + 90),
        normalizeHue(baseColor.h + 180),
        normalizeHue(baseColor.h + 270)
    ];

    // Un color principal más prominente
    colors.push(hslToHex(hues[0], baseColor.s, baseColor.l));

    // Uno de cada uno de los otros colores
    colors.push(hslToHex(hues[1], baseColor.s - 10, baseColor.l + 10));
    colors.push(hslToHex(hues[2], baseColor.s - 15, baseColor.l - 5));
    colors.push(hslToHex(hues[3], baseColor.s - 5, baseColor.l + 5));

    // Variación del principal
    colors.push(hslToHex(hues[0], baseColor.s + 10, baseColor.l + 15));

    return colors;
}

// ===== GENERACIÓN DE PALETA =====

// Generar paleta según el esquema seleccionado
function generatePalette() {
    let baseColor;

    // Si hay colores bloqueados, usar el primero como base para mantener coherencia
    const lockedColors = colors.filter(c => c.locked);
    if (lockedColors.length > 0) {
        // Usar el primer color bloqueado como referencia
        const lockedHsl = hexToHsl(lockedColors[0].hex);
        baseColor = lockedHsl;
    } else {
        // Si no hay colores bloqueados, generar uno aleatorio
        baseColor = generateBaseColor();
    }

    let newColors;

    switch (currentScheme) {
        case 'monochromatic':
            newColors = generateMonochromatic(baseColor);
            break;
        case 'analogous':
            newColors = generateAnalogous(baseColor);
            break;
        case 'complementary':
            newColors = generateComplementary(baseColor);
            break;
        case 'triadic':
            newColors = generateTriadic(baseColor);
            break;
        case 'split-complementary':
            newColors = generateSplitComplementary(baseColor);
            break;
        case 'tetradic':
            newColors = generateTetradic(baseColor);
            break;
        default:
            newColors = generateMonochromatic(baseColor);
    }

    // Si es la primera vez, crear 5 colores nuevos
    if (colors.length === 0) {
        colors = newColors.map(hex => ({
            hex: hex,
            locked: false
        }));
    } else {
        // Solo actualizar colores no bloqueados
        let newColorIndex = 0;
        colors = colors.map(colorObj => {
            if (!colorObj.locked && newColorIndex < newColors.length) {
                return {
                    hex: newColors[newColorIndex++],
                    locked: false
                };
            }
            return colorObj;
        });
    }

    renderPalette();
}

// ===== RENDERIZADO Y UI =====

// Renderizar la paleta en el DOM
function renderPalette() {
    const palette = document.getElementById('palette');
    palette.innerHTML = '';

    colors.forEach((colorObj, index) => {
        const colorBox = document.createElement('div');
        colorBox.className = `color-box ${colorObj.locked ? 'locked' : ''}`;
        colorBox.style.backgroundColor = colorObj.hex;
        colorBox.dataset.index = index;

        // Código de color
        const colorCode = document.createElement('div');
        colorCode.className = 'color-code';
        colorCode.textContent = colorObj.hex;

        // Icono de candado
        const lockIcon = document.createElement('div');
        lockIcon.className = 'lock-icon';
        lockIcon.textContent = colorObj.locked ? '🔒' : '🔓';

        colorBox.appendChild(colorCode);
        colorBox.appendChild(lockIcon);

        // Evento de click para bloquear/desbloquear
        colorBox.addEventListener('click', () => toggleLock(index));

        // Evento para copiar el color al clipboard
        colorCode.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(colorObj.hex);
        });

        palette.appendChild(colorBox);
    });
}

// Bloquear/desbloquear un color
function toggleLock(index) {
    colors[index].locked = !colors[index].locked;
    renderPalette();
}

// Copiar color al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification(`Copiado: ${text}`);
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// Mostrar notificación temporal
function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ===== EVENT LISTENERS =====

function setupEventListeners() {
    // Botón de generar
    document.getElementById('generateBtn').addEventListener('click', generatePalette);

    // Selector de esquema
    const schemeSelect = document.getElementById('schemeSelect');
    schemeSelect.addEventListener('change', (e) => {
        currentScheme = e.target.value;
        generatePalette();
    });

    // Barra espaciadora
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.keyCode === 32) {
            e.preventDefault();
            generatePalette();
        }
    });
}

// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
