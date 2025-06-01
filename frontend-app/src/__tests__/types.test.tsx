import { User, CreateUserDto } from '../types/User';

describe('User Types', () => {
	test('User interface has all required fields', () => {
		const user: User = {
			id: 1,
			firstName: 'Иван',
			lastName: 'Петров',
			email: 'ivan@example.com',
			phone: '+7 999 123 45 67',
			age: 30,
			city: 'Москва',
			position: 'Разработчик',
			department: 'IT',
			salary: 100000,
			experience: 5,
			startDate: '2020-01-01',
			skills: 'React, TypeScript'
		};

		expect(user.id).toBe(1);
		expect(user.firstName).toBe('Иван');
		expect(user.email).toContain('@');
	});

	test('CreateUserDto excludes id field', () => {
		const createUser: CreateUserDto = {
			firstName: 'Мария',
			lastName: 'Сидорова',
			email: 'maria@example.com',
			phone: '+7 999 234 56 78',
			age: 25,
			city: 'СПб',
			position: 'Дизайнер',
			department: 'Дизайн',
			salary: 80000,
			experience: 3,
			startDate: '2021-01-01',
			skills: 'Figma, Photoshop'
		};

		// Проверяем, что id отсутствует в CreateUserDto
		expect('id' in createUser).toBe(false);
		expect(createUser.firstName).toBe('Мария');
	});
});