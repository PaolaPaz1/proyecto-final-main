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
    const { userId } = req.body

    try {
      const [expenses] = await Expense.getExpenses(userId)

      res.json(expenses)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }
}

export default ExpenseController
