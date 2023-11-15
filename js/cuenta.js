const accountData = {}
const userId = localStorage.getItem('userId')
const p = document.getElementById('message')

const getUser = async () => {
  try {
    const response = await fetch(`http://localhost:3000/users/user?id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error HTTP! Estado: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      p.textContent = data.error
      return
    }

    data.forEach(d => {
      accountData.name = d.name
      accountData.lastname = d.lastname
      accountData.email = d.email
      accountData.password = d.password
    })

    showAccountInfo()
  } catch (err) {
    p.textContent = err.message || 'Ha ocurrido un error al obtener los datos del usuario.'
  }
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

  const newName = document.getElementById('name').value
  const newLastname = document.getElementById('lastname').value
  const newEmail = document.getElementById('email').value
  const newPassword = document.getElementById('password').value

  accountData.name = newName.trim()
  accountData.lastname = newLastname.trim()
  accountData.email = newEmail.trim()
  accountData.password = newPassword.trim()

  try {
    const response = await fetch(`http://localhost:3000/users/patch?id=${userId}`, {
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

    if (!response.ok) {
      throw new Error(`Error HTTP! Estado: ${response.status}`)
    }

    const data = await response.json()
    p.innerHTML = data.message

    setTimeout(() => {
      getUser()
      showAccountInfo()
      document.getElementById('account-info').style.display = 'block'
      document.getElementById('edit-form').style.display = 'none'
    }, 2000)
  } catch (err) {
    p.textContent = err.message || 'Ha ocurrido un error al actualizar los datos.'
  }
})
