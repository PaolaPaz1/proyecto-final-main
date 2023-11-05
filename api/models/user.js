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
}

export default User
