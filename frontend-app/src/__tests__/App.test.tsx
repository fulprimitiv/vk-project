import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Мокаем компоненты, которые используют API
jest.mock('../components/UserTable/UserTable', () => {
	return function MockUserTable() {
		return <div data-testid="user-table">User Table Mock</div>;
	};
});

jest.mock('../components/UserForm/UserForm', () => {
	return function MockUserForm() {
		return <div data-testid="user-form">User Form Mock</div>;
	};
});

describe('App Component', () => {
	test('renders main heading', () => {
		render(<App />);
		const heading = screen.getByText(/управление пользователями/i);
		expect(heading).toBeInTheDocument();
	});

	test('renders add user button', () => {
		render(<App />);
		const button = screen.getByText(/добавить пользователя/i);
		expect(button).toBeInTheDocument();
	});

	test('renders footer', () => {
		render(<App />);
		const footer = screen.getByText(/© 2024 VK Project/i);
		expect(footer).toBeInTheDocument();
	});
});