// Handlers for Shipping Creation, Calculation & Tracking

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. CREAR NUEVO ENVÍO (Envío a PHP / MySQL)
  // ==========================================
  const envioForm = document.getElementById('envioForm');
  const resultado = document.getElementById('resultado');

  if (envioForm) {
    envioForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(envioForm);

      try {
        const response = await fetch('procesar_envio.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (resultado) {
          resultado.style.display = 'block';

          if (result.success) {
            resultado.className = 'alert alert-success';
            resultado.innerHTML = `
              <strong>¡Envío guardado exitosamente en la BD!</strong><br>
              Número de Guía: <strong>${result.guia}</strong><br>
              Costo Estimado: $${Number(result.costo).toLocaleString('es-CO')} COP<br>
              Estado Actual: Recibido en Bodega
            `;
            envioForm.reset();
          } else {
            resultado.className = 'alert alert-danger';
            resultado.textContent = result.message || 'Error al procesar el envío.';
          }
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        if (resultado) {
          resultado.style.display = 'block';
          resultado.className = 'alert alert-danger';
          resultado.textContent = 'Error de conexión con el servidor.';
        }
      }
    });
  }

  // ==========================================
  // 2. CALCULADORA DE TARIFAS (Cálculo local)
  // ==========================================
  const calculoForm = document.getElementById('calculoForm');
  if (calculoForm) {
    calculoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const peso = parseFloat(document.getElementById('calc-peso').value);
      const servicio = document.getElementById('calc-servicio').value;

      let base = servicio === 'expres' ? 15000 : 8000;
      let total = Math.round(base + (peso * 3000));

      const resultadoCosto = document.getElementById('resultadoCosto');
      if (resultadoCosto) {
        resultadoCosto.className = 'alert alert-info';
        resultadoCosto.style.display = 'block';
        resultadoCosto.innerHTML = `
          <strong>Costo estimado del envío:</strong> $${total.toLocaleString('es-CO')} COP<br>
          <small>*Sujeto a verificación de dimensiones en oficina.</small>
        `;
      }
    });
  }

  // ==========================================
  // 3. RASTREO DE ENVÍO (Consulta a PHP / MySQL)
  // ==========================================
  const rastreoForm = document.getElementById('rastreoForm');
  const trackingResult = document.getElementById('trackingResult');

  if (rastreoForm) {
    rastreoForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const guiaInput = document.getElementById('guiaInput').value.trim();

      try {
        const response = await fetch(`consultar_guia.php?guia=${encodeURIComponent(guiaInput)}`);
        const result = await response.json();

        if (result.success) {
          const shipment = result.data;

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
              No se encontró información para la guía <strong>${guiaInput}</strong>. Por favor verifique e intente de nuevo.
            </div>
          `;
        }
      } catch (error) {
        console.error('Error al consultar la guía:', error);
        trackingResult.innerHTML = `
          <div class="alert alert-danger" style="display:block; margin-top: 1rem;">
            Ocurrió un error al consultar el servidor.
          </div>
        `;
      }
    });
  }
});