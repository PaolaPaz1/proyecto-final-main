import { getIncome } from './utils'
getIncome('myId')

const body = document.querySelector('body')
const sidebar = body.querySelector('nav')
const toggle = body.querySelector('.toggle')
const modeSwitch = body.querySelector('.toggle-switch')
const modeText = body.querySelector('.mode-text')
const mensajeExito = document.getElementById('mensajeExito')
const mensajeError = document.getElementById('mensajeError')

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

  await fetch('http://localhost:3000/incomes/new-income', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      mensajeExito.innerHTML = data.message
      setInterval(() => {
        mensajeExito.innerHTML = ''
      }, 2000)
      getIncome('myId')
    })
    .catch(err => {
      mensajeError.innerHTML = err.message
      setInterval(() => {
        mensajeError.innerHTML = ''
      }, 2000)
    })
})
