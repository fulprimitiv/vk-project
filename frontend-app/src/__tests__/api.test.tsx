import { userApi } from '../services/api';

// Мокаем axios полностью
jest.mock('axios', () => ({
	create: jest.fn(() => ({
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn(),
		interceptors: {
			request: { use: jest.fn() },
			response: { use: jest.fn() }
		}
	})),
}));

describe('User API', () => {
	test('userApi object exists and has required methods', () => {
		expect(userApi).toBeDefined();
		expect(typeof userApi.getUsers).toBe('function');
		expect(typeof userApi.createUser).toBe('function');
		expect(typeof userApi.getUserById).toBe('function');
		expect(typeof userApi.updateUser).toBe('function');
		expect(typeof userApi.deleteUser).toBe('function');
	});
});