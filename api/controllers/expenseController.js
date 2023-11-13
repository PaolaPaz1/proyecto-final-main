import Expense from '../models/expense.js'

class ExpenseController {
  async newExpense (req, res) {
    const { userId, amount, description, category, date } = req.body

    try {
      await Expense.newExpense(userId, amount, description, category, date)
      res.json({ message: 'Expense created' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async getExpenses (req, res) {
    const { userId, year, month } = req.body

    try {
      const [expenses] = await Expense.getExpenses(userId, year, month)

      res.json(expenses)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async getLimitedExpenses (req, res) {
    const { userId, year, month } = req.body

    try {
      const [expenses] = await Expense.getLimitedExpenses(userId, year, month)

      res.json(expenses)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async getTotalExpenses (req, res) {
    const { userId, year, month } = req.body

    try {
      const [expenses] = await Expense.getTotalExpenses(userId, year, month)

      res.json(expenses)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async getExpensesByCategory (req, res) {
    const { userId, year, month } = req.body

    try {
      const [expenses] = await Expense.getExpensesByCategory(userId, year, month)

      res.json(expenses)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async checkMonthlyLimitExp (req, res) {
    const { userId, year, month } = req.body

    try {
      const [expenses] = await Expense.checkMonthlyLimitExp(userId, year, month)

      res.json(expenses)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }
}

export default ExpenseController
