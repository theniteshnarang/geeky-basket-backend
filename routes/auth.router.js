const router = require('express').Router()
const {signUp, login} = require('../controllers/auth.controller')

router.route('/sign-up')
  .post(signUp)

router.route('/login')
  .post(login)

module.exports = router