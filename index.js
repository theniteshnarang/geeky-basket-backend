const express = require('express');
const cors = require('cors')
const PORT = 3000
const app = express();
const {defaultErrorHandler, defaultRouteHandler} = require('./middleware/defaultHandler.middleware');
const { authVerify } = require('./middleware/auth.middleware');

app.use(express.json());
app.use(cors())

const { initializeDBConnection } = require('./db/db.connect.js')

initializeDBConnection();

const productV1 = require('./routes/product.router');
const cartV1 = require('./routes/cart.router');
const wishlistV1 = require('./routes/wishlist.router');
const categoryV1 = require('./routes/category.router');
const userV1 = require('./routes/user.router');
const authV1 = require('./routes/auth.router');

app.get('/', (req, res, next) => {
  res.send('Welcome to Geeky Basket!')
});

app.use('/product', productV1)
app.use('/cart',authVerify,cartV1)
app.use('/wish',authVerify,wishlistV1)
app.use('/category', categoryV1)
app.use('/user',authVerify,userV1)
app.use('/auth',authV1)


// Handle All unknown/page not found routes
app.use(defaultRouteHandler)

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log('Server started on port:', PORT);
});