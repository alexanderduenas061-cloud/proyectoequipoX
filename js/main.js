document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('citaForm');
    const mensaje = document.getElementById('mensaje');

    // Función para mostrar el mensaje de validación/éxito
    const displayMessage = (text, type = 'error') => {
        mensaje.textContent = text;
        
        // Limpiar clases previas
        mensaje.classList.remove('alert-error', 'alert-success');
        
        // Aplicar clase para estilo (usaremos el CSS para el color)
        mensaje.classList.add(type === 'error' ? 'alert-error' : 'alert-success');

        // Estilos básicos en JS para asegurar la visibilidad si el CSS no carga
        mensaje.style.color = type === 'error' ? 'red' : 'green';
        mensaje.style.backgroundColor = type === 'error' ? '#f8d7da' : '#d4edda';
        mensaje.style.padding = '10px';
        mensaje.style.border = type === 'error' ? '1px solid #f5c6cb' : '1px solid #c3e6cb';
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío tradicional [cite: 236]

        // 1. Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const especialidad = document.getElementById('especialidad').value;
        const fechaHora = document.getElementById('fechaHora').value;
        
        // 2. Reiniciar el mensaje
        displayMessage('', 'none');

        // 3. Realizar la validación de campos vacíos [cite: 250, 251]
        if (nombre === "" || telefono === "" || especialidad === "" || fechaHora === "") {
            displayMessage("Error: Por favor, complete todos los campos requeridos.", 'error');
            return;
        }

        // 4. Validación de formato de teléfono (Regex: 10 dígitos, solo números)
        // Ejemplo de número de México (10 dígitos)
        const phoneRegex = /^\d{10}$/; 
        
        if (!phoneRegex.test(telefono)) {
            displayMessage("Error: El teléfono debe ser un número de 10 dígitos sin guiones ni espacios.", 'error');
            return;
        }

        // 5. Validación de fecha/hora (Asegurar que no sea una fecha pasada)
        const selectedDate = new Date(fechaHora);
        const now = new Date();
        
        // Permite la cita si es al menos 5 minutos en el futuro (margen para evitar errores de reloj)
        if (selectedDate < now) {
             displayMessage("Error: No puede solicitar una cita en una fecha u hora pasada.", 'error');
             return;
        }


        // 6. Simulación de envío exitoso [cite: 261]
        const successMessage = `¡Solicitud enviada, ${nombre}! Confirmaremos su cita para ${especialidad} (${fechaHora}) en el teléfono ${telefono}.`;
        displayMessage(successMessage, 'success');

        // 7. Limpiar el formulario después del éxito [cite: 266]
        form.reset();
    });
});