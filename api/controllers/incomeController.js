import Income from '../models/income.js'

class IncomeController {
  async newIncome (req, res, next) {
    try {
      const { userId, amount, description, category, date } = req.body
      if (!userId || !amount || !description || !category || !date) return next(new Error('Todos los campos son requeridos'))

      await Income.newIncome(userId, amount, description, category, date)
      res.json({ message: 'Ingreso creado' })
    } catch (err) {
      next(err)
    }
  }

  async getIncome (req, res, next) {
    try {
      const { userId, year, month } = req.body
      if (!userId || !year || !month) return next(new Error('Todos los campos son requeridos'))

      const [income] = await Income.getIncome(userId, year, month)

      res.json(income)
    } catch (err) {
      next(err)
    }
  }

  async getLimitedIncome (req, res, next) {
    try {
      const { userId, year, month } = req.body
      if (!userId || !year || !month) return next(new Error('Todos los campos son requeridos'))

      const [income] = await Income.getLimitedIncome(userId, year, month)

      res.json(income)
    } catch (err) {
      next(err)
    }
  }

  async getTotalIncome (req, res, next) {
    try {
      const { userId, year, month } = req.body
      if (!userId || !year || !month) return next(new Error('Todos los campos son requeridos'))

      const [income] = await Income.getTotalIncome(userId, year, month)

      res.json(income)
    } catch (err) {
      next(err)
    }
  }

  async getIncomeByCategory (req, res, next) {
    try {
      const { userId, year, month } = req.body
      if (!userId || !year || !month) return next(new Error('Todos los campos son requeridos'))

      const [income] = await Income.getIncomeByCategory(userId, year, month)

      res.json(income)
    } catch (err) {
      next(err)
    }
  }
}

export default IncomeController
