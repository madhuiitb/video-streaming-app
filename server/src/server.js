import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
import { initSocket } from './config/socket.js';

dotenv.config();
connectDB();

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 9090;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));