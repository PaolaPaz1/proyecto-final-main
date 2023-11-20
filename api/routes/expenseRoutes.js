import express from 'express'
import ExpenseController from '../controllers/expenseController.js'
import cors from 'cors'
import corsOptions from '../middlewares/corsConfig.js'

const routerExpense = express.Router()
const expenseController = new ExpenseController()

/*
  - Cada una de estas rutas corresponde a un endpoint de la API
  - Y a todas estas rutas se les antepone el prefijo /expenses
  - Por ejemplo: http://localhost:3000/expenses/new-expense
*/
routerExpense.post('/new-expense', cors(corsOptions), expenseController.newExpense)
routerExpense.post('/get-expenses', cors(corsOptions), expenseController.getExpenses)
routerExpense.post('/get-limited-expenses', cors(corsOptions), expenseController.getLimitedExpenses)
routerExpense.post('/get-total-expenses', cors(corsOptions), expenseController.getTotalExpenses)
routerExpense.post('/get-expenses-by-category', cors(corsOptions), expenseController.getExpensesByCategory)
routerExpense.post('/check-monthly-limit', cors(corsOptions), expenseController.checkMonthlyLimitExp)

export default routerExpense
