module.exports = (req, res, next) => {
	// Добавляем CORS заголовки
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Expose-Headers', 'X-Total-Count');

	// Обрабатываем preflight запросы
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
		return;
	}

	// Добавляем искусственную задержку для имитации реального API
	const delay = Math.random() * 500 + 200; // 200-700ms

	setTimeout(() => {
		next();
	}, delay);
};