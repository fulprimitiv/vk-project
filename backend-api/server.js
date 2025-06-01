const jsonServer = require('json-server');
const middleware = require('./middleware');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Используем стандартные middleware
server.use(middlewares);

// Используем наш кастомный middleware
server.use(middleware);

// Добавляем роуты
server.use('/api', router);
server.use(router);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
	console.log(`🚀 JSON Server запущен на порту ${PORT}`);
	console.log(`📊 API доступно по адресу: http://localhost:${PORT}`);
	console.log(`👥 Пользователи: http://localhost:${PORT}/users`);
});