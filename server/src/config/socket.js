import { Server } from 'socket.io';

let io;
export const initSocket = (server) => {
    io = new Server(server, { cors: { origin: '*' } });
    io.on('connection', () => console.log('Socket connected'));
    return io;
};

export { io };