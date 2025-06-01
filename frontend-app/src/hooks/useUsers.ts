import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, UsersResponse } from '../services/api';
import { CreateUserDto } from '../types/User';

const USERS_QUERY_KEY = 'users';
const USERS_PER_PAGE = 10;

export const useUsers = () => {
	return useInfiniteQuery<UsersResponse, Error>({
		queryKey: [USERS_QUERY_KEY],
		queryFn: ({ pageParam = 1 }) =>
			userApi.getUsers({ page: pageParam as number, limit: USERS_PER_PAGE }),
		getNextPageParam: (lastPage, pages) => {
			return lastPage.hasMore ? pages.length + 1 : undefined;
		},
		initialPageParam: 1,
	});
};

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userData: CreateUserDto) => userApi.createUser(userData),
		onSuccess: () => {
			// Инвалидируем кэш пользователей для обновления списка
			queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
		},
		onError: (error) => {
			console.error('Ошибка при создании пользователя:', error);
		},
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userId: number) => userApi.deleteUser(userId),
		onSuccess: () => {
			// Инвалидируем кэш пользователей для обновления списка
			queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
		},
		onError: (error) => {
			console.error('Ошибка при удалении пользователя:', error);
		},
	});
};