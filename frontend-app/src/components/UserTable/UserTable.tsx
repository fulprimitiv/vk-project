import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useUsers } from '../../hooks/useUsers';
import { User } from '../../types/User';
import './UserTable.css';

const UserTable: React.FC = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useUsers();

	const { ref, inView } = useInView({
		threshold: 0,
		triggerOnce: false,
	});

	// Автоматическая подгрузка при скролле
	React.useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	// Объединяем все страницы в один массив
	const allUsers = React.useMemo(() => {
		return data?.pages.flatMap(page => page.data) || [];
	}, [data]);

	// Общее количество пользователей
	const totalUsers = data?.pages[0]?.total || 0;

	const formatSalary = (salary: number): string => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			minimumFractionDigits: 0,
		}).format(salary);
	};

	const formatDate = (dateString: string): string => {
		return new Date(dateString).toLocaleDateString('ru-RU');
	};

	if (isLoading) {
		return (
			<div className="user-table-container">
				<div className="loading-spinner">
					<div className="spinner"></div>
					<p>Загрузка пользователей...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="user-table-container">
				<div className="error-message">
					<h3>Ошибка загрузки</h3>
					<p>{error?.message || 'Не удалось загрузить список пользователей'}</p>
					<button
						onClick={() => window.location.reload()}
						className="retry-button"
					>
						Попробовать снова
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="user-table-container">
			<div className="table-header">
				<h2>Список пользователей ({totalUsers})</h2>
				<p className="table-description">
					Управление сотрудниками компании
				</p>
			</div>

			<div className="table-wrapper">
				<table className="user-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Имя</th>
							<th>Фамилия</th>
							<th>Email</th>
							<th>Телефон</th>
							<th>Возраст</th>
							<th>Город</th>
							<th>Должность</th>
							<th>Отдел</th>
							<th>Зарплата</th>
							<th>Опыт</th>
							<th>Дата начала</th>
							<th>Навыки</th>
						</tr>
					</thead>
					<tbody>
						{allUsers.map((user: User) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>
									<a href={`mailto:${user.email}`} className="email-link">
										{user.email}
									</a>
								</td>
								<td>
									<a href={`tel:${user.phone}`} className="phone-link">
										{user.phone}
									</a>
								</td>
								<td>{user.age}</td>
								<td>{user.city}</td>
								<td>{user.position}</td>
								<td>{user.department}</td>
								<td className="salary">{formatSalary(user.salary)}</td>
								<td>{user.experience} лет</td>
								<td>{formatDate(user.startDate)}</td>
								<td className="skills" title={user.skills}>
									{user.skills}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Элемент для отслеживания скролла */}
			{hasNextPage && (
				<div ref={ref} className="scroll-trigger">
					{isFetchingNextPage ? (
						<div className="loading-more">
							<div className="spinner small"></div>
							<span>Загрузка...</span>
						</div>
					) : (
						<div className="load-more-hint">
							Прокрутите вниз для загрузки еще
						</div>
					)}
				</div>
			)}

			{!hasNextPage && allUsers.length > 0 && (
				<div className="end-message">
					<p>Все пользователи загружены</p>
				</div>
			)}
		</div>
	);
};

export default UserTable;
