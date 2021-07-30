const router = require("express").Router();

const {getUserModel, deleteUserModel, getUser, updateUser, deleteUser} = require('../controllers/user.controller');

const {findUserById} = require('../middleware/user.middleware')

router.route("/")
  .get(getUserModel)
  .delete(deleteUserModel)

router.use(findUserById)

router.route('/u')
  .get(getUser)
  .post(updateUser)
  .delete(deleteUser)

  module.exports = router