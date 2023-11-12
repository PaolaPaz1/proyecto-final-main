const userId = localStorage.getItem('userId')
const body = document.querySelector('body')
const home = body.querySelector('.home')

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
