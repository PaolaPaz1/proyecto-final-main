import Expense from '../models/expense.js' // Importar el modelo de egreso

/*
  - Es necesario importar el modelo de egreso para poder usar
  los métodos de la clase Expense
  - Por ejemplo: const ExpenseController = new ExpenseController()
  - Se utiliza async/await para que las consultas a la base de datos
  se ejecuten de forma asíncrona
  - req: contiene la información de la solicitud HTTP
  - res: contiene la información de la respuesta HTTP
  - next: es una función que se ejecuta cuando se termina de ejecutar
  el controlador, y que se utiliza para pasar el control al siguiente
  middleware o controlador
*/
class ExpenseController {
  // Registra un nuevo egreso
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

  // Retorna los egresos del usuario con el id especificado
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

  // Retorna los 5 egresos más altos del usuario con el id especificado
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

  // Retorna el total de egresos del usuario con el id especificado
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

  // Retorna los egresos agrupados por categoría del usuario con el id especificado
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

  // Evalúa si el usuario con el id especificado ha superado su límite mensual de egresos
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
