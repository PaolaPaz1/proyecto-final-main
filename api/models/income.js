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

  static async getIncome (userId, year, month) {
    const income = await db.execute(
      `SELECT
        monto,
        categoria,
        descripcion,
        fecha
      FROM income
      WHERE id_usuario = ? and YEAR(fecha) = ? and MONTH(fecha) = ?
      ORDER BY id_ingreso DESC`, [userId, year, month]
    )

    return income
  }

  static async getLimitedIncome (userId, year, month) {
    const income = await db.execute(
      `SELECT
        monto,
        categoria,
        descripcion,
        fecha
      FROM income
      WHERE id_usuario = ? and YEAR(fecha) = ? and MONTH(fecha) = ?
      ORDER BY monto DESC
      LIMIT 5`, [userId, year, month]
    )

    return income
  }

  static async getTotalIncome (userId, year, month) {
    const income = await db.execute(
      `SELECT
        SUM(monto) AS total
      FROM income
      WHERE id_usuario = ? and YEAR(fecha) = ? and MONTH(fecha) = ? `, [userId, year, month]
    )

    return income
  }

  static async getIncomeByCategory (userId, year, month) {
    const income = await db.execute(
      `SELECT
        categoria,
        SUM(monto) AS total
      FROM income
      WHERE id_usuario = ? and YEAR(fecha) = ? and MONTH(fecha) = ?
      GROUP BY categoria`, [userId, year, month]
    )

    return income
  }

  static async checkMonthlyLimitInc (userId, year, month) {
    const [incomes] = await db.execute(
      `SELECT
        SUM(monto) AS total
      FROM income
      WHERE id_usuario = ? AND YEAR(fecha) = ? AND MONTH(fecha) = ?`, [userId, year, month]
    )

    const [limit] = await db.execute(
      `SELECT
        limite
      FROM limite_mensual
      WHERE id_usuario = ? AND año = ? AND mes = ?`, [userId, year, month]
    )

    if (!limit[0].limite) return false

    if (incomes[0].total > limit[0].limite) return true

    return false
  }
}

export default Income
