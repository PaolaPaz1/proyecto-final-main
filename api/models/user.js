import db from '../database.js'

class User {
  static async getById (id) {
    const [user] = await db.execute(
      `SELECT 
        name,
        lastname,
        email,
        password
      FROM users
      WHERE id = ?`, [id]
    )

    return user
  }

  static async login (email, password) {
    const [user] = await db.execute(
      `SELECT
        id,
        name,
        email
      FROM users
      WHERE email = ? AND password = ?`, [email, password]
    )

    return user
  }

  static async register (name, lastname, email, password) {
    const [user] = await db.execute(
      `SELECT
        id
      FROM users
      WHERE email = ?`, [email]
    )

    if (user.length > 0) throw new Error('User already exists')

    await db.execute(
      `INSERT INTO users (
        name,
        lastname,
        email,
        password
      ) VALUES (?, ?, ?, ?)`, [name, lastname, email, password]
    )
  }

  static async update (id, name, lastname, email, password) {
    await db.execute(
      `UPDATE users
      SET
        name = ?,
        lastname = ?,
        email = ?,
        password = ?
      WHERE id = ?`, [name, lastname, email, password, id]
    )
  }

  static async setMonthlyLimit (userId, limit, year, month) {
    await db.execute(
      `INSERT INTO limite_mensual
        (id_usuario, año, mes, limite)
      VALUES
        (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE limite = ?`, [userId, year, month, limit, limit]
    )
  }

  static async getMonthlyLimit (userId, year, month) {
    const [limit] = await db.execute(
      `SELECT
        limite
      FROM limite_mensual
      WHERE id_usuario = ? AND año = ? AND mes = ?`, [userId, year, month]
    )

    return limit
  }
}

export default User
