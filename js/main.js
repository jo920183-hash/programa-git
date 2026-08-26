// Transportes Cóndor - Core App Logic

// LocalStorage Shipping Management
const Storage = {
  getShipments: () => JSON.parse(localStorage.getItem('condor_envios')) || [],
  saveShipment: (shipment) => {
    const shipments = Storage.getShipments();
    shipments.push(shipment);
    localStorage.setItem('condor_envios', JSON.stringify(shipments));
  },
  findShipment: (guideNumber) => {
    const shipments = Storage.getShipments();
    return shipments.find(s => s.guia.toUpperCase() === guideNumber.toUpperCase());
  }
};

// Seed initial mock shipments if empty
if (Storage.getShipments().length === 0) {
  const initialShipments = [
    {
      guia: "TC-1001",
      origen: "Cúcuta",
      destino: "Bogotá",
      peso: 5,
      dimensiones: "30x20x15",
      servicio: "paqueteo",
      costo: 35000,
      estado: "En Tránsito",
      fecha: "2026-08-19"
    },
    {
      guia: "TC-1002",
      origen: "Medellín",
      destino: "Cali",
      peso: 12,
      dimensiones: "40x40x30",
      servicio: "masivo",
      costo: 78000,
      estado: "Entregado",
      fecha: "2026-08-18"
    }
  ];
  localStorage.setItem('condor_envios', JSON.stringify(initialShipments));
}

// Modal handling for Points of Sale
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

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('cityModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
// Transportes Cóndor - Core App Logic

// LocalStorage Shipping Management
const Storage = {
  getShipments: () => JSON.parse(localStorage.getItem('condor_envios')) || [],
  saveShipment: (shipment) => {
    const shipments = Storage.getShipments();
    shipments.push(shipment);
    localStorage.setItem('condor_envios', JSON.stringify(shipments));
  },
  findShipment: (guideNumber) => {
    const shipments = Storage.getShipments();
    return shipments.find(s => s.guia.toUpperCase() === guideNumber.toUpperCase());
  }
};

// Seed initial mock shipments if empty
if (Storage.getShipments().length === 0) {
  const initialShipments = [
    {
      guia: "TC-1001",
      origen: "Cúcuta",
      destino: "Bogotá",
      peso: 5,
      dimensiones: "30x20x15",
      servicio: "paqueteo",
      costo: 35000,
      estado: "En Tránsito",
      fecha: "2026-08-19"
    },
    {
      guia: "TC-1002",
      origen: "Medellín",
      destino: "Cali",
      peso: 12,
      dimensiones: "40x40x30",
      servicio: "masivo",
      costo: 78000,
      estado: "Entregado",
      fecha: "2026-08-18"
    }
  ];
  localStorage.setItem('condor_envios', JSON.stringify(initialShipments));
}

// Modal handling for Points of Sale
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

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('cityModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

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

});