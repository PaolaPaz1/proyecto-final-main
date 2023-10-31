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

    if (response.status === 409) {
      message.style.color = 'red'
      message.textContent = 'User already exists'
    } else {
      message.style.color = 'green'
      message.textContent = 'User created'
    }
  } catch (err) {
    console.error(err)
  }
})
