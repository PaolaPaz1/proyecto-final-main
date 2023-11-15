document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value
  const lastname = document.getElementById('lastname').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const message = document.getElementById('message')
  const data = { name, lastname, email, password }

  try {
    const response = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseData = await response.json()

    if (responseData.error) {
      message.style.color = 'red'
      message.textContent = responseData.error
      return
    }

    message.style.color = 'green'
    message.textContent = responseData.message
  } catch (err) {
    message.style.color = 'red'
    message.textContent = err.message || 'Ha ocurrido un error'
  }
})
