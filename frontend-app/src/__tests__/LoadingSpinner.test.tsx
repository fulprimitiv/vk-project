import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner Component', () => {
	test('renders with default message', () => {
		render(<LoadingSpinner />);
		expect(screen.getByText('Загрузка...')).toBeInTheDocument();
	});

	test('renders with custom message', () => {
		render(<LoadingSpinner message="Загружаем данные..." />);
		expect(screen.getByText('Загружаем данные...')).toBeInTheDocument();
	});

	test('renders with different sizes', () => {
		const { rerender } = render(<LoadingSpinner size="small" />);
		expect(document.querySelector('.loading-spinner.small')).toBeInTheDocument();

		rerender(<LoadingSpinner size="large" />);
		expect(document.querySelector('.loading-spinner.large')).toBeInTheDocument();
	});

	test('renders spinner element', () => {
		render(<LoadingSpinner />);
		expect(document.querySelector('.spinner')).toBeInTheDocument();
	});
});