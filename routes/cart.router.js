const router = require('express').Router()

const {getCartlist, updateCartlist, deleteCartlist, getCartModel, updateCartModel, deleteCartModel, getCartItem, updateCartItem, deleteCartItem} = require('../controllers/cart.controller')

const { findCartModelByUserId, findCartItemByCartId} = require('../middleware/cart.middleware')

router.route('/')
  .get(getCartlist)
  .post(updateCartlist)
  .delete(deleteCartlist)

router.use(findCartModelByUserId)

router.route('/u')
  .get(getCartModel)
  .post(updateCartModel)
  .delete(deleteCartModel)

router.param('cartId', findCartItemByCartId)

router.route('/u/:cartId')
  .get(getCartItem)
  .post(updateCartItem)
  .delete(deleteCartItem)

module.exports = router