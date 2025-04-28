
import express from 'express'
import { protect } from '../auth/auth.js';

import {loginUser, createUser,deleteAllUsers,deleteUser,getAllUsers,getUserById } from '../controllers/userController.js'

const router = express.Router()


router.post('/users',createUser)
router.post('/login', loginUser)

router.get('/users',protect,getAllUsers)

router.get('/users/:id',protect,getUserById)

router.delete('/users/:id',protect,deleteUser)

router.delete('/users',protect,deleteAllUsers)


export default router



