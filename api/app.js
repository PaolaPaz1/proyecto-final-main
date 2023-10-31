import express from 'express'
import cors from 'cors'

import routerUser from './routes/userRoutes.js'
import routerExpense from './routes/expenseRoutes.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/users', routerUser)
app.use('/expenses', routerExpense)

/* app.post('/income', cors(corsOptions), async (req, res) => {
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
*/

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
