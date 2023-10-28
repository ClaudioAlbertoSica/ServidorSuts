import cors from 'cors';
import express, { Router } from "express";
import RouterUsers from './router/Users.js';
import RouterGame from './router/Game.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); //preguntar bien

app.use(cors());
app.use('/api/users', new RouterUsers().start());
app.use('/api/game', new RouterGame().start());
app.use('/api/items', new RouterGame().start());


const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`));
server.on('error', error => console.log(`Error en servidor: ${error.message}`));
