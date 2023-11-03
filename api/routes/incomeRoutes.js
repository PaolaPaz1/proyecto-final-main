import express from 'express'
import IncomeController from '../controllers/incomeController.js'
import cors from 'cors'
import corsOptions from '../middleware/corsConfig.js'

const routerIncome = express.Router()
const incomeController = new IncomeController()

routerIncome.post('/new-income', cors(corsOptions), incomeController.newIncome)
routerIncome.post('/get-incomes', cors(corsOptions), incomeController.getIncome)
routerIncome.post('/get-limited-incomes', cors(corsOptions), incomeController.getLimitedIncome)
routerIncome.post('/get-total-incomes', cors(corsOptions), incomeController.getTotalIncome)

export default routerIncome
