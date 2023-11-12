document.addEventListener('DOMContentLoaded', function () {
  const limiteForm = document.getElementById('limiteForm')
  const mensajeExito = document.getElementById('mensajeExito')
  const mensajeError = document.getElementById('mensajeError')

  limiteForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const limiteMensual = parseFloat(document.getElementById('limiteMensual').value)

    if (isNaN(limiteMensual)) {
      mensajeError.textContent = 'Por favor, ingrese un límite mensual válido.'
    } else {
      // Almacena el límite mensual en una variable global
      window.limiteMensual = limiteMensual

      mensajeError.textContent = ''
      mensajeExito.textContent = 'Límite mensual establecido con éxito: $' + limiteMensual.toFixed(2)

      // Redirige al usuario a otra página, si es necesario
      // Ejemplo: window.location.href = "egresos.html";
    }
  })
})
