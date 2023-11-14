import { getExpenses } from './utils'
getExpenses('myId')

const mensajeExito = document.getElementById('mensajeExito')
const mensajeError = document.getElementById('mensajeError')

document.getElementById('egresoForm').addEventListener('submit', async (e) => {
  e.preventDefault()

  const userId = localStorage.getItem('userId')
  const amount = document.getElementById('monto').value
  const description = document.getElementById('descripcion').value
  const category = document.getElementById('categorias').value
  const date = document.getElementById('fecha').value

  const datafe1 = {
    userId,
    amount,
    description,
    category,
    date
  }

  const datafe2 = {
    userId,
    year: parseInt(date.split('-')[0]),
    month: parseInt(date.split('-')[1])
  }

  await fetch('http://localhost:3000/expenses/check-monthly-limit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datafe2)
  })
    .then(response => response.json())
    .then(data => {
      if (data === false || (parseFloat(data.total) + parseFloat(amount)) < data.limit) {
        newExpense(datafe1)
      } else {
        mensajeError.innerHTML = 'El monto ingresado supera el límite mensual'
        setTimeout(() => {
          mensajeError.innerHTML = ''
        }, 2000)
      }
    })

  e.target.reset()
})

const newExpense = async (data) => {
  await fetch('http://localhost:3000/expenses/new-expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      mensajeExito.innerHTML = data.message
      setTimeout(() => {
        mensajeExito.innerHTML = ''
      }, 2000)
      getExpenses('myId')
    })
    .catch(err => {
      mensajeError.innerHTML = err.message
      setTimeout(() => {
        mensajeError.innerHTML = ''
      }, 2000)
    })
}
