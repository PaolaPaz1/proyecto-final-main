import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const corsOptions = {
  origin: '*'
}

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users_crud_php'
})

app.get('/user', cors(corsOptions), async (req, res) => {
  const userId = req.query.id
  if (!userId) return res.status(400).send('User ID not provided')

  try {
    const [user] = await db.execute(
      `SELECT 
        name,
        lastname,
        email
      FROM users
      WHERE id = ?`, [userId]
    )

    if (user.length === 0) return res.status(404).send('User not found')

    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send(`Error: ${err}`)
  }
})

app.post('/login', cors(corsOptions), async (req, res) => {
  const { email, password } = req.body

  try {
    const [user] = await db.execute(
      `SELECT
        id,
        name,
        email
      FROM users
      WHERE email = ? AND password = ?`, [email, password]
    )

    if (user.length === 0) return res.status(401).send('User not found')

    res.json({ userId: user[0].id })
  } catch (err) {
    console.error(err)
    res.status(500).send(`Error: ${err}`)
  }
})

app.post('/register', cors(corsOptions), async (req, res) => {
  const { name, lastname, email, password } = req.body

  try {
    const [user] = await db.execute(
      `SELECT
        id
      FROM users
      WHERE email = ?`, [email]
    )

    if (user.length > 0) return res.status(409).json({ message: 'User already exists' })

    await db.execute(
      `INSERT INTO users
        (name, lastname, email, password)
      VALUES
        (?, ?, ?, ?)`, [name, lastname, email, password]
    )

    res.json({ message: 'User created' })
  } catch (err) {
    console.error(err)
    res.status(500).send(`Error: ${err}`)
  }
})

app.post('/income', cors(corsOptions), async (req, res) => {
  const { userId, amount, description, category, date } = req.body

  try {
    await db.execute(
      `INSERT INTO income
        (id_usuario, monto, descripcion, categoria, fecha)
      VALUES
        (?, ?, ?, ?, ?)`, [userId, amount, description, category, date]
    )

    res.json({ message: 'Income created' })
  } catch (err) {
    console.error(err)
    res.status(500).send(`Error: ${err}`)
  }
})

app.post('/expenses', cors(corsOptions), async (req, res) => {
  const { userId, amount, description, category, date } = req.body

  try {
    await db.execute(
      `INSERT INTO expenses
        (id_usuario, monto, descripcion, categoria, fecha)
      VALUES
        (?, ?, ?, ?, ?)`, [userId, amount, description, category, date]
    )

    res.json({ message: 'Expense created' })
  } catch (err) {
    console.error(err)
    res.status(500).send(`Error: ${err}`)
  }
})

app.post('/get-income', cors(corsOptions), async (req, res) => {
  const { userId } = req.body

  try {
    const [income] = await db.execute(
      `SELECT
        monto,
        categoria,
        descripcion,
        fecha
      FROM income
      WHERE id_usuario = ?`, [userId]
    )

    res.json(income)
  } catch (err) {
    console.error(err)
    res.status(500).send(`Error: ${err}`)
  }
})

app.post('/get-expenses', cors(corsOptions), async (req, res) => {
  const { userId } = req.body

  try {
    const [expenses] = await db.execute(
      `SELECT
        monto,
        categoria,
        descripcion,
        fecha
      FROM expenses
      WHERE id_usuario = ?`, [userId]
    )

    res.json(expenses)
  } catch (err) {
    console.error(err)
    res.status(500).send(`Error: ${err}`)
  }
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
