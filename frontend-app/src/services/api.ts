import axios from 'axios';
import { User, CreateUserDto } from '../types/User';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Интерцептор для логирования запросов
api.interceptors.request.use(
	(config) => {
		console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
		return config;
	},
	(error) => {
		console.error('❌ API Request Error:', error);
		return Promise.reject(error);
	}
);

// Интерцептор для логирования ответов
api.interceptors.response.use(
	(response) => {
		console.log(`✅ API Response: ${response.status} ${response.config.url}`);
		return response;
	},
	(error) => {
		console.error('❌ API Response Error:', error.response?.status, error.message);
		return Promise.reject(error);
	}
);

export interface UsersResponse {
	data: User[];
	total: number;
	hasMore: boolean;
}

export interface GetUsersParams {
	page?: number;
	limit?: number;
}

export const userApi = {
	// Получение пользователей с пагинацией
	getUsers: async (params: GetUsersParams = {}): Promise<UsersResponse> => {
		const { page = 1, limit = 10 } = params;

		try {
			const response = await api.get('/users', {
				params: {
					_page: page,
					_limit: limit,
					_sort: 'id',
					_order: 'desc'
				}
			});

			const total = parseInt(response.headers['x-total-count'] || '0');
			const hasMore = page * limit < total;

			return {
				data: response.data,
				total,
				hasMore
			};
		} catch (error) {
			console.error('Ошибка при получении пользователей:', error);
			throw new Error('Не удалось загрузить список пользователей');
		}
	},

	// Создание нового пользователя
	createUser: async (userData: CreateUserDto): Promise<User> => {
		try {
			const response = await api.post('/users', userData);
			console.log('✅ Пользователь создан:', response.data);
			return response.data;
		} catch (error) {
			console.error('Ошибка при создании пользователя:', error);
			throw new Error('Не удалось создать пользователя');
		}
	},

	// Получение пользователя по ID
	getUserById: async (id: number): Promise<User> => {
		try {
			const response = await api.get(`/users/${id}`);
			return response.data;
		} catch (error) {
			console.error('Ошибка при получении пользователя:', error);
			throw new Error('Пользователь не найден');
		}
	},

	// Обновление пользователя
	updateUser: async (id: number, userData: Partial<CreateUserDto>): Promise<User> => {
		try {
			const response = await api.put(`/users/${id}`, userData);
			return response.data;
		} catch (error) {
			console.error('Ошибка при обновлении пользователя:', error);
			throw new Error('Не удалось обновить пользователя');
		}
	},

	// Удаление пользователя
	deleteUser: async (id: number): Promise<void> => {
		try {
			await api.delete(`/users/${id}`);
			console.log('✅ Пользователь удален:', id);
		} catch (error) {
			console.error('Ошибка при удалении пользователя:', error);
			throw new Error('Не удалось удалить пользователя');
		}
	}
};

export default api;
