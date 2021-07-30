const router = require('express').Router()

const {getWislist, updateWishlist, deleteWishlist, getWishModel, updateWishModel, deleteWishModel, getWishItem, deleteWishItem} = require('../controllers/wishlist.controller');

const {findWishModelByUserId, findWishItemByWishId } = require('../middleware/wishlist.middleware')

router.route('/')
  .get(getWislist)
  .post(updateWishlist)
  .delete(deleteWishlist)

router.use(findWishModelByUserId)

router.route('/u')
  .get(getWishModel)
  .post(updateWishModel)
  .delete(deleteWishModel)

router.param('wishId', findWishItemByWishId)

router.route('/u/:wishId')
  .get(getWishItem)
  .delete(deleteWishItem)

module.exports = router