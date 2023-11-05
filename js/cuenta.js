const accountData = {}
const userId = localStorage.getItem('userId')

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
}

const button = document.getElementById('button')
button.addEventListener('click', editAccount)

// Función para mostrar el formulario de edición
function editAccount () {
  const accountInfoSection = document.getElementById('account-info')
  const editFormSection = document.getElementById('edit-form')

  accountInfoSection.style.display = 'none'
  editFormSection.style.display = 'block'

  // Llenar el formulario con los datos actuales
  document.getElementById('username').value = accountData.username
  document.getElementById('email').value = accountData.email
}

// Función para manejar la edición y guardar cambios
document.getElementById('edit-form').addEventListener('submit', function (event) {
  event.preventDefault()

  // Obtener los nuevos datos del formulario
  const newUsername = document.getElementById('username').value
  const newEmail = document.getElementById('email').value

  // Actualizar los datos de la cuenta
  accountData.username = newUsername
  accountData.email = newEmail

  // Volver a mostrar la información de la cuenta
  showAccountInfo()

  // Ocultar el formulario de edición
  document.getElementById('account-info').style.display = 'block'
  document.getElementById('edit-form').style.display = 'none'
})
