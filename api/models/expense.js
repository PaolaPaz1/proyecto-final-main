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
      WHERE id_usuario = ?`, [userId]
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
}

export default Expense
