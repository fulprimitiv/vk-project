import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Настраиваем сервер для тестов
export const server = setupServer(...handlers);