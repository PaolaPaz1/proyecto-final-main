const body = document.querySelector('body')
const sidebar = body.querySelector('nav')
const toggle = body.querySelector('.toggle')
const modeSwitch = body.querySelector('.toggle-switch')
const modeText = body.querySelector('.mode-text')

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('close')
})

modeSwitch.addEventListener('click', () => {
  body.classList.toggle('dark')

  if (body.classList.contains('dark')) {
    modeText.innerText = 'Light mode'
  } else {
    modeText.innerText = 'Dark mode'
  }
})

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
