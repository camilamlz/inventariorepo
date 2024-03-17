// Registro de usuario
document.getElementById('registroUsuarioForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    // Obtener los valores de cada campo del formulario
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;
    const nombre = document.getElementById('nombre').value;
    const identificacion = document.getElementById('identificacion').value;
    const departamento = document.getElementById('departamento').value;
    const cargo = document.getElementById('cargo').value;
    const contacto = document.getElementById('contacto').value;

    // Verificar si algún campo está vacío
    if (!nombreUsuario || !contraseña || !tipoUsuario || !nombre || !identificacion || !contacto) {
        alert('Todos los campos son requeridos');
        return; // Detener el envío de datos al servidor
    }

    // Crear un objeto con los datos del usuario
    const usuarioData = {
        nombreUsuario: nombreUsuario,
        contraseña: contraseña,
        tipoUsuario: tipoUsuario,
        nombre: nombre,
        identificacion: identificacion,
        departamento: departamento,
        cargo: cargo,
        contacto: contacto
    };

    // Enviar los datos al backend
    fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
    })
    .then(response => {
        if (response.ok) {
            alert('Usuario registrado exitosamente');
            // Redireccionar a otra página si es necesario
            window.location.href = '/login.html';
        } else {
            throw new Error('Error al registrar usuario');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al registrar usuario');
    });
});
