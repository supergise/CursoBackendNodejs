const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const ProductManager = require('./managers/productManager');
const productManager = new ProductManager();

const port = 8080;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static(path.join(__dirname, 'files')));

const hbs = handlebars.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views", "partials"),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
  helpers: {
      eq: function (a, b) {
          return a == b;
      },
  },
});
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const viewsRouter = require('./routes/views.router');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB Atlas:", error);
  });

const httpServer = app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");
});

module.exports = { socketServer };