document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault()

  const errorMessage = document.getElementById('errorMessage')
  const email = document.getElementById('email').value.trim()
  const password = document.getElementById('password').value.trim()

  if (!email || !password) {
    errorMessage.textContent = 'Por favor, rellena todos los campos'
    errorMessage.style.color = 'red'
    return
  }

  const data = { email, password }

  try {
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error HTTP! Estado: ${response.status}`)
    }

    const responseData = await response.json()

    if (responseData.error) {
      errorMessage.textContent = responseData.error
      errorMessage.style.color = 'red'
    } else {
      localStorage.setItem('userId', responseData.userId)
      window.location.href = './dashboard.html'
    }
  } catch (err) {
    errorMessage.textContent = err.message || 'Ha ocurrido un error'
    errorMessage.style.color = 'red'
  }
})
