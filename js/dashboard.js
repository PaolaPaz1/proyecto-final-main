import { createGraphic } from './utils-graphic'

document.addEventListener('DOMContentLoaded', () => {
  const monthInput = document.getElementById('month-input')
  const monthText = document.getElementById('month-text')

  // Función para actualizar el texto del H1
  const updateMonthText = (date) => {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const year = date.getFullYear()
    const month = monthNames[date.getMonth()]

    monthText.textContent = `Mostrando datos de ${month} de ${year}`
  }

  // Establecer el valor inicial del input al mes actual
  const currentDate = new Date()
  monthInput.value = currentDate.toISOString().substring(0, 7)
  updateMonthText(currentDate)

  // Event listener para cambios en el input
  monthInput.addEventListener('change', (event) => {
    const selectedDate = new Date(event.target.value)
    updateMonthText(selectedDate)
  })
})

const body = document.querySelector('body')
const resumen = body.querySelector('.resumen')
const changeMonth = body.querySelector('#change-month')

changeMonth.addEventListener('click', () => {
  const monthInput = document.getElementById('month-input')
  const year = monthInput.value.split('-')[0]
  const month = monthInput.value.split('-')[1]

  getTotalExpenses(year, month)
  getTotalIncomes(year, month)

  getIncomesByCategory(year, month)
  getExpensesByCategory(year, month)
})

let totalExpenses = 0
let totalIncomes = 0

const getTotalExpenses = (yearr, monthh) => {
  fetch('http://localhost:3000/expenses/get-total-expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: localStorage.getItem('userId'), year: yearr, month: monthh })
  })
    .then(res => res.json())
    .then(data => {
      totalExpenses = parseFloat(data[0].total) ?? 0
      const p = document.getElementById('expense')
      if (totalExpenses > 0) {
        p.innerHTML = `Total de gastos: $${totalExpenses}`
        p.style.display = 'block'
      } else {
        p.style.display = 'none'
      }
      resumen.appendChild(p)
    })
}

const getTotalIncomes = async (yearr, monthh) => {
  const p = document.getElementById('income')

  try {
    const response = await fetch('http://localhost:3000/incomes/get-total-incomes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: localStorage.getItem('userId'), year: yearr, month: monthh })
    })

    if (!response.ok) {
      throw new Error(`Error HTTP! Estado: ${response.status}`)
    }

    const data = await response.json()

    totalIncomes = parseFloat(data[0].total) ?? 0

    if (totalIncomes > 0) {
      p.innerHTML = `Total de ingresos: $${totalIncomes}`
      p.style.display = 'block'
    } else {
      p.style.display = 'none'
    }

    calcularTotal()
  } catch (err) {
    p.innerHTML = err.message || 'Ha ocurrido un error'
  }
}

getTotalExpenses(new Date().getFullYear(), new Date().getMonth() + 1)
getTotalIncomes(new Date().getFullYear(), new Date().getMonth() + 1)

const calcularTotal = () => {
  const p = document.getElementById('total')

  if (isNaN(totalIncomes) && isNaN(totalExpenses)) {
    p.style.display = 'none'
    return
  }

  p.style.display = 'block'

  if (totalIncomes === totalExpenses) {
    p.style.color = 'blue'
    p.innerHTML = 'Saldo: $0'
    return
  }

  if (totalIncomes > totalExpenses) {
    p.style.color = 'green'
    p.innerHTML = `Saldo: $${parseFloat(Math.abs(totalIncomes - totalExpenses)).toFixed(2)}`
  } else if (totalIncomes < totalExpenses) {
    p.style.color = 'red'
    p.innerHTML = `Saldo: -$${parseFloat(Math.abs(totalExpenses - totalIncomes)).toFixed(2)}`
  }

  resumen.appendChild(p)
}

const getIncomesByCategory = async (yearr, monthh) => {
  try {
    const response = await fetch('http://localhost:3000/incomes/get-incomes-by-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: localStorage.getItem('userId'), year: yearr, month: monthh })
    })

    if (!response.ok) {
      throw new Error(`Error HTTP! Estado: ${response.status}`)
    }

    const data = await response.json()

    if (data.length === 0) {
      const ctx = document.getElementById('myChart-inc').getContext('2d')
      createGraphic(ctx, ['Sin datos'], [0], 'Ingresado')
      return
    }

    const categorias = data.map(item => item.categoria)
    const cantidades = data.map(item => parseFloat(item.total))

    const ctx = document.getElementById('myChart-inc').getContext('2d')

    createGraphic(ctx, categorias, cantidades, 'Ingresado')
  } catch (err) {
    const p = document.getElementById('error')
    p.innerHTML = err.message || 'Ha ocurrido un error'
  }
}

const getExpensesByCategory = (yearr, monthh) => {
  fetch('http://localhost:3000/expenses/get-expenses-by-category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: localStorage.getItem('userId'), year: yearr, month: monthh })
  })
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        const ctx = document.getElementById('myChart-exp').getContext('2d')
        createGraphic(ctx, ['Sin datos'], [0], 'Egresado')
        return
      }

      const categorias = data.map(item => item.categoria)
      const cantidades = data.map(item => parseFloat(item.total))

      const ctx = document.getElementById('myChart-exp').getContext('2d')

      createGraphic(ctx, categorias, cantidades, 'Egresado')
    })
}

getIncomesByCategory(new Date().getFullYear(), new Date().getMonth() + 1)
getExpensesByCategory(new Date().getFullYear(), new Date().getMonth() + 1)
