const express = require('express');
const productsRouter = require('./routers/products');
const cartsRouter = require('./routers/carts');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});
