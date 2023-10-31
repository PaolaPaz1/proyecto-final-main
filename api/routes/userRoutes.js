import express from 'express'
import UserController from '../controllers/userController.js'
import cors from 'cors'
import corsOptions from '../middleware/corsConfig.js'

const router = express.Router()
const userController = new UserController()

router.get('/user', cors(corsOptions), userController.getUser)
router.post('/login', cors(corsOptions), userController.loginUser)
router.post('/register', cors(corsOptions), userController.registerUser)

export default router
