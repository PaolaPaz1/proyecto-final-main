import db from '../database.js' // Importar la conexión a la base de datos

/*
  Se usa la palabra clave static para que los métodos de la clase
  puedan ser llamados sin necesidad de instanciar la clase
  Por ejemplo: Income.newIncome(1, 100, 'Comida', 'Alimentación', '2021-01-01')
  Se utiliza async/await para que las consultas a la base de datos
  se ejecuten de forma asíncrona
*/
class Income {
  // Registra un nuevo ingreso
  static async newIncome (userId, amount, description, category, date) {
    await db.execute(
      `INSERT INTO income
        (id_usuario, monto, descripcion, categoria, fecha)
      VALUES
        (?, ?, ?, ?, ?)`, [userId, amount, description, category, date]
    )
  }

  // Retorna los ingresos del usuario con el id especificado
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

  // Retorna los 5 ingresos más altos del usuario con el id especificado
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

  // Retorna el total de ingresos del usuario con el id especificado
  static async getTotalIncome (userId, year, month) {
    const income = await db.execute(
      `SELECT
        SUM(monto) AS total
      FROM income
      WHERE id_usuario = ? and YEAR(fecha) = ? and MONTH(fecha) = ? `, [userId, year, month]
    )

    return income
  }

  // Retorna los ingresos agrupados por categoría del usuario con el id especificado
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
}

export default Income
