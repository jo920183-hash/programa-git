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
});