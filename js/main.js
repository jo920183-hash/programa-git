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
