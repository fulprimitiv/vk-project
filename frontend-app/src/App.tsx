import React, { useState, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserTable from './components/UserTable/UserTable';
import UserForm from './components/UserForm/UserForm';
import './App.css';

// Ленивая загрузка devtools
const ReactQueryDevtools = React.lazy(() =>
  process.env.NODE_ENV === 'development'
    ? import('@tanstack/react-query-devtools').then((module) => ({
      default: module.ReactQueryDevtools,
    }))
    : Promise.resolve({ default: () => null })
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 минут
    },
    mutations: {
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleFormSuccess = () => {
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app-header">
          <h1>Управление пользователями</h1>
          <p>Система управления сотрудниками компании</p>
        </header>

        <main className="app-main">
          <div className="app-controls">
            <button
              onClick={() => setShowForm(!showForm)}
              className={`toggle-form-button ${showForm ? 'active' : ''}`}
            >
              {showForm ? 'Скрыть форму' : 'Добавить пользователя'}
            </button>
          </div>

          {showForm && (
            <div className="form-section">
              <UserForm
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
          )}

          <div className="table-section">
            <UserTable />
          </div>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 VK Project. Тестовое задание.</p>
        </footer>
      </div>

      {/* React Query DevTools только в development режиме */}
      {process.env.NODE_ENV === 'development' && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  );
};

export default App;
