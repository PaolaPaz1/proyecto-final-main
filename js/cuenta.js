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

const accountData = {}
const userId = localStorage.getItem('userId')
const p = document.getElementById('message')

const getUser = async () => {
  await fetch(`http://localhost:3000/users/user?id=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(data => {
        accountData.name = data.name
        accountData.lastname = data.lastname
        accountData.email = data.email
        accountData.password = data.password
      })

      showAccountInfo()
    })
}

getUser()

// Función para mostrar los datos de la cuenta
function showAccountInfo () {
  const accountInfoSection = document.getElementById('account-info')
  accountInfoSection.innerHTML = `
      <h2>Datos de la Cuenta</h2>
      <p><strong>Nombre de usuario:</strong> ${accountData.name}</p>
      <p><strong>Apellido:</strong> ${accountData.lastname}</p>
      <p><strong>Correo electrónico:</strong> ${accountData.email}</p>
      <button id="button">Editar</button>
  `

  const button = document.getElementById('button')
  button.addEventListener('click', editAccount)
}

// Función para mostrar el formulario de edición
function editAccount () {
  const accountInfoSection = document.getElementById('account-info')
  const editFormSection = document.getElementById('edit-form')

  accountInfoSection.style.display = 'none'
  editFormSection.style.display = 'block'

  // Llenar el formulario con los datos actuales
  document.getElementById('name').value = accountData.name
  document.getElementById('lastname').value = accountData.lastname
  document.getElementById('email').value = accountData.email
  document.getElementById('password').value = accountData.password
}

// Función para manejar la edición y guardar cambios
document.getElementById('edit-form').addEventListener('submit', async (event) => {
  event.preventDefault()

  // Obtener los nuevos datos del formulario
  const newName = document.getElementById('name').value
  const newLastname = document.getElementById('lastname').value
  const newEmail = document.getElementById('email').value
  const newPassword = document.getElementById('password').value

  // Actualizar los datos de la cuenta
  accountData.name = newName.trim()
  accountData.lastname = newLastname.trim()
  accountData.email = newEmail.trim()
  accountData.password = newPassword.trim()

  await fetch(`http://localhost:3000/users/patch?id=${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newName,
      lastname: newLastname,
      email: newEmail,
      password: newPassword
    })
  })
    .then(response => response.json())
    .then(data => {
      p.innerHTML = data.message
      setInterval(() => {
        getUser()
        showAccountInfo()
        // Ocultar el formulario de edición
        document.getElementById('account-info').style.display = 'block'
        document.getElementById('edit-form').style.display = 'none'
      }, 3000)
    })
})
