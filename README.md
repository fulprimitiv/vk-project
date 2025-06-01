# VK Project - Система управления пользователями

Тестовое задание для VK - полнофункциональная система управления пользователями на React + TypeScript.

## 🎯 Выполненные требования

- ✅ **Таблица с 12 полями** - полная информация о пользователях
- ✅ **Infinite Scroll** - автоматическая подгрузка данных при прокрутке
- ✅ **React Query** - современное управление серверным состоянием
- ✅ **Форма с валидацией** - 12 полей с полной валидацией
- ✅ **API интеграция** - JSON Server с полным CRUD
- ✅ **Тестирование** - Unit + Integration тесты с MSW
- ✅ **TypeScript** - полная типизация проекта

## 🚀 Быстрый старт

```bash
npm run install  # Установка всех зависимостей
npm run dev         # Запуск в режиме разработки
npm test           # Запуск тестов
```

## 🏗️ Архитектура

### Технологический стек
- **Frontend**: React 18 + TypeScript
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Yup
- **API**: Axios + JSON Server
- **Testing**: Jest + Testing Library + MSW
- **UI**: Custom CSS + Responsive Design

### Структура проекта
```
vk-project/
├── backend-api/     # JSON Server API
├── frontend-app/    # React приложение
└── package.json     # Корневая конфигурация
```

## 📊 Демо

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **API Docs**: http://localhost:3001/users


## 🎨 Особенности

- 📱 **Адаптивный дизайн** для всех устройств
- ⚡ **Оптимизированная производительность** с кешированием
- 🔄 **Автоматическая синхронизация** данных
- 🛡️ **Полная типизация** TypeScript
- 🎯 **Современные паттерны** React

## Архитектурные решения

### 1. Выбор стейт-менеджера: React Query
**Почему не Redux/Zustand:**
- Серверное состояние ≠ клиентское состояние
- React Query специализируется на работе с API
- Встроенное кеширование, синхронизация, retry логика
- Меньше boilerplate кода

### 2. Infinite Scroll реализация
- `useInfiniteQuery` для пагинации
- `Intersection Observer API` для отслеживания скролла
- Оптимизированная производительность

### 3. Валидация форм
- React Hook Form для производительности
- Yup для декларативных схем валидации
- Реалтайм валидация с debounce

### 4. Тестирование
- MSW для мокирования API
- Testing Library для user-centric тестов
- Покрытие асинхронных операций

