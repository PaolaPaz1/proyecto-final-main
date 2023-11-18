import Expense from '../models/expense.js'

class ExpenseController {
  async newExpense (req, res, next) {
    try {
      const { userId, amount, description, category, date } = req.body
      if (!userId || !amount || !description || !category || !date) return next(new Error('Todos los campos son requeridos'))
      await Expense.newExpense(userId, amount, description, category, date)
      res.json({ message: 'Egreso creado' })
    } catch (err) {
      next(err)
    }
  }

  async getExpenses (req, res, next) {
    try {
      const { userId, year, month } = req.body
      if (!userId || !year || !month) return next(new Error('Todos los campos son requeridos'))

      const [expenses] = await Expense.getExpenses(userId, year, month)

      res.json(expenses)
    } catch (err) {
      next(err)
    }
  }

  async getLimitedExpenses (req, res, next) {
    try {
      const { userId, year, month } = req.body
      if (!userId || !year || !month) return next(new Error('Todos los campos son requeridos'))

      const [expenses] = await Expense.getLimitedExpenses(userId, year, month)

      res.json(expenses)
    } catch (err) {
      next(err)
    }
  }

  async getTotalExpenses (req, res, next) {
    try {
      const { userId, year, month } = req.body
      if (!userId || !year || !month) return next(new Error('Todos los campos son requeridos'))

      const [expenses] = await Expense.getTotalExpenses(userId, year, month)

      res.json(expenses)
    } catch (err) {
      next(err)
    }
  }

  async getExpensesByCategory (req, res, next) {
    try {
      const { userId, year, month } = req.body
      if (!userId || !year || !month) return next(new Error('Todos los campos son requeridos'))

      const [expenses] = await Expense.getExpensesByCategory(userId, year, month)

      res.json(expenses)
    } catch (err) {
      next(err)
    }
  }

  async checkMonthlyLimitExp (req, res, next) {
    try {
      const { userId, year, month } = req.body
      if (!userId || !year || !month) return next(new Error('Todos los campos son requeridos'))

      const result = await Expense.checkMonthlyLimitExp(userId, year, month)

      res.json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default ExpenseController
