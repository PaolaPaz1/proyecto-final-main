import express from 'express'
import ExpenseController from '../controllers/expenseController.js'
import cors from 'cors'
import corsOptions from '../middleware/corsConfig.js'

const routerExpense = express.Router()
const expenseController = new ExpenseController()

routerExpense.post('/new-expense', cors(corsOptions), expenseController.newExpense)
routerExpense.post('/get-expenses', cors(corsOptions), expenseController.getExpenses)
routerExpense.post('/get-limited-expenses', cors(corsOptions), expenseController.getLimitedExpenses)
routerExpense.post('/get-total-expenses', cors(corsOptions), expenseController.getTotalExpenses)
routerExpense.post('/get-expenses-by-category', cors(corsOptions), expenseController.getExpensesByCategory)

export default routerExpense
