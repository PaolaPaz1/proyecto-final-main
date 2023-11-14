import db from '../database.js'

class Expense {
  static async newExpense (userId, amount, description, category, date) {
    await db.execute(
      `INSERT INTO expenses
        (id_usuario, monto, descripcion, categoria, fecha)
      VALUES
        (?, ?, ?, ?, ?)`, [userId, amount, description, category, date]
    )
  }

  static async getExpenses (userId, year, month) {
    const expenses = await db.execute(
      `SELECT
        monto,
        categoria,
        descripcion,
        fecha
      FROM expenses
      WHERE id_usuario = ? and YEAR(fecha) = ? and MONTH(fecha) = ?
      ORDER BY id_egreso DESC`, [userId, year, month]
    )

    return expenses
  }

  static async getLimitedExpenses (userId, year, month) {
    const expenses = await db.execute(
      `SELECT
        monto,
        categoria,
        descripcion,
        fecha
      FROM expenses
      WHERE id_usuario = ? and YEAR(fecha) = ? and MONTH(fecha) = ?
      ORDER BY monto DESC
      LIMIT 5`, [userId, year, month]
    )

    return expenses
  }

  static async getTotalExpenses (userId, year, month) {
    const expenses = await db.execute(
      `SELECT
        SUM(monto) AS total
      FROM expenses
      WHERE id_usuario = ? and YEAR(fecha) = ? and MONTH(fecha) = ?`, [userId, year, month]
    )

    return expenses
  }

  static async getExpensesByCategory (userId, year, month) {
    const expenses = await db.execute(
      `SELECT
        categoria,
        SUM(monto) AS total
      FROM expenses
      WHERE id_usuario = ? and YEAR(fecha) = ? and MONTH(fecha) = ?
      GROUP BY categoria`, [userId, year, month]
    )

    return expenses
  }

  static async checkMonthlyLimitExp (userId, year, month) {
    const [expenses] = await db.execute(
      `SELECT
        SUM(monto) AS total
      FROM expenses
      WHERE id_usuario = ? AND YEAR(fecha) = ? AND MONTH(fecha) = ?`, [userId, year, month]
    )

    const [limit] = await db.execute(
      `SELECT
        limite
      FROM limite_mensual
      WHERE id_usuario = ? AND año = ? AND mes = ?`, [userId, year, month]
    )

    if (!limit[0]) return false

    const result = { total: expenses[0].total || 0, limit: limit[0].limite }

    return result
  }
}

export default Expense
