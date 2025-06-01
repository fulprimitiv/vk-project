import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateUser } from '../../hooks/useUsers';
import { CreateUserDto } from '../../types/User';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './UserForm.css';

const schema = yup.object({
	firstName: yup
		.string()
		.required('Имя обязательно')
		.min(2, 'Минимум 2 символа')
		.max(50, 'Максимум 50 символов'),
	lastName: yup
		.string()
		.required('Фамилия обязательна')
		.min(2, 'Минимум 2 символа')
		.max(50, 'Максимум 50 символов'),
	email: yup
		.string()
		.required('Email обязателен')
		.email('Некорректный email'),
	phone: yup
		.string()
		.required('Телефон обязателен')
		.matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Формат: +7 (999) 123-45-67'),
	age: yup
		.number()
		.required('Возраст обязателен')
		.min(18, 'Минимум 18 лет')
		.max(100, 'Максимум 100 лет')
		.typeError('Возраст должен быть числом'),
	city: yup
		.string()
		.required('Город обязателен')
		.min(2, 'Минимум 2 символа'),
	position: yup
		.string()
		.required('Должность обязательна')
		.min(2, 'Минимум 2 символа'),
	department: yup
		.string()
		.required('Отдел обязателен')
		.min(2, 'Минимум 2 символа'),
	salary: yup
		.number()
		.required('Зарплата обязательна')
		.min(1, 'Зарплата должна быть больше 0')
		.typeError('Зарплата должна быть числом'),
	experience: yup
		.number()
		.required('Опыт обязателен')
		.min(0, 'Опыт не может быть отрицательным')
		.max(50, 'Максимум 50 лет опыта')
		.typeError('Опыт должен быть числом'),
	startDate: yup
		.string()
		.required('Дата начала работы обязательна'),
	skills: yup
		.string()
		.required('Навыки обязательны')
		.min(3, 'Минимум 3 символа'),
});

interface UserFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSuccess, onCancel }) => {
	const createUserMutation = useCreateUser();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
	} = useForm<CreateUserDto>({
		resolver: yupResolver(schema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			age: 25,
			city: '',
			position: '',
			department: '',
			salary: 50000,
			experience: 0,
			startDate: new Date().toISOString().split('T')[0],
			skills: '',
		},
	});

	const onSubmit = async (data: CreateUserDto) => {
		try {
			await createUserMutation.mutateAsync(data);
			reset();
			onSuccess?.();
		} catch (error) {
			console.error('Ошибка создания пользователя:', error);
		}
	};

	const handleCancel = () => {
		reset();
		onCancel?.();
	};

	const isLoading = isSubmitting || createUserMutation.isPending;

	return (
		<div className="user-form-container">
			<form onSubmit={handleSubmit(onSubmit)} className="user-form">
				<div className="form-header">
					<h2>Создать нового пользователя</h2>
					<p className="form-description">
						Заполните все обязательные поля для создания нового пользователя
					</p>
				</div>

				<div className="form-content">
					<div className="form-section">
						<h3>Личная информация</h3>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="firstName">Имя *</label>
								<input
									id="firstName"
									{...register('firstName')}
									className={errors.firstName ? 'error' : ''}
									disabled={isLoading}
									placeholder="Введите имя"
								/>
								{errors.firstName && (
									<span className="error-message">{errors.firstName.message}</span>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="lastName">Фамилия *</label>
								<input
									id="lastName"
									{...register('lastName')}
									className={errors.lastName ? 'error' : ''}
									disabled={isLoading}
									placeholder="Введите фамилию"
								/>
								{errors.lastName && (
									<span className="error-message">{errors.lastName.message}</span>
								)}
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email *</label>
							<input
								id="email"
								type="email"
								{...register('email')}
								className={errors.email ? 'error' : ''}
								disabled={isLoading}
								placeholder="example@email.com"
							/>
							{errors.email && (
								<span className="error-message">{errors.email.message}</span>
							)}
						</div>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="phone">Телефон *</label>
								<input
									id="phone"
									{...register('phone')}
									className={errors.phone ? 'error' : ''}
									disabled={isLoading}
									placeholder="+7 (999) 123-45-67"
								/>
								{errors.phone && (
									<span className="error-message">{errors.phone.message}</span>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="age">Возраст *</label>
								<input
									id="age"
									type="number"
									{...register('age')}
									className={errors.age ? 'error' : ''}
									disabled={isLoading}
									min="18"
									max="100"
								/>
								{errors.age && (
									<span className="error-message">{errors.age.message}</span>
								)}
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="city">Город *</label>
							<input
								id="city"
								{...register('city')}
								className={errors.city ? 'error' : ''}
								disabled={isLoading}
								placeholder="Введите город"
							/>
							{errors.city && (
								<span className="error-message">{errors.city.message}</span>
							)}
						</div>
					</div>

					<div className="form-section">
						<h3>Рабочая информация</h3>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="position">Должность *</label>
								<input
									id="position"
									{...register('position')}
									className={errors.position ? 'error' : ''}
									disabled={isLoading}
									placeholder="Введите должность"
								/>
								{errors.position && (
									<span className="error-message">{errors.position.message}</span>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="department">Отдел *</label>
								<input
									id="department"
									{...register('department')}
									className={errors.department ? 'error' : ''}
									disabled={isLoading}
									placeholder="Введите отдел"
								/>
								{errors.department && (
									<span className="error-message">{errors.department.message}</span>
								)}
							</div>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label htmlFor="salary">Зарплата (₽) *</label>
								<input
									id="salary"
									type="number"
									{...register('salary')}
									className={errors.salary ? 'error' : ''}
									disabled={isLoading}
									min="1"
									step="1000"
								/>
								{errors.salary && (
									<span className="error-message">{errors.salary.message}</span>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="experience">Опыт работы (лет) *</label>
								<input
									id="experience"
									type="number"
									{...register('experience')}
									className={errors.experience ? 'error' : ''}
									disabled={isLoading}
									min="0"
									max="50"
								/>
								{errors.experience && (
									<span className="error-message">{errors.experience.message}</span>
								)}
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="startDate">Дата начала работы *</label>
							<input
								id="startDate"
								type="date"
								{...register('startDate')}
								className={errors.startDate ? 'error' : ''}
								disabled={isLoading}
							/>
							{errors.startDate && (
								<span className="error-message">{errors.startDate.message}</span>
							)}
						</div>

						<div className="form-group">
							<label htmlFor="skills">Навыки *</label>
							<textarea
								id="skills"
								{...register('skills')}
								className={errors.skills ? 'error' : ''}
								disabled={isLoading}
								placeholder="Опишите ключевые навыки через запятую"
								rows={3}
							/>
							{errors.skills && (
								<span className="error-message">{errors.skills.message}</span>
							)}
						</div>
					</div>
				</div>

				<div className="form-actions">
					<button
						type="button"
						onClick={handleCancel}
						disabled={isLoading}
						className="cancel-button"
					>
						Отмена
					</button>

					<button
						type="submit"
						disabled={isLoading}
						className="submit-button"
					>
						{isLoading ? (
							<>
								<LoadingSpinner size="small" />
								Создание...
							</>
						) : (
							'Создать пользователя'
						)}
					</button>
				</div>

				{createUserMutation.error && (
					<div className="error-message global-error">
						Ошибка при создании пользователя. Попробуйте еще раз.
					</div>
				)}
			</form>
		</div>
	);
};

export default UserForm;