import express from 'express'
import IncomeController from '../controllers/incomeController.js'
import cors from 'cors'
import corsOptions from '../middlewares/corsConfig.js'

const routerIncome = express.Router()
const incomeController = new IncomeController()

/*
  - Cada una de estas rutas corresponde a un endpoint de la API
  - Y a todas estas rutas se les antepone el prefijo /incomes
  - Por ejemplo: http://localhost:3000/incomes/new-income
*/
routerIncome.post('/new-income', cors(corsOptions), incomeController.newIncome)
routerIncome.post('/get-incomes', cors(corsOptions), incomeController.getIncome)
routerIncome.post('/get-limited-incomes', cors(corsOptions), incomeController.getLimitedIncome)
routerIncome.post('/get-total-incomes', cors(corsOptions), incomeController.getTotalIncome)
routerIncome.post('/get-incomes-by-category', cors(corsOptions), incomeController.getIncomeByCategory)

export default routerIncome
