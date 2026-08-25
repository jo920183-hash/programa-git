// Handlers for Shipping Creation, Calculation & Tracking

document.addEventListener('DOMContentLoaded', () => {

  // 1. Create New Shipment Handler
  const envioForm = document.getElementById('envioForm');
  if (envioForm) {
    envioForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const origen = document.getElementById('origen').value;
      const destino = document.getElementById('destino').value;
      const peso = parseFloat(document.getElementById('peso').value);
      const dimensiones = document.getElementById('dimensiones').value;
      const servicio = document.getElementById('servicio').value;
      
      // Generate tracking guide number
      const guia = 'TC-' + Math.floor(1000 + Math.random() * 9000);
      
      // Calculate estimated cost
      let baseRate = servicio === 'masivo' ? 12000 : (servicio === 'mensajeria' ? 8000 : 6000);
      const costo = Math.round(baseRate + (peso * 3500));

      const newShipment = {
        guia,
        origen,
        destino,
        peso,
        dimensiones,
        servicio,
        costo,
        estado: 'Recibido en Bodega',
        fecha: new Date().toISOString().split('T')[0]
      };

      Storage.saveShipment(newShipment);

      const resultado = document.getElementById('resultado');
      resultado.className = 'alert alert-success';
      resultado.style.display = 'block';
      resultado.innerHTML = `
        <strong>¡Envío creado exitosamente!</strong><br>
        Número de Guía: <strong>${guia}</strong><br>
        Costo Estimado: $${costo.toLocaleString('es-CO')} COP<br>
        Estado Actual: Recibido en Bodega
      `;

      envioForm.reset();
    });
  }

  // 2. Cost Calculator Handler
  const calculoForm = document.getElementById('calculoForm');
  if (calculoForm) {
    calculoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const peso = parseFloat(document.getElementById('calc-peso').value);
      const servicio = document.getElementById('calc-servicio').value;
      
      let base = servicio === 'expres' ? 15000 : 8000;
      let total = Math.round(base + (peso * 3000));

      const resultadoCosto = document.getElementById('resultadoCosto');
      resultadoCosto.className = 'alert alert-info';
      resultadoCosto.style.display = 'block';
      resultadoCosto.innerHTML = `
        <strong>Costo estimado del envío:</strong> $${total.toLocaleString('es-CO')} COP<br>
        <small>*Sujeto a verificación de dimensiones en oficina.</small>
      `;
    });
  }

  // 3. Shipment Tracking Handler
  const rastreoForm = document.getElementById('rastreoForm');
  if (rastreoForm) {
    rastreoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guiaInput = document.getElementById('guiaInput').value.trim();
      const shipment = Storage.findShipment(guiaInput);
      const trackingResult = document.getElementById('trackingResult');

      if (shipment) {
        let step1 = 'completed', step2 = '', step3 = '';
        if (shipment.estado === 'En Tránsito') {
          step1 = 'completed'; step2 = 'active';
        } else if (shipment.estado === 'Entregado') {
          step1 = 'completed'; step2 = 'completed'; step3 = 'completed';
        } else {
          step1 = 'active';
        }

        trackingResult.innerHTML = `
          <div class="tracking-card">
            <h3>Detalles de la Guía: ${shipment.guia}</h3>
            <p><strong>Origen:</strong> ${shipment.origen} ➔ <strong>Destino:</strong> ${shipment.destino}</p>
            <p><strong>Servicio:</strong> ${shipment.servicio.toUpperCase()} | <strong>Peso:</strong> ${shipment.peso} kg</p>
            <p><strong>Fecha de Registro:</strong> ${shipment.fecha}</p>
            <p><strong>Estado Actual:</strong> <span style="color: var(--accent-color); font-weight: bold;">${shipment.estado}</span></p>
            
            <div class="timeline">
              <div class="timeline-step ${step1}">
                <div class="step-icon">1</div>
                <div>Recibido</div>
              </div>
              <div class="timeline-step ${step2}">
                <div class="step-icon">2</div>
                <div>En Tránsito</div>
              </div>
              <div class="timeline-step ${step3}">
                <div class="step-icon">3</div>
                <div>Entregado</div>
              </div>
            </div>
          </div>
        `;
      } else {
        trackingResult.innerHTML = `
          <div class="alert alert-info" style="display:block; margin-top: 1rem;">
            No se encontró información para la guía <strong>${guiaInput}</strong>. Por favor verifique e intente de nuevo. (Pruebe con: <strong>TC-1001</strong> o <strong>TC-1002</strong>)
          </div>
        `;
      }
    });
  }
});
