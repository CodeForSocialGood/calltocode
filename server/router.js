const express = require('express')
const setupController = require('./controllers/setupController')._init()
const emailController = require('./controllers/emailController')._init()
const signupController = require('./controllers/signupController')._init()
const indexController = require('./controllers/indexController')._init()
const loginController = require('./controllers/loginController')._init()
const userController = require('./controllers/userController')._init()
const opportunitiesController = require('./controllers/opportunitiesController')._init()

const router = express.Router()

router.use(function routeLog (req, res, next) {
  console.log(`${req.originalUrl} on ${new Date()}`)
  next()
})

router.post('/login', loginController.login.bind(loginController))
router.post('/email', emailController.sendEmailToOrganization.bind(emailController))
router.post('/signup', signupController.signupNewUser.bind(signupController))
router.get('/seed/opps', setupController.seedOpps.bind(setupController))
router.get('/seed/users', setupController.seedUsers.bind(setupController))
router.get('/opportunities', opportunitiesController.getAllOpps.bind(opportunitiesController))
router.get('/opportunity/:id', opportunitiesController.getOpp.bind(opportunitiesController))
router.get('/users', userController.getAllUsers.bind(userController))
router.get('/user/:id', userController.getUser.bind(userController))
router.get('/', indexController.getIndexPage.bind(indexController))
router.get('*', indexController.getIndexPage.bind(indexController))

module.exports = router
