document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('citaForm');
    const mensaje = document.getElementById('mensaje');

  
    const displayMessage = (text, type = 'error') => {
        mensaje.textContent = text;
        
        mensaje.classList.remove('alert-error', 'alert-success');
        
       
        mensaje.classList.add(type === 'error' ? 'alert-error' : 'alert-success');

        
        mensaje.style.color = type === 'error' ? 'red' : 'green';
        mensaje.style.backgroundColor = type === 'error' ? '#f8d7da' : '#d4edda';
        mensaje.style.padding = '10px';
        mensaje.style.border = type === 'error' ? '1px solid #f5c6cb' : '1px solid #c3e6cb';
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

       
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const especialidad = document.getElementById('especialidad').value;
        const fechaHora = document.getElementById('fechaHora').value;
        
       
        displayMessage('', 'none');

       
        if (nombre === "" || telefono === "" || especialidad === "" || fechaHora === "") {
            displayMessage("Error: Por favor, complete todos los campos requeridos.", 'error');
            return;
        }

    
        const phoneRegex = /^\d{10}$/; 
        
        if (!phoneRegex.test(telefono)) {
            displayMessage("Error: El teléfono debe ser un número de 10 dígitos sin guiones ni espacios.", 'error');
            return;
        }

      
        const selectedDate = new Date(fechaHora);
        const now = new Date();
        
        
        if (selectedDate < now) {
             displayMessage("Error: No puede solicitar una cita en una fecha u hora pasada.", 'error');
             return;
        }


        const successMessage = `¡Solicitud enviada, ${nombre}! Confirmaremos su cita para ${especialidad} (${fechaHora}) en el teléfono ${telefono}.`;
        displayMessage(successMessage, 'success');

       
        form.reset();
    });
});