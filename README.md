# QuizAI

Интерактивный UI для генерации тестов (демо). Тёмная тема, mock-генерация вопросов, регистрация и вход через `localStorage`.

## Запуск локально

```bash
npm start
```

Откройте [http://localhost:5173](http://localhost:5173)

Или откройте `index.html` напрямую в браузере.

## Деплой на Railway

### Быстрый способ (через сайт)

1. Откройте: [railway.com/new/github](https://railway.com/new/github?q=Kazusagava%2Fquizai-ui)
2. Войдите в Railway и выберите репозиторий **quizai-ui**
3. Railway сам соберёт проект (`npm start`)
4. В сервисе: **Settings → Networking → Generate Domain** — получите публичную ссылку

### Через CLI (после `railway login`)

```powershell
cd C:\Users\user\Projects\quizai-ui
railway init
railway up
railway domain
```

### Автодеплой из GitHub Actions

1. [Railway](https://railway.com) → Account Settings → **Tokens** → Create token
2. GitHub → репозиторий **quizai-ui** → Settings → Secrets → **Actions** → `RAILWAY_TOKEN`
3. При каждом push в `main` сайт будет обновляться автоматически

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

---
config:
  layout: elk
---
graph TD
    Start([Запуск приложения]) --> Auth[Экран авторизации]
    Auth --> CheckRole{Проверка роли}
    
    CheckRole -->|Роль: Преподаватель| TeacherDash[Dashboard Преподавателя]
    CheckRole -->|Роль: Студент| StudentDash[Dashboard Студента]
    
    %% Teacher Role Flow
    TeacherDash --> TeacherMenu{Выбор функции}
    TeacherMenu -->|Управление| ManageQuestions[Управление вопросами]
    TeacherMenu -->|Редактирование| EditQuestions[Редактирование вопросов]
    TeacherMenu -->|Аналитика| Analytics[Просмотр аналитики]
    TeacherMenu -->|Профиль| TeacherProfile[Профиль преподавателя]
    
    ManageQuestions --> ManageActions{Действие}
    ManageActions -->|Создать| CreateQuestion[Создание нового вопроса]
    ManageActions -->|Удалить| DeleteQuestion[Удаление вопроса]
    ManageActions -->|Назначить| AssignQuestion[Назначение тесту]
    CreateQuestion --> TeacherDash
    DeleteQuestion --> TeacherDash
    AssignQuestion --> TeacherDash
    
    EditQuestions --> EditMode[Редактор вопросов]
    EditMode --> SaveEdit{Сохранить?}
    SaveEdit -->|Да| TeacherDash
    SaveEdit -->|Нет| EditMode
    
    Analytics --> AnalyticsView[Просмотр результатов студентов]
    AnalyticsView --> ExportData{Экспортировать?}
    ExportData -->|Да| Export[Экспорт данных]
    ExportData -->|Нет| TeacherDash
    Export --> TeacherDash
    
    TeacherProfile --> LogoutTeacher[Выход]
    LogoutTeacher --> Auth
    
    %% Student Role Flow
    StudentDash --> StudentMenu{Выбор функции}
    StudentMenu -->|Пройти тест| TakeTest[Просмотр вопросов]
    StudentMenu -->|Профиль| StudentProfile[Профиль студента]
    
    TakeTest --> QuestionView[Просмотр вопроса]
    QuestionView --> AnswerForm[Форма отправки ответа]
    AnswerForm --> Submit{Отправить?}
    Submit -->|Да| SubmitAnswer[Отправка ответа]
    Submit -->|Нет| QuestionView
    SubmitAnswer --> CheckNext{Есть ещё вопросы?}
    CheckNext -->|Да| QuestionView
    CheckNext -->|Нет| TestComplete[Тест завершён]
    TestComplete --> StudentDash
    
    StudentProfile --> LogoutStudent[Выход]
    LogoutStudent --> Auth
    
    %% Styling
    classDef authStyle stroke:#818cf8,fill:#eef2ff
    classDef teacherStyle stroke:#a78bfa,fill:#f5f3ff
    classDef studentStyle stroke:#2dd4bf,fill:#f0fdfa
    classDef actionStyle stroke:#facc15,fill:#fefce8
    classDef decisionStyle stroke:#fb923c,fill:#fff7ed
    
    class Auth authStyle
    class TeacherDash,ManageQuestions,EditQuestions,Analytics,TeacherProfile teacherStyle
    class ManageActions,EditMode,AnalyticsView,CreateQuestion,DeleteQuestion,AssignQuestion,EditMode,Export teacherStyle
    class StudentDash,TakeTest,QuestionView,AnswerForm,StudentProfile studentStyle
    class SubmitAnswer,TestComplete studentStyle
    class CheckRole,TeacherMenu,StudentMenu,ManageActions,SaveEdit,ExportData,Submit,CheckNext decisionStyle
