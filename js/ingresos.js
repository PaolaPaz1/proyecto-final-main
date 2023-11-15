import { getIncome } from './utils'
getIncome('myId')

const mensajeExito = document.getElementById('mensajeExito')
const mensajeError = document.getElementById('mensajeError')

document.getElementById('ingresoForm').addEventListener('submit', async (e) => {
  e.preventDefault()

  const userId = localStorage.getItem('userId')
  const amount = document.getElementById('monto').value
  const description = document.getElementById('descripcion').value
  const category = document.getElementById('categorias').value
  const date = document.getElementById('fecha').value

  const data = {
    userId,
    amount,
    description,
    category,
    date
  }

  try {
    const response = await fetch('http://localhost:3000/incomes/new-income', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Error HTTP! Estado: ${response.status}`)
    }

    const responseData = await response.json()

    mensajeExito.innerHTML = responseData.message
    setTimeout(() => {
      mensajeExito.innerHTML = ''
    }, 2000)
    getIncome('myId')
  } catch (err) {
    mensajeError.innerHTML = err.message || 'Ha ocurrido un error'
  }

  e.target.reset()
})
