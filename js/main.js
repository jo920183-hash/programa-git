// Transportes Cóndor - Core App Logic

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. REGISTRO DE USUARIOS (Conexión a PHP)
  // ==========================================
  const registroForm = document.getElementById('registroForm');
  const registroAlert = document.getElementById('registroAlert');

  if (registroForm) {
    registroForm.addEventListener('submit', async (e) => {
      // Evita la recarga predeterminada del navegador
      e.preventDefault();

      const formData = new FormData(registroForm);

      try {
        const response = await fetch('procesar_registro.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (registroAlert) {
          registroAlert.style.display = 'block';
          registroAlert.textContent = result.message;

          if (result.success) {
            registroAlert.className = 'alert alert-success';
            registroForm.reset();
          } else {
            registroAlert.className = 'alert alert-danger';
          }
        }
      } catch (error) {
        console.error('Error en el registro:', error);
        if (registroAlert) {
          registroAlert.style.display = 'block';
          registroAlert.className = 'alert alert-danger';
          registroAlert.textContent = 'Ocurrió un error al procesar la solicitud. Revisa la consola o conexión BD.';
        }
      }
    });
  }

  // ==========================================
  // 2. INICIO DE SESIÓN (Conexión a PHP)
  // ==========================================
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(loginForm);

      try {
        const response = await fetch('procesar_login.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        alert(result.message);
        if (result.success) {
          window.location.href = 'index.html';
        }
      } catch (error) {
        console.error('Error en el login:', error);
      }
    });
  }

});

// ==========================================
// 3. MODALES DE PUNTOS DE VENTA (Rutas)
// ==========================================
function showPointOfSale(city) {
  const modal = document.getElementById('cityModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (modal && modalTitle && modalBody) {
    modalTitle.textContent = `Puntos de Venta y Atención - ${city}`;
    modalBody.innerHTML = `
      <p><strong>📍 Sede Principal ${city}:</strong> Av. Central #45-12, Sector Comercial.</p>
      <p><strong>📞 Teléfono:</strong> (607) 555-0199 / +57 300 123 4567</p>
      <p><strong>⏰ Horario:</strong> Lunes a Sábado: 7:00 AM - 7:00 PM</p>
      <p><strong>📦 Servicios disponibles:</strong> Recepción, Entrega, Paqueteo Exprés, Carga Masiva.</p>
    `;
    modal.style.display = 'flex';
  }
}

function closeModal() {
  const modal = document.getElementById('cityModal');
  if (modal) modal.style.display = 'none';
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById('cityModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
<<<<<<< HEAD

/* ==========================================================================
   CONEXIÓN DE FORMULARIOS AL BACKEND PHP (BD condor_db)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Procesar Registro de Usuarios (registro.html)
  const registroForm = document.getElementById('registroForm');
  if (registroForm) {
    registroForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);

      try {
        const response = await fetch('procesar_registro.php', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        
        if (data.success) {
          alert(data.message);
          window.location.href = 'login.html';
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Error al enviar el registro:', error);
      }
    });
  }

  // 2. Procesar Inicio de Sesión (login.html)
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);

      try {
        const response = await fetch('procesar_login.php', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          alert('¡Bienvenido ' + data.usuario + '!');
          window.location.href = 'index.html';
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Error en la autenticación:', error);
      }
    });
  }

  // 3. Rastreo de Guías en la Base de Datos (index.html)
  const rastreoForm = document.getElementById('rastreoForm');
  if (rastreoForm) {
    rastreoForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const guia = document.getElementById('guiaInput').value;

      try {
        const response = await fetch(`rastrear_guia.php?guia=${encodeURIComponent(guia)}`);
        const data = await response.json();

        const resultDiv = document.getElementById('trackingResult');

        if (data.success) {
          resultDiv.innerHTML = `
            <div style="margin-top: 15px; padding: 12px; background: #e8f5e9; border: 1px solid #4caf50; border-radius: 6px;">
              <p><strong>Guía:</strong> ${data.data.numero_guia}</p>
              <p><strong>Ruta:</strong> ${data.data.origen} ➔ ${data.data.destino}</p>
              <p><strong>Servicio:</strong> ${data.data.tipo_servicio}</p>
              <p><strong>Estado:</strong> <span style="font-weight: bold; color: #2e7d32;">${data.data.estado}</span></p>
            </div>
          `;
        } else {
          resultDiv.innerHTML = `<p style="color: red; margin-top: 10px;">${data.message}</p>`;
        }
      } catch (error) {
        console.error('Error al rastrear la guía:', error);
      }
    });
  }

  // 4. Crear Nuevo Envío en la Base de Datos (index.html)
  const envioForm = document.getElementById('envioForm');
  if (envioForm) {
    envioForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const formData = new FormData(this);

      try {
        const response = await fetch('crear_envio.php', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        const resultadoDiv = document.getElementById('resultado');

        if (data.success) {
          resultadoDiv.innerHTML = `
            <div style="margin-top: 15px; padding: 12px; background: #e3f2fd; border: 1px solid #2196f3; border-radius: 6px;">
              <p style="color: #0d47a1;"><strong>¡Envío creado con éxito!</strong></p>
              <p>Número de Guía asignado: <strong>${data.guia}</strong></p>
            </div>
          `;
          envioForm.reset();
        } else {
          alert('Error: ' + data.message);
        }
      } catch (error) {
        console.error('Error al registrar el envío:', error);
      }
    });
  }

=======
// Manejo de la consulta/rastreo de guía
document.addEventListener('DOMContentLoaded', () => {
  const rastreoForm = document.getElementById('rastreoForm');
  const trackingResult = document.getElementById('trackingResult');

  if (rastreoForm) {
    rastreoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guia = document.getElementById('guiaInput').value.trim();

      if (!guia) return;

      fetch(`consultar_guia.php?numero_guia=${encodeURIComponent(guia)}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            trackingResult.innerHTML = `
              <div style="margin-top: 1rem; padding: 1rem; background-color: #e8f5e9; border-radius: 6px; border: 1px solid #c8e6c9;">
                <h4 style="color: #2e7d32; margin-bottom: 0.5rem;">📦 Estado del Envío</h4>
                <p><strong>Guía:</strong> ${data.numero_guia}</p>
                <p><strong>Ruta:</strong> ${data.origen} ➔ ${data.destino}</p>
                <p><strong>Servicio:</strong> ${data.servicio}</p>
               <p><strong>Estado:</strong> <span style="background-color: #1b5e20; color: #ffffff; font-weight: bold; padding: 4px 10px; border-radius: 4px; display: inline-block;">${data.estado || 'Recibido en Bodega'}</span></p>
                <p><strong>Fecha de Envío:</strong> ${data.fecha}</p>
              </div>
            `;
          } else {
            trackingResult.innerHTML = `
              <div style="margin-top: 1rem; padding: 1rem; background-color: #ffebee; border-radius: 6px; border: 1px solid #ffcdd2; color: #c62828;">
                ⚠️ ${data.message}
              </div>
            `;
          }
        })
        .catch(error => {
          console.error("Error al consultar la guía:", error);
          trackingResult.innerHTML = `<p style="color: red; margin-top: 1rem;">Error de conexión con el servidor.</p>`;
        });
    });
  }
>>>>>>> 96f08a423992a2b59912bcd2d77da07eef932804
});