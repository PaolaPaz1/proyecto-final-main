import Income from '../models/income.js'

class IncomeController {
  async newIncome (req, res) {
    const { userId, amount, description, category, date } = req.body

    try {
      await Income.newIncome(userId, amount, description, category, date)
      res.json({ message: 'Income created' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async getIncome (req, res) {
    const { userId } = req.body

    try {
      const [income] = await Income.getIncome(userId)

      res.json(income)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async getLimitedIncome (req, res) {
    const { userId } = req.body

    try {
      const [income] = await Income.getLimitedIncome(userId)

      res.json(income)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async getTotalIncome (req, res) {
    const { userId } = req.body

    try {
      const [income] = await Income.getTotalIncome(userId)

      res.json(income)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async getIncomeByCategory (req, res) {
    const { userId } = req.body

    try {
      const [income] = await Income.getIncomeByCategory(userId)

      res.json(income)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async checkMonthlyLimitInc (req, res) {
    const { userId, year, month } = req.body

    try {
      const [income] = await Income.checkMonthlyLimitInc(userId, year, month)

      res.json(income)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }
}

export default IncomeController
