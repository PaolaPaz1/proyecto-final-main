function createTable (data, divId) {
  if (data.length === 0) {
    const targetDiv = document.getElementById(divId)
    targetDiv.innerHTML = ''
    const p = document.createElement('p')
    p.textContent = 'Sin datos por mostrar'
    targetDiv.appendChild(p)
    return
  }

  // Create a table element
  const table = document.createElement('table')
  table.classList.add('custom-table')

  // Create table header row
  const headerRow = document.createElement('tr')
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement('th')
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1)
    headerRow.appendChild(th)
  })
  table.appendChild(headerRow)

  // Create table body rows
  data.forEach(item => {
    const row = document.createElement('tr')
    Object.values(item).forEach((value, index) => {
      const td = document.createElement('td')

      if (index === 0) {
        td.textContent = `$${value}`
      } else if (index === Object.values(item).length - 1) {
        const date = new Date(value)
        td.textContent = date.toISOString().split('T')[0]
      } else {
        td.textContent = value
      }

      row.appendChild(td)
    })
    table.appendChild(row)
  })

  // Add the table to the specified DOM element
  const targetDiv = document.getElementById(divId)
  targetDiv.innerHTML = ''
  targetDiv.appendChild(table)
}

export function getIncome (divId) {
  fetch('http://localhost:3000/get-income', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: localStorage.getItem('userId') })
  })
    .then(response => response.json())
    .then(data => {
      createTable(data, divId)
    })
    .catch(err => console.error(err))
}

export function getExpenses (divId) {
  fetch('http://localhost:3000/get-expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: localStorage.getItem('userId') })
  })
    .then(response => response.json())
    .then(data => {
      createTable(data, divId)
    })
    .catch(err => console.error(err))
}