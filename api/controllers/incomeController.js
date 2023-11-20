import Income from '../models/income.js' // Importar el modelo de ingreso

/*
  - Es necesario importar el modelo de ingreso para poder usar
  los métodos de la clase Income
  - Por ejemplo: const IncomeController = new IncomeController()
  - Se utiliza async/await para que las consultas a la base de datos
  se ejecuten de forma asíncrona
  - req: contiene la información de la solicitud HTTP
  - res: contiene la información de la respuesta HTTP
  - next: es una función que se ejecuta cuando se termina de ejecutar
  el controlador, y que se utiliza para pasar el control al siguiente
  middleware o controlador
*/
class IncomeController {
  // Registra un nuevo ingreso
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

  // Retorna los ingresos del usuario con el id especificado
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

  // Retorna los 5 ingresos más altos del usuario con el id especificado
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

  // Retorna el total de ingresos del usuario con el id especificado
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

  // Retorna los ingresos agrupados por categoría del usuario con el id especificado
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
