function createTable (data, divId, limited = false) {
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

  if (limited) {
    const limitedRow = document.createElement('tr')
    const trMore = document.createElement('tr')

    const tdMore = document.createElement('td')
    tdMore.setAttribute('colspan', Object.keys(data[0]).length)
    tdMore.textContent = '...'
    tdMore.style.textAlign = 'center'
    trMore.appendChild(tdMore)

    const td = document.createElement('td')
    td.setAttribute('colspan', Object.keys(data[0]).length)
    td.textContent = `Mostrando solo ${data.length} resultado${data.length > 1 ? 's' : ''} de mayor cantidad`
    td.style.textAlign = 'center'
    limitedRow.appendChild(td)

    table.appendChild(trMore)
    table.appendChild(limitedRow)
  }

  // Add the table to the specified DOM element
  const targetDiv = document.getElementById(divId)
  targetDiv.innerHTML = ''
  targetDiv.appendChild(table)
}

export function getIncome (divId, limited = false) {
  fetch('http://localhost:3000/incomes/get-incomes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: localStorage.getItem('userId') })
  })
    .then(response => response.json())
    .then(data => {
      createTable(data, divId, limited)
    })
    .catch(err => console.error(err))
}

export function getExpenses (divId, limited = false) {
  const endpoint = limited ? 'get-limited-expenses' : 'get-expenses'

  fetch(`http://localhost:3000/expenses/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: localStorage.getItem('userId') })
  })
    .then(response => response.json())
    .then(data => {
      createTable(data, divId, limited)
    })
    .catch(err => console.error(err))
}
