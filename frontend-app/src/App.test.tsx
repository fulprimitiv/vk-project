import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Мокаем компоненты с API
jest.mock('./components/UserTable/UserTable', () => {
	return function MockUserTable() {
		return <div data-testid="user-table">Таблица пользователей</div>;
	};
});

jest.mock('./components/UserForm/UserForm', () => {
	return function MockUserForm({ onSuccess, onCancel }: any) {
		return (
			<div data-testid="user-form">
				<h3>Форма создания пользователя</h3>
				<button onClick={onSuccess}>Сохранить</button>
				<button onClick={onCancel}>Отмена</button>
			</div>
		);
	};
});

describe('App Component', () => {
	test('отображает заголовок приложения', () => {
		render(<App />);
		expect(screen.getByText('Управление пользователями')).toBeInTheDocument();
	});

	test('отображает описание системы', () => {
		render(<App />);
		expect(screen.getByText('Система управления сотрудниками компании')).toBeInTheDocument();
	});

	test('отображает кнопку добавления пользователя', () => {
		render(<App />);
		expect(screen.getByText('Добавить пользователя')).toBeInTheDocument();
	});

	test('отображает таблицу пользователей', () => {
		render(<App />);
		expect(screen.getByTestId('user-table')).toBeInTheDocument();
	});

	test('отображает футер', () => {
		render(<App />);
		expect(screen.getByText('© 2024 VK Project. Тестовое задание.')).toBeInTheDocument();
	});

	test('показывает и скрывает форму при клике на кнопку', () => {
		render(<App />);

		const toggleButton = screen.getByText('Добавить пользователя');

		// Форма изначально скрыта
		expect(screen.queryByTestId('user-form')).not.toBeInTheDocument();

		// Показываем форму
		fireEvent.click(toggleButton);
		expect(screen.getByTestId('user-form')).toBeInTheDocument();
		expect(screen.getByText('Скрыть форму')).toBeInTheDocument();

		// Скрываем форму
		fireEvent.click(screen.getByText('Скрыть форму'));
		expect(screen.queryByTestId('user-form')).not.toBeInTheDocument();
		expect(screen.getByText('Добавить пользователя')).toBeInTheDocument();
	});

	test('скрывает форму при успешном создании пользователя', () => {
		render(<App />);

		// Показываем форму
		fireEvent.click(screen.getByText('Добавить пользователя'));
		expect(screen.getByTestId('user-form')).toBeInTheDocument();

		// Симулируем успешное создание
		fireEvent.click(screen.getByText('Сохранить'));
		expect(screen.queryByTestId('user-form')).not.toBeInTheDocument();
	});

	test('скрывает форму при отмене', () => {
		render(<App />);

		// Показываем форму
		fireEvent.click(screen.getByText('Добавить пользователя'));
		expect(screen.getByTestId('user-form')).toBeInTheDocument();

		// Симулируем отмену
		fireEvent.click(screen.getByText('Отмена'));
		expect(screen.queryByTestId('user-form')).not.toBeInTheDocument();
	});
});