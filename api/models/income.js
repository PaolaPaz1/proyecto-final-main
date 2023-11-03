import db from '../database.js'

class Income {
  static async newIncome (userId, amount, description, category, date) {
    await db.execute(
      `INSERT INTO income
        (id_usuario, monto, descripcion, categoria, fecha)
      VALUES
        (?, ?, ?, ?, ?)`, [userId, amount, description, category, date]
    )
  }

  static async getIncome (userId) {
    const income = await db.execute(
      `SELECT
        monto,
        categoria,
        descripcion,
        fecha
      FROM income
      WHERE id_usuario = ?`, [userId]
    )

    return income
  }

  static async getLimitedIncome (userId) {
    const income = await db.execute(
      `SELECT
        monto,
        categoria,
        descripcion,
        fecha
      FROM income
      WHERE id_usuario = ?
      ORDER BY monto DESC
      LIMIT 5`, [userId]
    )

    return income
  }
}

export default Income
