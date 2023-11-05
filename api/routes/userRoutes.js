import express from 'express'
import UserController from '../controllers/userController.js'
import cors from 'cors'
import corsOptions from '../middleware/corsConfig.js'

const routerUser = express.Router()
const userController = new UserController()

routerUser.get('/user', cors(corsOptions), userController.getUser)
routerUser.post('/login', cors(corsOptions), userController.loginUser)
routerUser.post('/register', cors(corsOptions), userController.registerUser)
routerUser.patch('/patch', cors(corsOptions), userController.patchUser)

export default routerUser
