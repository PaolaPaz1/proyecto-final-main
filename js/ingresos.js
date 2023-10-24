const body = document.querySelector('body')
const sidebar = body.querySelector('nav')
const toggle = body.querySelector('.toggle')
const searchBtn = body.querySelector('.search-box')
const modeSwitch = body.querySelector('.toggle-switch')
const modeText = body.querySelector('.mode-text')

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('close')
})

searchBtn.addEventListener('click', () => {
  sidebar.classList.remove('close')
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
  const ingresoForm = document.getElementById('ingresoForm')
  const mensajeExito = document.getElementById('mensajeExito')
  const mensajeError = document.getElementById('mensajeError')

  ingresoForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const monto = parseFloat(document.getElementById('monto').value)
    const descripcion = document.getElementById('descripcion').value

    if (isNaN(monto)) {
      mensajeError.textContent = 'Por favor, ingrese un monto válido.'
    } else {
      // Aquí puedes realizar cualquier acción adicional, como enviar los datos a un servidor.
      // Por ahora, simplemente mostramos un mensaje de éxito.
      mensajeError.textContent = ''
      mensajeExito.textContent = 'Ingreso registrado con éxito: $' + monto.toFixed(2)
      // También puedes resetear el formulario después de enviarlo.
      ingresoForm.reset()
    }
  })
})
