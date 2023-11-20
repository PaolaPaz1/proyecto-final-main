import db from '../database.js' // Importar la conexión a la base de datos

/*
  Se usa la palabra clave static para que los métodos de la clase
  puedan ser llamados sin necesidad de instanciar la clase
  Por ejemplo: User.getById(1)
  Se utiliza async/await para que las consultas a la base de datos
  se ejecuten de forma asíncrona
*/
class User {
  // Retorna los datos del usuario con el id especificado
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

  // Inicia sesión con el usuario y contraseña especificados
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

  // Registra un nuevo usuario
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

  // Actualiza los datos del usuario con el id especificado
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

  // Actualiza el límite mensual del usuario con el id especificado
  static async setMonthlyLimit (userId, limit, year, month) {
    await db.execute(
      `INSERT INTO limite_mensual
        (id_usuario, año, mes, limite)
      VALUES
        (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE limite = VALUES(limite)`, [userId, year, month, limit]
    )
  }

  // Retorna el límite mensual del usuario con el id especificado
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
