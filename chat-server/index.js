'use strict';

import express, { json, urlencoded } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const port = 3000;
const origin = 'http://localhost:8080';
const corsOptions = {
	origin,
	optionsSuccessStatus: 204,
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: { origin },
});

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

io.use((socket, next) => {
	const username = socket.handshake.auth.username;

	if (!username) {
		return next(new Error('USER_UNAVAILABLE'));
	}

	socket.username = username;

	next();
});

io.on('connection', (socket) => {
	const usersData = [];

	for (let [id, socket] of io.of('/').sockets) {
		usersData.push({
			userId: id,
			username: socket.username,
		});
	}

	socket.emit('USERS', usersData);
	socket.emit('CONNECTED', {
		userId: socket.id,
		username: socket.username,
	});
	socket.broadcast.emit('USER_CONNECTED', {
		userId: socket.id,
		username: socket.username,
	});

	socket.on('PRIVATE_MESSAGE', ({ content, to }) => {
		socket.to(to).emit('PRIVATE_MESSAGE', {
			content,
			from: socket.id,
		});
	});
});

server.listen(port, () => {
	console.log(`Listening on port:${port}`);
});
