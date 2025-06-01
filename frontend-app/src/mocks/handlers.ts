import { rest, RestRequest, ResponseComposition, RestContext } from 'msw';
import { User, CreateUserDto } from '../types/User';

const mockUsers: User[] = [
	{
		id: 1,
		firstName: "Тест",
		lastName: "Пользователь",
		email: "test@example.com",
		phone: "+7 (999) 123-45-67",
		age: 25,
		city: "Москва",
		position: "Разработчик",
		department: "IT",
		salary: 100000,
		experience: 3,
		startDate: "2021-01-15",
		skills: "React, TypeScript"
	},
	{
		id: 2,
		firstName: "Другой",
		lastName: "Тестер",
		email: "another@example.com",
		phone: "+7 (999) 234-56-78",
		age: 28,
		city: "СПб",
		position: "Дизайнер",
		department: "Дизайн",
		salary: 80000,
		experience: 5,
		startDate: "2019-03-20",
		skills: "Figma, Photoshop"
	}
];

let nextId = 3;

export const handlers = [
	// GET /users
	rest.get('http://localhost:3001/users', (
		req: RestRequest,
		res: ResponseComposition,
		ctx: RestContext
	) => {
		const page = parseInt(req.url.searchParams.get('_page') || '1');
		const limit = parseInt(req.url.searchParams.get('_limit') || '10');

		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;
		const paginatedUsers = mockUsers.slice(startIndex, endIndex);

		return res(
			ctx.status(200),
			ctx.set('X-Total-Count', mockUsers.length.toString()),
			ctx.json(paginatedUsers)
		);
	}),

	// POST /users
	rest.post('http://localhost:3001/users', async (
		req: RestRequest,
		res: ResponseComposition,
		ctx: RestContext
	) => {
		const userData = await req.json() as CreateUserDto;

		const newUser: User = {
			...userData,
			id: nextId++,
		};

		mockUsers.unshift(newUser);

		return res(
			ctx.status(201),
			ctx.json(newUser)
		);
	}),

	// GET /users/:id
	rest.get('http://localhost:3001/users/:id', (
		req: RestRequest,
		res: ResponseComposition,
		ctx: RestContext
	) => {
		const { id } = req.params;
		const user = mockUsers.find(u => u.id === parseInt(id as string));

		if (!user) {
			return res(ctx.status(404), ctx.json({ message: 'User not found' }));
		}

		return res(ctx.status(200), ctx.json(user));
	}),
];