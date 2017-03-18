'ues strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.get('/users', controller.getUsers)
router.post('/user', controller.createUser)
router.put('/user/:email', controller.updateUser)
router.delete('/user/:email', controller.deleteUser)

router.post('/user/login', controller.login)
router.get('/verify/:token', controller.verifyToken)

module.exports = router
