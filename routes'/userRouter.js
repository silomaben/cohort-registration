const {Router} = require('express');
const { registerUsers } = require('../registrationController.js/registrationController');
const usersRouter = Router()


usersRouter.post('/register', registerUsers)


module.exports = {
    usersRouter
}