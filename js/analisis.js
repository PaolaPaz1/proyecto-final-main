import { getIncome, getExpenses } from './utils'
getIncome('tabla1', true)
getExpenses('tabla2', true)

const body = document.querySelector('body')
const sidebar = body.querySelector('nav')
const toggle = body.querySelector('.toggle')
const modeSwitch = body.querySelector('.toggle-switch')
const modeText = body.querySelector('.mode-text')
const resumen = body.querySelector('.resumen')

let totalExpenses = 0
let totalIncomes = 0

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

fetch('http://localhost:3000/expenses/get-total-expenses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ userId: localStorage.getItem('userId') })
})
  .then(res => res.json())
  .then(data => {
    totalExpenses = parseFloat(data[0].total)
    if (!totalExpenses) return
    const p = document.createElement('p')
    p.innerHTML = `Total de gastos: $${totalExpenses}`
    resumen.appendChild(p)
  })

fetch('http://localhost:3000/incomes/get-total-incomes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ userId: localStorage.getItem('userId') })
})
  .then(res => res.json())
  .then(data => {
    totalIncomes = parseFloat(data[0].total)
    if (!totalIncomes) return
    const p = document.createElement('p')
    p.innerHTML += `Total de ingresos: $${totalIncomes}`
    resumen.appendChild(p)
    calcularTotal()
  })

const calcularTotal = () => {
  const p = document.createElement('p')

  if (totalIncomes === totalExpenses) {
    p.style.color = 'blue'
    p.innerHTML += 'Saldo: $0'
    return
  }

  if (totalIncomes > totalExpenses) {
    p.style.color = 'green'
    p.innerHTML += `Saldo: $${totalIncomes - totalExpenses}`
  } else if (totalIncomes < totalExpenses) {
    p.style.color = 'red'
    p.innerHTML += `Saldo: -$${Math.abs(totalExpenses - totalIncomes)}`
  }

  resumen.appendChild(p)
}
