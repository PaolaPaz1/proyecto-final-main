import User from '../models/user.js'

class UserController {
  async getUser (req, res, next) {
    try {
      const userId = req.query.id
      if (!userId) return next(new Error('Id de usuario es requerido'))

      const user = await User.getById(userId)
      if (user.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' })

      res.json(user)
    } catch (err) {
      next(err)
    }
  }

  async loginUser (req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) return next(new Error('Correo y contraseña son requeridos'))

      const user = await User.login(email, password)
      if (user.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' })

      res.json({ userId: user[0].id })
    } catch (err) {
      console.error(err)
      next(err)
    }
  }

  async registerUser (req, res, next) {
    try {
      const { name, lastname, email, password } = req.body
      if (!name || !lastname || !email || !password) return next(new Error('Todos los campos son requeridos'))

      await User.register(name, lastname, email, password)
      res.json({ message: 'Usuario creado' })
    } catch (err) {
      next(err)
    }
  }

  async patchUser (req, res, next) {
    try {
      const { id } = req.query
      const { name, lastname, email, password } = req.body
      if (!id || !name || !lastname || !email || !password) return next(new Error('Todos los campos son requeridos'))

      await User.update(id, name, lastname, email, password)
      res.json({ message: 'Usuario actualizado' })
    } catch (err) {
      next(err)
    }
  }

  async setMonthlyLimit (req, res, next) {
    try {
      const { userId, limit, year, month } = req.body
      if (!userId || !limit || !year || !month) return next(new Error('Todos los campos son requeridos'))

      await User.setMonthlyLimit(userId, limit, year, month)
      res.json({ message: 'Límite mensual establecido' })
    } catch (err) {
      next(err)
    }
  }

  async getMonthlyLimit (req, res, next) {
    try {
      const { userId, year, month } = req.body
      if (!userId || !year || !month) return next(new Error('Todos los campos son requeridos'))

      const [limit] = await User.getMonthlyLimit(userId, year, month)

      if (!limit) return res.json({ message: 'Sin límite establecido' })

      res.json(limit)
    } catch (err) {
      next(err)
    }
  }
}

export default UserController
