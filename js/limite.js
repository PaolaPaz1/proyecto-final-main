document.addEventListener('DOMContentLoaded', function () {
  const limiteForm = document.getElementById('limiteForm')
  const mensajeExito = document.getElementById('mensajeExito')
  const mensajeError = document.getElementById('mensajeError')

  limiteForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const limite = parseFloat(document.getElementById('limiteMensual').value)

    fetch('http://localhost:3000/users/set-monthly-limit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        limit: limite,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          mensajeExito.innerHTML = data.message
          mensajeError.innerHTML = ''
          setTimeout(() => {
            mensajeExito.innerHTML = ''
            getMonthlyLimit()
          }, 2000)
        } else {
          mensajeError.innerHTML = data.error
          mensajeExito.innerHTML = ''
          setTimeout(() => {
            mensajeError.innerHTML = ''
          }, 2000)
        }
      })
  })
})

const getMonthlyLimit = () => {
  const p = document.getElementById('cantidadActual')

  fetch('http://localhost:3000/users/get-monthly-limit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: localStorage.getItem('userId'),
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        p.innerHTML = data.message
      } else {
        p.innerHTML = `Tu límite mensual es de $${data.limite}`
      }
    })
    .catch(err => console.error(err))
}

getMonthlyLimit()
