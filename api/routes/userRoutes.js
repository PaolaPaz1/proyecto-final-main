import express from 'express'
import UserController from '../controllers/userController.js'
import cors from 'cors'
import corsOptions from '../middlewares/corsConfig.js'

const routerUser = express.Router()
const userController = new UserController()

/*
  - Cada una de estas rutas corresponde a un endpoint de la API
  Y a todas estas rutas se les antepone el prefijo /users
  - Por ejemplo: http://localhost:3000/users/user
*/
routerUser.get('/user', cors(corsOptions), userController.getUser)
routerUser.post('/login', cors(corsOptions), userController.loginUser)
routerUser.post('/register', cors(corsOptions), userController.registerUser)
routerUser.patch('/patch', cors(corsOptions), userController.patchUser)
routerUser.post('/set-monthly-limit', cors(corsOptions), userController.setMonthlyLimit)
routerUser.post('/get-monthly-limit', cors(corsOptions), userController.getMonthlyLimit)

export default routerUser
