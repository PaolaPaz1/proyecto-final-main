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

  static async getExpenses (userId) {
    const expenses = await db.execute(
      `SELECT
        monto,
        categoria,
        descripcion,
        fecha
      FROM expenses
      WHERE id_usuario = ?
      ORDER BY id_egreso DESC`, [userId]
    )

    return expenses
  }

  static async getLimitedExpenses (userId) {
    const expenses = await db.execute(
      `SELECT
        monto,
        categoria,
        descripcion,
        fecha
      FROM expenses
      WHERE id_usuario = ?
      ORDER BY monto DESC
      LIMIT 5`, [userId]
    )

    return expenses
  }

  static async getTotalExpenses (userId) {
    const expenses = await db.execute(
      `SELECT
        SUM(monto) AS total
      FROM expenses
      WHERE id_usuario = ?`, [userId]
    )

    return expenses
  }

  static async getExpensesByCategory (userId) {
    const expenses = await db.execute(
      `SELECT
        categoria,
        SUM(monto) AS total
      FROM expenses
      WHERE id_usuario = ?
      GROUP BY categoria`, [userId]
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

    if (!limit[0].limite) return false

    if (expenses[0].total > limit[0].limite) return true

    return false
  }
}

export default Expense
