const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const productsRouter = require('./routers/products');
const cartsRouter = require('./routers/carts');
const viewsRouter = require('./routers/views.router');

const { Server } = require('socket.io');
const port = 8080;
const ProductManager = require('./managers/productManager');

const productManager = new ProductManager();

const app = express();
const httpServer = app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', viewsRouter);

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    socket.on('message', data => {
        console.log(data);
    });

    socket.on('addProduct', async data => {
        console.log(data);
        await productManager.add(data);
        const products = await productManager.getAll(null);
        socketServer.emit('updateProducts', products );
    });

    socket.on('removeProduct', async data => {
        console.log(data);
        await productManager.deleteById(+data);
        const products = await productManager.getAll(null);
        socketServer.emit('updateProducts', products );
    });
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

module.exports = { socketServer };
