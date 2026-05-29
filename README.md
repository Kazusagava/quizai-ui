# QuizAI

Интерактивный UI для генерации тестов (демо). Тёмная тема, mock-генерация вопросов, регистрация и вход через `localStorage`.

## Запуск локально

```bash
npm start
```

Откройте [http://localhost:5173](http://localhost:5173)

Или откройте `index.html` напрямую в браузере.

## Деплой на Railway

Репозиторий подключён к [Railway](https://railway.com). Команда запуска: `npm start` (порт задаётся через `PORT`).

## Возможности

- Настройка типа вопросов, сложности, количества и языка теста
- Mock-генерация MCQ по теме (например, фотосинтез)
- Режимы отображения: List, Cards, Preview
- Регистрация и вход (локально, без backend)
- Интерфейс: RU / KZ / EN

## Стек

HTML, CSS, vanilla JavaScript

## GitHub

Локальный репозиторий и первый commit уже созданы.

1. Войдите в GitHub (один раз):

```powershell
gh auth login
```

2. Создайте репозиторий и отправьте код:

```powershell
.\push-to-github.ps1
```

Или вручную:

```powershell
git branch -M main
gh repo create quizai-ui --public --source=. --remote=origin --push
```

Если имя `quizai-ui` занято, укажите другое: `gh repo create YOUR-NAME --public --source=. --remote=origin --push`
