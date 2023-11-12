import User from '../models/user.js'

class UserController {
  async getUser (req, res) {
    const userId = req.query.id
    if (!userId) throw new Error('No user id provided')

    try {
      const user = await User.getById(userId)
      if (user.length === 0) return res.status(404).json({ error: 'User not found' })

      res.json(user)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async loginUser (req, res) {
    const { email, password } = req.body
    if (!email || !password) throw new Error('Email and password required')

    try {
      const user = await User.login(email, password)
      if (user.length === 0) return res.status(404).json({ error: 'User not found' })

      res.json({ userId: user[0].id })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async registerUser (req, res) {
    const { name, lastname, email, password } = req.body
    if (!name || !lastname || !email || !password) throw new Error('All fields required')

    try {
      await User.register(name, lastname, email, password)
      res.json({ message: 'User created' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async patchUser (req, res) {
    const { id } = req.query
    const { name, lastname, email, password } = req.body
    if (!id || !name || !lastname || !email || !password) throw new Error('All fields required')

    try {
      await User.update(id, name, lastname, email, password)
      res.json({ message: 'User updated' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async setMonthlyLimit (req, res) {
    const { userId, limit, year, month } = req.body
    if (!userId || !limit || !year || !month) throw new Error('All fields required')

    try {
      await User.setMonthlyLimit(userId, limit, year, month)
      res.json({ message: 'Monthly limit set' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async getMonthlyLimit (req, res) {
    const { userId, year, month } = req.body
    if (!userId || !year || !month) throw new Error('All fields required')

    try {
      const [limit] = await User.getMonthlyLimit(userId, year, month)
      res.json(limit)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }
}

export default UserController
