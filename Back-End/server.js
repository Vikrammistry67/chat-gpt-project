require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = require('./src/app');
const connectToDB = require('./src/database/db');
const { initialiseSocketServer } = require('./src/sockets/socket.server');
const httpServer = require('http').createServer(app);

connectToDB();
initialiseSocketServer(httpServer);


httpServer.listen(PORT, () => console.log(`server running at PORT : ${PORT}`));