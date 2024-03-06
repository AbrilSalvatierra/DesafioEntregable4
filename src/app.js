import express from 'express';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import productsRouter from './router/productsRouter.js';
import cartRouter from './router/cartRouter.js';

const app = express();
const httpServer = http.createServer(app);

app.set('views', `${__dirname}/views`)

//Motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts'); 

});

//Socket.io
export const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

httpServer.listen(PORT, () => {
    console.log("Servidor conectado!!");
});