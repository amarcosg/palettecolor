// Array para almacenar los colores y su estado de bloqueo
let colors = [];

// Inicializar la aplicación
function init() {
    generatePalette();
}

// Generar un color hexadecimal aleatorio
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Generar paleta completa
function generatePalette() {
    const palette = document.getElementById('palette');

    // Si es la primera vez, crear 5 colores nuevos
    if (colors.length === 0) {
        for (let i = 0; i < 5; i++) {
            colors.push({
                hex: generateRandomColor(),
                locked: false
            });
        }
    } else {
        // Si no, solo generar colores para los no bloqueados
        colors = colors.map(colorObj => {
            if (!colorObj.locked) {
                return {
                    hex: generateRandomColor(),
                    locked: false
                };
            }
            return colorObj;
        });
    }

    // Renderizar la paleta
    renderPalette();
}

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
    // Remover notificación existente si la hay
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

// Agregar animaciones CSS para las notificaciones
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

// Event listeners
document.getElementById('generateBtn').addEventListener('click', generatePalette);

// Evento para la barra espaciadora
document.addEventListener('keydown', (e) => {
    // Verificar si la tecla presionada es la barra espaciadora (código 32 o ' ')
    if (e.code === 'Space' || e.keyCode === 32) {
        // Prevenir el scroll de la página
        e.preventDefault();
        generatePalette();
    }
});

// Inicializar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
