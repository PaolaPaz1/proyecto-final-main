import mysql from 'mysql2/promise'

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users_crud_php'
})

export default db
