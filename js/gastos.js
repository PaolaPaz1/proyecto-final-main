import { getExpenses } from './utils'
getExpenses('myId')

const mensajeExito = document.getElementById('mensajeExito')
const mensajeError = document.getElementById('mensajeError')
const mensajeAviso = document.getElementById('mensajeAviso')

const newExpense = async (data) => {
  try {
    const response = await fetch('http://localhost:3000/expenses/new-expense', {
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
    getExpenses('myId')
  } catch (err) {
    mensajeError.innerHTML = err.message || 'Ha ocurrido un error'
    setTimeout(() => {
      mensajeError.innerHTML = ''
    }, 2000)
  }
}

const checkMonthlyLimit = async (data) => {
  return await fetch('http://localhost:3000/expenses/check-monthly-limit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

const checkLimit = (total, limit) => {
  total = parseFloat(total)
  limit = parseFloat(limit)

  const warningThreshold = limit * 0.8

  if (total >= warningThreshold) {
    return 'Estas acecándote al límite mensual, ten cuidado en las próximas compras.'
  } else {
    return ''
  }
}

const userId = localStorage.getItem('userId')

const data = {
  userId,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1
}

const checkAndDisplayLimit = async () => {
  try {
    const response = await checkMonthlyLimit(data)

    if (!response.ok) {
      throw new Error(`Error HTTP! Estado: ${response.status}`)
    }

    const responseData = await response.json()

    const message = checkLimit(responseData.total, responseData.limit)
    mensajeAviso.innerHTML = message
  } catch (err) {
    mensajeError.innerHTML = err.message || 'Ha ocurrido un error'
  }
}
checkAndDisplayLimit()

document.getElementById('egresoForm').addEventListener('submit', async (e) => {
  e.preventDefault()

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

  try {
    const fetchedLimit = await checkMonthlyLimit(datafe2)

    if (!fetchedLimit.ok) {
      throw new Error(`Error HTTP! Estado: ${fetchedLimit.status}`)
    }

    const responseData = await fetchedLimit.json()

    if (responseData === false || (parseFloat(responseData.total) + parseFloat(amount)) < responseData.limit) {
      newExpense(datafe1)
      checkAndDisplayLimit()
    } else {
      mensajeError.innerHTML = 'El monto ingresado supera el límite mensual'
      setTimeout(() => {
        mensajeError.innerHTML = ''
      }, 2000)
    }
  } catch (err) {
    mensajeError.innerHTML = err.message || 'Ha ocurrido un error'
  }

  e.target.reset()
})
