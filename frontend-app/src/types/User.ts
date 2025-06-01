export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	age: number;
	city: string;
	position: string;
	department: string;
	salary: number;
	experience: number;
	startDate: string;
	skills: string;
}

export type CreateUserDto = Omit<User, 'id'>;

export interface UsersResponse {
	data: User[];
	total: number;
	hasMore: boolean;
}

export interface PaginationParams {
	page: number;
	limit: number;
}