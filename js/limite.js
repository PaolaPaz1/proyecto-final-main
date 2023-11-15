document.addEventListener('DOMContentLoaded', function () {
  const limiteForm = document.getElementById('limiteForm')
  const mensajeExito = document.getElementById('mensajeExito')
  const mensajeError = document.getElementById('mensajeError')

  limiteForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    const limite = parseFloat(document.getElementById('limiteMensual').value)

    try {
      const response = await fetch('http://localhost:3000/users/set-monthly-limit', {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()

      mensajeExito.innerHTML = responseData.message
      mensajeError.innerHTML = ''
      setTimeout(() => {
        mensajeExito.innerHTML = ''
        getMonthlyLimit()
      }, 2000)
    } catch (err) {
      mensajeError.innerHTML = err.message || 'Ha ocurrido un error'
    }
  })
})

const getMonthlyLimit = async () => {
  const p = document.getElementById('cantidadActual')

  try {
    const response = await fetch('http://localhost:3000/users/get-monthly-limit', {
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseData = await response.json()

    if (responseData.message) {
      p.innerHTML = responseData.message
    } else {
      p.innerHTML = `Tu límite mensual es de $${responseData.limite}`
    }
  } catch (err) {
    p.innerHTML = err.message || 'Ha ocurrido un error'
  }
}

getMonthlyLimit()
