import express from 'express'
import IncomeController from '../controllers/incomeController.js'
import cors from 'cors'
import corsOptions from '../middleware/corsConfig.js'

const routerIncome = express.Router()
const incomeController = new IncomeController()

routerIncome.post('/new-income', cors(corsOptions), incomeController.newIncome)
routerIncome.post('/get-incomes', cors(corsOptions), incomeController.getIncome)

export default routerIncome
