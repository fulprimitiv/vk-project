import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

describe('ErrorMessage Component', () => {
	test('renders error message', () => {
		render(<ErrorMessage message="Что-то пошло не так" />);
		expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument();
	});

	test('renders retry button when onRetry is provided', () => {
		const mockRetry = jest.fn();
		render(<ErrorMessage message="Ошибка" onRetry={mockRetry} />);

		const retryButton = screen.getByText('Попробовать снова');
		expect(retryButton).toBeInTheDocument();
	});

	test('calls onRetry when retry button is clicked', () => {
		const mockRetry = jest.fn();
		render(<ErrorMessage message="Ошибка" onRetry={mockRetry} />);

		const retryButton = screen.getByText('Попробовать снова');
		fireEvent.click(retryButton);

		expect(mockRetry).toHaveBeenCalledTimes(1);
	});

	test('does not render retry button when onRetry is not provided', () => {
		render(<ErrorMessage message="Ошибка" />);
		expect(screen.queryByText('Попробовать снова')).not.toBeInTheDocument();
	});

	test('renders error icon', () => {
		render(<ErrorMessage message="Ошибка" />);
		expect(screen.getByText('⚠️')).toBeInTheDocument();
	});
});