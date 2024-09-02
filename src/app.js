// Cargar Módulos y Configuración Inicial
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

// Definir Variables y Servidor HTTP
const port = 8080;
const app = express();

// Configurar Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static(path.join(__dirname, 'files')));

// Configurar Motor de Plantillas y Vistas
/* app.engine('handlebars', handlebars.engine()); */
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Definir Rutas
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const viewsRouter = require('./routes/views.router');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Conectar a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB Atlas:", error);
  });

// Iniciar Servidor y Configurar Socket.io
const httpServer = app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);
socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");
});

module.exports = { socketServer };







/* const express = require('express');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('morgan');
const methodOverride = require('method-override');
const getDb = require('../util/database').getDb;

const handlebars = require('express-handlebars');
const path = require('path');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const viewsRouter = require('./routes/views.router');

const { Server } = require('socket.io');
const port = 8080;
const ProductManager = require('./managers/productManager');

const productManager = new ProductManager();

const app = express();
const httpServer = app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

const productRoutes = require("./routes/productRoutes");

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use('/', viewsRouter);
 */
/* app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  })
); */

/* app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.use('/products', productRoutes);

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");
});

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



module.exports = { socketServer };
 */