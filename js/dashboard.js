const userId = localStorage.getItem('userId')
const body = document.querySelector('body')
const sidebar = body.querySelector('nav')
const toggle = body.querySelector('.toggle')
const modeSwitch = body.querySelector('.toggle-switch')
const modeText = body.querySelector('.mode-text')
const home = body.querySelector('.home')

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

const getUser = async () => {
  await fetch(`http://localhost:3000/users/user?id=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      const p = document.createElement('p')
      data.forEach(data => {
        p.innerHTML = `
          <p class="text">Name: ${data.name} ${data.lastname} || Email: ${data.email}</p>
        `
      })
      return home.appendChild(p)
    })
}

getUser()
