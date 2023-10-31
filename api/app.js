import express from 'express'
import cors from 'cors'

import routerUser from './routes/userRoutes.js'
import routerExpense from './routes/expenseRoutes.js'
import routerIncome from './routes/incomeRoutes.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/users', routerUser)
app.use('/expenses', routerExpense)
app.use('/incomes', routerIncome)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
