document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const nombreUsuario = document.getElementById('nombreUsuarioLogin').value;
    const contraseña = document.getElementById('contraseñaLogin').value;

    if (!nombreUsuario || !contraseña) {
        alert('Nombre de usuario y contraseña son requeridos');
        return;
    }

    const loginData = {
        nombreUsuario: nombreUsuario,
        contraseña: contraseña
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            alert('Inicio de sesión exitoso');
            window.location.href = '/dashboard.html';
        } else {
            throw new Error('Credenciales inválidas');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Inicio de sesión fallido. Verifica tus credenciales e intenta nuevamente.');
    });
});