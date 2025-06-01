import '@testing-library/jest-dom';

// Простой мок для IntersectionObserver
(global as any).IntersectionObserver = class IntersectionObserver {
	constructor() { }
	observe() { }
	unobserve() { }
	disconnect() { }
	takeRecords() { return []; }
	root = null;
	rootMargin = '';
	thresholds = [];
};

// Мокаем window.matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Подавляем все console предупреждения в тестах
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

beforeAll(() => {
	console.error = jest.fn((message) => {
		// Показываем только критические ошибки
		if (typeof message === 'string' && message.includes('Error:') && !message.includes('Warning:')) {
			originalError(message);
		}
	});

	console.warn = jest.fn();

	console.log = jest.fn((message) => {
		// Подавляем API логи в тестах
		if (typeof message === 'string' && message.includes('API Request:')) {
			return;
		}
		originalLog(message);
	});
});

afterAll(() => {
	console.error = originalError;
	console.warn = originalWarn;
	console.log = originalLog;
});

// Мокаем fetch для тестов
global.fetch = jest.fn();

// Мокаем localStorage
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};
global.localStorage = localStorageMock as any;
