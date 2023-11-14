import User from '../models/user.js'

class UserController {
  async getUser (req, res) {
    const userId = req.query.id
    if (!userId) throw new Error('Id de usuario es requerido')

    try {
      const user = await User.getById(userId)
      if (user.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' })

      res.json(user)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async loginUser (req, res) {
    const { email, password } = req.body
    if (!email || !password) throw new Error('Correo y contraseña son requeridos')

    try {
      const user = await User.login(email, password)
      if (user.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' })

      res.json({ userId: user[0].id })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async registerUser (req, res) {
    const { name, lastname, email, password } = req.body
    if (!name || !lastname || !email || !password) throw new Error('Todos los campos son requeridos')

    try {
      await User.register(name, lastname, email, password)
      res.json({ message: 'Usuario creado' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async patchUser (req, res) {
    const { id } = req.query
    const { name, lastname, email, password } = req.body
    if (!id || !name || !lastname || !email || !password) throw new Error('Todos los campos son requeridos')

    try {
      await User.update(id, name, lastname, email, password)
      res.json({ message: 'Usuario actualizado' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async setMonthlyLimit (req, res) {
    const { userId, limit, year, month } = req.body
    if (!userId || !limit || !year || !month) throw new Error('Todos los campos son requeridos')

    try {
      await User.setMonthlyLimit(userId, limit, year, month)
      res.json({ message: 'Límite mensual establecido' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  async getMonthlyLimit (req, res) {
    const { userId, year, month } = req.body
    if (!userId || !year || !month) throw new Error('Todos los campos son requeridos')

    try {
      const [limit] = await User.getMonthlyLimit(userId, year, month)

      if (!limit) return res.json({ message: 'Sin límite establecido' })

      res.json(limit)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }
}

export default UserController
