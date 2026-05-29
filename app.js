(function () {
  "use strict";

  const MAX_CHARS = 5000;
  const GENERATE_DELAY_MS = 1400;

  const DEFAULT_SOURCE = {
    ru: "Фотосинтез — это процесс, при котором растения используют солнечный свет, воду и углекислый газ для производства глюкозы и кислорода. Процесс происходит в хлоропластах и включает световую и темновую фазы. Световая фаза происходит в тилакоидах, а темновая — в строме хлоропласта.",
    kz: "Фотосинтез — бұл өсімдіктердің күн сәулесін, суды және көмірқышқыл газын пайдаланып глюкоза мен оттегін өндіру процесі. Процесс хлоропласттарда жүреді және жарық пен қараңғы фазаларды қамтиды.",
    en: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. It occurs in chloroplasts and includes light-dependent and light-independent reactions.",
  };

  const i18n = {
    ru: {
      "nav.dashboard": "Dashboard",
      "nav.generation": "Generation",
      "nav.history": "History",
      "nav.favorites": "Favorites",
      "config.toggle": "⚙ Настройки теста",
      "config.label": "AI Generation",
      "config.title": "Создать тест",
      "config.questionType": "Тип вопроса",
      "config.difficulty": "Сложность",
      "config.count": "Количество вопросов",
      "config.testLang": "Язык теста",
      "type.mcq": "MCQ",
      "type.mcqDesc": "Множественный выбор",
      "type.open": "Открытый",
      "type.openDesc": "Свободный ответ",
      "type.quiz": "Quiz",
      "type.quizDesc": "Смешанный формат",
      "type.tf": "True/False",
      "type.tfDesc": "Да / Нет",
      "diff.easy": "Лёгкий",
      "diff.medium": "Средний",
      "diff.hard": "Сложный",
      "lang.ru": "Русский",
      "lang.kz": "Казахский",
      "lang.en": "Английский",
      "ai.label": "AI Assistant",
      "ai.placeholder": "Вставьте текст лекции, статьи или конспекта…",
      "ai.importPdf": "Import PDF",
      "ai.upload": "Upload document",
      "ai.url": "Insert URL",
      "ai.generate": "Generate questions",
      "stats.time": "Time",
      "stats.tokens": "Tokens",
      "stats.accuracy": "Accuracy",
      "stats.model": "Model",
      "view.list": "List",
      "view.cards": "Cards",
      "view.preview": "Preview",
      "action.filter": "Filter",
      "action.shuffle": "Shuffle",
      "action.qr": "QR-test",
      "action.pdf": "PDF",
      "action.save": "Save",
      "action.refresh": "Refresh",
      "empty.message": "Введите текст и нажмите Generate questions",
      "preview.prev": "← Назад",
      "preview.next": "Вперёд →",
      "recent.title": "Недавние тесты",
      "recent.bio": "Биология 9 класс",
      "recent.history": "История Казахстана",
      "recent.math": "Основы алгебры",
      "usage.title": "Использование",
      "usage.label": "генераций в этом месяце",
      "usage.upgrade": "Upgrade plan",
      "quick.title": "Быстрые действия",
      "quick.new": "Новый тест",
      "quick.favorites": "Избранное",
      "quick.share": "Поделиться",
      "quick.settings": "Настройки",
      "toast.demo": "Демо-режим: функция недоступна",
      "toast.saved": "Тест сохранён локально",
      "toast.refreshed": "Список обновлён",
      "toast.shuffled": "Вопросы перемешаны",
      "toast.filter": "Фильтр: показаны все вопросы",
      "toast.generated": "Сгенерировано вопросов: ",
      "toast.cleared": "Новый тест — поле очищено",
      "edit.prompt": "Редактировать вопрос:",
      "auth.login": "Войти",
      "auth.register": "Регистрация",
    },
    kz: {
      "nav.dashboard": "Басты бет",
      "nav.generation": "Генерация",
      "nav.history": "Тарих",
      "nav.favorites": "Таңдаулылар",
      "config.toggle": "⚙ Тест баптаулары",
      "config.label": "AI Generation",
      "config.title": "Тест жасау",
      "config.questionType": "Сұрақ түрі",
      "config.difficulty": "Қиындығы",
      "config.count": "Сұрақ саны",
      "config.testLang": "Тест тілі",
      "type.mcq": "MCQ",
      "type.mcqDesc": "Көп таңдау",
      "type.open": "Ашық",
      "type.openDesc": "Еркін жауап",
      "type.quiz": "Quiz",
      "type.quizDesc": "Аралас формат",
      "type.tf": "True/False",
      "type.tfDesc": "Иә / Жоқ",
      "diff.easy": "Оңай",
      "diff.medium": "Орташа",
      "diff.hard": "Қиын",
      "lang.ru": "Орысша",
      "lang.kz": "Қазақша",
      "lang.en": "Ағылшынша",
      "ai.label": "AI Assistant",
      "ai.placeholder": "Дәріс мәтінін, мақаланы немесе конспектті қойыңыз…",
      "ai.importPdf": "PDF импорт",
      "ai.upload": "Құжат жүктеу",
      "ai.url": "URL енгізу",
      "ai.generate": "Сұрақтарды генерациялау",
      "stats.time": "Уақыт",
      "stats.tokens": "Токендер",
      "stats.accuracy": "Дәлдік",
      "stats.model": "Модель",
      "view.list": "Тізім",
      "view.cards": "Карталар",
      "view.preview": "Алдын ала",
      "action.filter": "Сүзгі",
      "action.shuffle": "Араластыру",
      "action.qr": "QR-тест",
      "action.pdf": "PDF",
      "action.save": "Сақтау",
      "action.refresh": "Жаңарту",
      "empty.message": "Мәтін енгізіп, Generate батырмасын басыңыз",
      "preview.prev": "← Алдыңғы",
      "preview.next": "Келесі →",
      "recent.title": "Соңғы тесттер",
      "recent.bio": "Биология 9 сынып",
      "recent.history": "Қазақстан тарихы",
      "recent.math": "Алгебра негіздері",
      "usage.title": "Пайдалану",
      "usage.label": "айдағы генерациялар",
      "usage.upgrade": "Жоспарды жаңарту",
      "quick.title": "Жылдам әрекеттер",
      "quick.new": "Жаңа тест",
      "quick.favorites": "Таңдаулылар",
      "quick.share": "Бөлісу",
      "quick.settings": "Баптаулар",
      "toast.demo": "Демо: функция қолжетімсіз",
      "toast.saved": "Тест жергілікті сақталды",
      "toast.refreshed": "Тізім жаңартылды",
      "toast.shuffled": "Сұрақтар араластырылды",
      "toast.filter": "Сүзгі: барлық сұрақтар көрсетілді",
      "toast.generated": "Генерацияланған сұрақтар: ",
      "toast.cleared": "Жаңа тест — өріс тазартылды",
      "edit.prompt": "Сұрақты өңдеу:",
      "auth.login": "Кіру",
      "auth.register": "Тіркелу",
    },
    en: {
      "nav.dashboard": "Dashboard",
      "nav.generation": "Generation",
      "nav.history": "History",
      "nav.favorites": "Favorites",
      "config.toggle": "⚙ Test settings",
      "config.label": "AI Generation",
      "config.title": "Create test",
      "config.questionType": "Question type",
      "config.difficulty": "Difficulty",
      "config.count": "Number of questions",
      "config.testLang": "Test language",
      "type.mcq": "MCQ",
      "type.mcqDesc": "Multiple choice",
      "type.open": "Open-ended",
      "type.openDesc": "Free text answer",
      "type.quiz": "Quiz",
      "type.quizDesc": "Mixed format",
      "type.tf": "True/False",
      "type.tfDesc": "Binary choice",
      "diff.easy": "Easy",
      "diff.medium": "Medium",
      "diff.hard": "Hard",
      "lang.ru": "Russian",
      "lang.kz": "Kazakh",
      "lang.en": "English",
      "ai.label": "AI Assistant",
      "ai.placeholder": "Paste lecture text, article, or notes…",
      "ai.importPdf": "Import PDF",
      "ai.upload": "Upload document",
      "ai.url": "Insert URL",
      "ai.generate": "Generate questions",
      "stats.time": "Time",
      "stats.tokens": "Tokens",
      "stats.accuracy": "Accuracy",
      "stats.model": "Model",
      "view.list": "List",
      "view.cards": "Cards",
      "view.preview": "Preview",
      "action.filter": "Filter",
      "action.shuffle": "Shuffle",
      "action.qr": "QR-test",
      "action.pdf": "PDF",
      "action.save": "Save",
      "action.refresh": "Refresh",
      "empty.message": "Enter source text and click Generate questions",
      "preview.prev": "← Previous",
      "preview.next": "Next →",
      "recent.title": "Recent tests",
      "recent.bio": "Biology 9th grade",
      "recent.history": "History of Kazakhstan",
      "recent.math": "Algebra basics",
      "usage.title": "Monthly usage",
      "usage.label": "generations this month",
      "usage.upgrade": "Upgrade plan",
      "quick.title": "Quick actions",
      "quick.new": "New test",
      "quick.favorites": "Favorites",
      "quick.share": "Share",
      "quick.settings": "Settings",
      "toast.demo": "Demo mode: feature not available",
      "toast.saved": "Test saved locally",
      "toast.refreshed": "List refreshed",
      "toast.shuffled": "Questions shuffled",
      "toast.filter": "Filter: showing all questions",
      "toast.generated": "Generated questions: ",
      "toast.cleared": "New test — field cleared",
      "edit.prompt": "Edit question:",
      "auth.login": "Log in",
      "auth.register": "Sign up",
    },
  };

  const mockQuestions = {
    ru: {
      easy: [
        {
          q: "Где происходит фотосинтез у растений?",
          options: ["В митохондриях", "В хлоропластах", "В ядре", "В вакуоли"],
          correct: 1,
        },
        {
          q: "Какой газ поглощается растениями при фотосинтезе?",
          options: ["Кислород", "Азот", "Углекислый газ", "Водород"],
          correct: 2,
        },
        {
          q: "Что выделяется как побочный продукт фотосинтеза?",
          options: ["CO₂", "O₂", "N₂", "CH₄"],
          correct: 1,
        },
        {
          q: "Какой органеллой называют «зелёная фабрика» клетки?",
          options: ["Рибосома", "Хлоропласт", "Лизосома", "Аппарат Гольджи"],
          correct: 1,
        },
        {
          q: "Какой пигмент поглощает свет в хлоропластах?",
          options: ["Каротин", "Хлорофилл", "Антоциан", "Меланин"],
          correct: 1,
        },
        {
          q: "Из чего в основном состоит глюкоза, образующаяся при фотосинтезе?",
          options: ["Белки", "Углеводы", "Жиры", "Нуклеиновые кислоты"],
          correct: 1,
        },
        {
          q: "Какой источник энергии нужен для световой фазы?",
          options: ["Тепло", "Свет", "Звук", "Механика"],
          correct: 1,
        },
        {
          q: "Вода для фотосинтеза поступает через:",
          options: ["Корни", "Листья", "Цветки", "Плоды"],
          correct: 0,
        },
        {
          q: "Фотосинтез происходит преимущественно в:",
          options: ["Корнях", "Стебле", "Листьях", "Семенах"],
          correct: 2,
        },
        {
          q: "Какой продукт питания образуется при фотосинтезе?",
          options: ["Глюкоза", "Этанол", "Мочевина", "Глицерин"],
          correct: 0,
        },
      ],
      medium: [
        {
          q: "Какие две основные фазы включает фотосинтез?",
          options: [
            "Световая и темновая",
            "Дыхательная и секреторная",
            "Митотическая и мейотическая",
            "Анаболическая и катаболическая",
          ],
          correct: 0,
        },
        {
          q: "Где происходит световая фаза фотосинтеза?",
          options: ["В строме", "В тилакоидах", "В ядре", "В цитоплазме"],
          correct: 1,
        },
        {
          q: "Где происходит цикл Кальвина (темновая фаза)?",
          options: ["В тилакоидах", "В строме хлоропласта", "В митохондриях", "В клеточной стенке"],
          correct: 1,
        },
        {
          q: "Какие вещества образуются в световой фазе для темновой?",
          options: ["ATP и NADPH", "Только CO₂", "Только O₂", "ДНК и РНК"],
          correct: 0,
        },
        {
          q: "Какой газ является субстратом в цикле Кальвина?",
          options: ["O₂", "CO₂", "N₂", "H₂"],
          correct: 1,
        },
        {
          q: "Что происходит с энергией света в хлоропластах?",
          options: [
            "Преобразуется в химическую",
            "Полностью теряется",
            "Становится звуком",
            "Не используется",
          ],
          correct: 0,
        },
        {
          q: "Какой процесс связан с расщеплением воды в световой фазе?",
          options: ["Фотолиз", "Ферментация", "Гликолиз", "Дыхание"],
          correct: 0,
        },
        {
          q: "Почему листья зелёные?",
          options: [
            "Хлорофилл отражает зелёный свет",
            "Нет пигментов",
            "Из-за воды",
            "Из-за крахмала",
          ],
          correct: 0,
        },
        {
          q: "Что уменьшается в атмосфере благодаря фотосинтезу?",
          options: ["CO₂", "O₂", "N₂", "Ar"],
          correct: 0,
        },
        {
          q: "Какой организм является автотрофом за счёт фотосинтеза?",
          options: ["Гриб", "Зелёное растение", "Бактерия-паразит", "Вирус"],
          correct: 1,
        },
      ],
      hard: [
        {
          q: "Какой фотосистема первая возбуждается светом в Z-схеме?",
          options: ["Фотосистема II", "Фотосистема I", "Обе одновременно", "Ни одна"],
          correct: 0,
        },
        {
          q: "Что переносит электроны от фотосистемы II к фотосистеме I?",
          options: [
            "Цепь переноса электронов",
            "Рибосомы",
            "Микротрубочки",
            "Лизосомальный комплекс",
          ],
          correct: 0,
        },
        {
          q: "Какой кофермент восстанавливается в световой фазе?",
          options: ["NADPH", "FADH₂ только", "АТФ синтезатор", "Глюкоза"],
          correct: 0,
        },
        {
          q: "Сколько молекул CO₂ фиксируется за один оборот цикла Кальвина (классически)?",
          options: ["1", "3", "6", "12"],
          correct: 1,
        },
        {
          q: "Какой фермент катализирует фиксацию CO₂ в цикле Кальвина?",
          options: ["Рубиско", "Амилаза", "Каталаза", "Липаза"],
          correct: 0,
        },
        {
          q: "Что ограничивает фотосинтез при недостатке света?",
          options: [
            "Световая фаза",
            "Только дыхание",
            "Только деление",
            "Только экскреция",
          ],
          correct: 0,
        },
        {
          q: "C₄-растения эволюционно адаптированы к:",
          options: [
            "Жаркому климату и водному дефициту",
            "Только холоду",
            "Только темноте",
            "Отсутствию CO₂",
          ],
          correct: 0,
        },
        {
          q: "Какой продукт цикла Кальвина используется для синтеза сахаров?",
          options: ["Глицеральдегид-3-фосфат", "Пируват", "Лактат", "Ацетил-КоА"],
          correct: 0,
        },
        {
          q: "Фотореспирация связана с активностью:",
          options: ["Рубиско при высоком O₂", "Хлорофилла в темноте", "ДНК-полимеразы", "РНК"],
          correct: 0,
        },
        {
          q: "Квантовый выход фотосинтеза описывает:",
          options: [
            "Эффективность преобразования фотонов",
            "Скорость роста корней",
            "Количество митозов",
            "Объём вакуоли",
          ],
          correct: 0,
        },
      ],
    },
    kz: {
      easy: [
        {
          q: "Фотосинтез өсімдіктерде қайда жүреді?",
          options: ["Митохондрияда", "Хлоропластта", "Ядрода", "Вакуольде"],
          correct: 1,
        },
        {
          q: "Фотосинтез кезінде өсімдіктер қай газды сіңіреді?",
          options: ["Оттек", "Азот", "Көмірқышқыл газ", "Сутек"],
          correct: 2,
        },
        {
          q: "Фотосинтездің қосалқы өнімі ретінде не бөлінеді?",
          options: ["CO₂", "O₂", "N₂", "CH₄"],
          correct: 1,
        },
        {
          q: "Жасыл пигмент қалай аталады?",
          options: ["Каротин", "Хлорофилл", "Антоциан", "Меланин"],
          correct: 1,
        },
        {
          q: "Фотосинтезде қандай қуат көзі қажет?",
          options: ["Жылу", "Жарық", "Дыбыс", "Механика"],
          correct: 1,
        },
        {
          q: "Глюкоза қандай заттар тобына жатады?",
          options: ["Ақуыздар", "Көмірсулар", "Майлар", "Нуклеин қышқылдары"],
          correct: 1,
        },
        {
          q: "Су фотосинтезге негізінен қайдан келеді?",
          options: ["Тамырдан", "Гүлден", "Жемістен", "Қабықтан"],
          correct: 0,
        },
        {
          q: "Фотосинтез көбінесе қай органда жүреді?",
          options: ["Тамыр", "Сабақ", "Жапырақ", "Тұқым"],
          correct: 2,
        },
        {
          q: "Хлоропласт не деп аталады?",
          options: ["Қызыл фабрика", "Жасыл фабрика", "Көк фабрика", "Сары фабрика"],
          correct: 1,
        },
        {
          q: "Фотосинтездің негізгі органикалық өнімі:",
          options: ["Глюкоза", "Этанол", "Мочевина", "Глицерин"],
          correct: 0,
        },
      ],
      medium: [
        {
          q: "Фотосинтездің екі негізгі фазасы:",
          options: ["Жарық және қараңғы", "Тыныс және секреция", "Митоз және мейоз", "Анаболизм және катаболизм"],
          correct: 0,
        },
        {
          q: "Жарық фазасы қайда өтеді?",
          options: ["Стромада", "Тилакоидта", "Ядрода", "Цитоплазмада"],
          correct: 1,
        },
        {
          q: "Кальвин циклі қайда жүреді?",
          options: ["Тилакоидта", "Хлоропласт стромасында", "Митохондрияда", "Қабықта"],
          correct: 1,
        },
        {
          q: "Жарық фазасында қандай молекулалар түзіледі?",
          options: ["ATP және NADPH", "Тек CO₂", "Тек O₂", "ДНҚ және РНҚ"],
          correct: 0,
        },
        {
          q: "Кальвин циклінің субстраты:",
          options: ["O₂", "CO₂", "N₂", "H₂"],
          correct: 1,
        },
        {
          q: "Жарық энергиясы хлоропластта неге айналады?",
          options: ["Химиялық энергияға", "Дыбыска", "Жылуға ғана", "Еш нәрсеге"],
          correct: 0,
        },
        {
          q: "Судың фотолизі қай фазада болады?",
          options: ["Жарық", "Қараңғы", "Тыныс", "Бөліну"],
          correct: 0,
        },
        {
          q: "Жапырақ неге жасыл?",
          options: ["Хлорофилл жасыл түсті шағылыстырады", "Пигмент жоқ", "Судан", "Крахмалдан"],
          correct: 0,
        },
        {
          q: "Фотосинтез атмосферадағы қай газды азайтады?",
          options: ["CO₂", "O₂", "N₂", "Ar"],
          correct: 0,
        },
        {
          q: "Автотроф өсімдік:",
          options: ["Зобақ", "Жасыл өсімдік", "Паразит бактерия", "Вирус"],
          correct: 1,
        },
      ],
      hard: [
        {
          q: "Z-схемасында алғашқы қозғалатын фотожүйе:",
          options: ["Фотожүйе II", "Фотожүйе I", "Екеуі бірдей", "Ешқайсысы"],
          correct: 0,
        },
        {
          q: "Электрондарды фотожүйе II-ден I-ге тасымалдайды:",
          options: ["Электрон тасымалдау тізбегі", "Рибосома", "Микротрубочка", "Лизосома"],
          correct: 0,
        },
        {
          q: "Жарық фазасында қалпына келетін кофермент:",
          options: ["NADPH", "Тек FADH₂", "Глюкоза", "РНҚ"],
          correct: 0,
        },
        {
          q: "Кальвин циклінің бір айналымында неше CO₂ фиксалады (классикалық)?",
          options: ["1", "3", "6", "12"],
          correct: 1,
        },
        {
          q: "CO₂ фиксациясын катализдейтін фермент:",
          options: ["Рубиско", "Амилаза", "Каталаза", "Липаза"],
          correct: 0,
        },
        {
          q: "Жарық жетіспегенде фотосинтезді не шектейді?",
          options: ["Жарық фазасы", "Тек тыныс", "Тек митоз", "Тек экскреция"],
          correct: 0,
        },
        {
          q: "C₄-өсімдіктер неге бейімделген?",
          options: ["Ыстық және су тапшылығы", "Тек суық", "Тек қараңғы", "CO₂ жоқ"],
          correct: 0,
        },
        {
          q: "Кальвин циклінің өнімі:",
          options: ["Глицеральдегид-3-фосфат", "Пируват", "Лактат", "Ацетил-КоА"],
          correct: 0,
        },
        {
          q: "Фотореспирация жоғары O₂ кезінде:",
          options: ["Рубиско белсенділігі", "Хлорофилл", "ДНҚ-полимераза", "РНҚ"],
          correct: 0,
        },
        {
          q: "Кванттық өнім сипаттайды:",
          options: ["Фотондарды тиімді түрлендіру", "Тамыр өсуі", "Митоз саны", "Вакуоль көлемі"],
          correct: 0,
        },
      ],
    },
    en: {
      easy: [
        {
          q: "Where does photosynthesis occur in plants?",
          options: ["Mitochondria", "Chloroplasts", "Nucleus", "Vacuole"],
          correct: 1,
        },
        {
          q: "Which gas do plants absorb during photosynthesis?",
          options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
          correct: 2,
        },
        {
          q: "What is released as a byproduct of photosynthesis?",
          options: ["CO₂", "O₂", "N₂", "CH₄"],
          correct: 1,
        },
        {
          q: "Which organelle is called the cell's green factory?",
          options: ["Ribosome", "Chloroplast", "Lysosome", "Golgi apparatus"],
          correct: 1,
        },
        {
          q: "Which pigment absorbs light in chloroplasts?",
          options: ["Carotene", "Chlorophyll", "Anthocyanin", "Melanin"],
          correct: 1,
        },
        {
          q: "Glucose produced in photosynthesis is mainly a:",
          options: ["Protein", "Carbohydrate", "Lipid", "Nucleic acid"],
          correct: 1,
        },
        {
          q: "What energy source is required for the light phase?",
          options: ["Heat", "Light", "Sound", "Mechanical"],
          correct: 1,
        },
        {
          q: "Water for photosynthesis mainly enters through:",
          options: ["Roots", "Leaves", "Flowers", "Fruits"],
          correct: 0,
        },
        {
          q: "Photosynthesis occurs mainly in:",
          options: ["Roots", "Stem", "Leaves", "Seeds"],
          correct: 2,
        },
        {
          q: "The main organic product of photosynthesis is:",
          options: ["Glucose", "Ethanol", "Urea", "Glycerin"],
          correct: 0,
        },
      ],
      medium: [
        {
          q: "What are the two main phases of photosynthesis?",
          options: ["Light and dark", "Respiratory and secretory", "Mitotic and meiotic", "Anabolic and catabolic"],
          correct: 0,
        },
        {
          q: "Where does the light-dependent phase occur?",
          options: ["Stroma", "Thylakoids", "Nucleus", "Cytoplasm"],
          correct: 1,
        },
        {
          q: "Where does the Calvin cycle occur?",
          options: ["Thylakoids", "Chloroplast stroma", "Mitochondria", "Cell wall"],
          correct: 1,
        },
        {
          q: "What molecules are produced in the light phase for the dark phase?",
          options: ["ATP and NADPH", "Only CO₂", "Only O₂", "DNA and RNA"],
          correct: 0,
        },
        {
          q: "Which gas is the substrate in the Calvin cycle?",
          options: ["O₂", "CO₂", "N₂", "H₂"],
          correct: 1,
        },
        {
          q: "What happens to light energy in chloroplasts?",
          options: ["Converted to chemical energy", "Fully lost", "Becomes sound", "Unused"],
          correct: 0,
        },
        {
          q: "Water splitting in the light phase is called:",
          options: ["Photolysis", "Fermentation", "Glycolysis", "Respiration"],
          correct: 0,
        },
        {
          q: "Why are leaves green?",
          options: ["Chlorophyll reflects green light", "No pigments", "Because of water", "Because of starch"],
          correct: 0,
        },
        {
          q: "Photosynthesis reduces which gas in the atmosphere?",
          options: ["CO₂", "O₂", "N₂", "Ar"],
          correct: 0,
        },
        {
          q: "Which organism is an autotroph due to photosynthesis?",
          options: ["Fungus", "Green plant", "Parasitic bacterium", "Virus"],
          correct: 1,
        },
      ],
      hard: [
        {
          q: "Which photosystem is excited first in the Z-scheme?",
          options: ["Photosystem II", "Photosystem I", "Both at once", "Neither"],
          correct: 0,
        },
        {
          q: "What carries electrons from PSII to PSI?",
          options: ["Electron transport chain", "Ribosomes", "Microtubules", "Lysosomal complex"],
          correct: 0,
        },
        {
          q: "Which cofactor is reduced in the light phase?",
          options: ["NADPH", "Only FADH₂", "Glucose", "RNA"],
          correct: 0,
        },
        {
          q: "How many CO₂ molecules are fixed per Calvin cycle turn (classic)?",
          options: ["1", "3", "6", "12"],
          correct: 1,
        },
        {
          q: "Which enzyme catalyzes CO₂ fixation in the Calvin cycle?",
          options: ["Rubisco", "Amylase", "Catalase", "Lipase"],
          correct: 0,
        },
        {
          q: "What limits photosynthesis under low light?",
          options: ["Light phase", "Only respiration", "Only division", "Only excretion"],
          correct: 0,
        },
        {
          q: "C₄ plants are adapted to:",
          options: ["Hot climate and water deficit", "Only cold", "Only darkness", "No CO₂"],
          correct: 0,
        },
        {
          q: "Which Calvin cycle product is used to build sugars?",
          options: ["Glyceraldehyde-3-phosphate", "Pyruvate", "Lactate", "Acetyl-CoA"],
          correct: 0,
        },
        {
          q: "Photorespiration is linked to activity of:",
          options: ["Rubisco at high O₂", "Chlorophyll in dark", "DNA polymerase", "RNA"],
          correct: 0,
        },
        {
          q: "Quantum yield of photosynthesis describes:",
          options: ["Efficiency of photon conversion", "Root growth rate", "Number of mitoses", "Vacuole volume"],
          correct: 0,
        },
      ],
    },
  };

  const state = {
    uiLang: "ru",
    type: "mcq",
    difficulty: "medium",
    count: 10,
    testLang: "ru",
    view: "list",
    questions: [],
    previewIndex: 0,
    usageCount: 47,
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const sourceText = $("#sourceText");
  const charCounter = $("#charCounter");
  const btnGenerate = $("#btnGenerate");
  const statsBar = $("#statsBar");
  const questionsContainer = $("#questionsContainer");
  const emptyStateEl = $("#emptyState");
  const emptyStateTemplate = emptyStateEl.cloneNode(true);
  const previewNav = $("#previewNav");
  const previewIndicator = $("#previewIndicator");
  const toastContainer = $("#toastContainer");

  function t(key) {
    const pack = i18n[state.uiLang] || i18n.ru;
    return pack[key] || i18n.ru[key] || key;
  }

  function applyI18n() {
    $$("[data-i18n]").forEach((el) => {
      if (el.closest("#authModal")) return;
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    const ph = sourceText.getAttribute("data-i18n-placeholder");
    if (ph) sourceText.placeholder = t(ph);
    document.documentElement.lang = state.uiLang === "kz" ? "kk" : state.uiLang;
  }

  function showToast(message, type = "demo") {
    const el = document.createElement("div");
    el.className = `toast ${type === "success" ? "success" : type}`;
    el.textContent = message;
    toastContainer.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.3s";
      setTimeout(() => el.remove(), 300);
    }, 2800);
  }

  function updateCharCounter() {
    const len = sourceText.value.length;
    charCounter.textContent = `${len} / ${MAX_CHARS}`;
    charCounter.classList.toggle("warn", len > MAX_CHARS * 0.9);
    btnGenerate.disabled = len === 0;
  }

  function setActiveInGroup(container, selector, attr, value) {
    container.querySelectorAll(selector).forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute(attr) === value);
    });
  }

  function getQuestionPool() {
    const lang = mockQuestions[state.testLang] ? state.testLang : "ru";
    const diff = mockQuestions[lang][state.difficulty]
      ? state.difficulty
      : "medium";
    return [...mockQuestions[lang][diff]];
  }

  function renderQuestionCard(q, index) {
    const card = document.createElement("article");
    card.className = "question-card glass";
    card.dataset.index = String(index);

    const letters = ["A", "B", "C", "D"];
    const optionsHtml = q.options
      .map(
        (opt, i) =>
          `<div class="option${i === q.correct ? " correct" : ""}">
            <span class="radio"></span>
            <span>${letters[i]}. ${escapeHtml(opt)}</span>
          </div>`
      )
      .join("");

    card.innerHTML = `
      <div class="q-header">
        <span class="q-number">${index + 1}</span>
        <p class="q-text">${escapeHtml(q.q)}</p>
      </div>
      <div class="q-actions">
        <button type="button" class="edit" title="Edit">✎</button>
        <button type="button" class="delete" title="Delete">🗑</button>
      </div>
      <div class="options-list">${optionsHtml}</div>
    `;

    card.querySelector(".edit").addEventListener("click", () => {
      const updated = prompt(t("edit.prompt"), q.q);
      if (updated && updated.trim()) {
        q.q = updated.trim();
        state.questions[index] = q;
        renderQuestions();
        saveToStorage();
      }
    });

    card.querySelector(".delete").addEventListener("click", () => {
      state.questions.splice(index, 1);
      renderQuestions();
      saveToStorage();
    });

    return card;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderQuestions() {
    questionsContainer.innerHTML = "";
    questionsContainer.className = "questions-container";

    if (state.questions.length === 0) {
      const empty = emptyStateTemplate.cloneNode(true);
      const msg = empty.querySelector("[data-i18n='empty.message']");
      if (msg) msg.textContent = t("empty.message");
      questionsContainer.appendChild(empty);
      previewNav.classList.remove("visible");
      return;
    }

    if (state.view === "cards") {
      questionsContainer.classList.add("view-cards");
    } else if (state.view === "preview") {
      questionsContainer.classList.add("view-preview");
      previewNav.classList.add("visible");
    } else {
      previewNav.classList.remove("visible");
    }

    state.questions.forEach((q, i) => {
      const card = renderQuestionCard(q, i);
      if (state.view === "preview") {
        card.classList.toggle("preview-active", i === state.previewIndex);
      }
      questionsContainer.appendChild(card);
    });

    updatePreviewIndicator();
  }

  function updatePreviewIndicator() {
    const total = state.questions.length;
    if (total === 0) {
      previewIndicator.textContent = "0 / 0";
      return;
    }
    previewIndicator.textContent = `${state.previewIndex + 1} / ${total}`;
  }

  function generateQuestions() {
    const pool = getQuestionPool();
    const shuffled = pool.sort(() => Math.random() - 0.5);
    state.questions = shuffled.slice(0, Math.min(state.count, shuffled.length));
    state.previewIndex = 0;

    const tokens = 800 + Math.floor(Math.random() * 600);
    $("#statTime").textContent = "1.4s";
    $("#statTokens").textContent = tokens.toLocaleString();
    $("#statAccuracy").textContent = `${94 + Math.floor(Math.random() * 5)}%`;
    statsBar.classList.add("visible");

    state.usageCount = Math.min(100, state.usageCount + 1);
    $("#gaugeUsed").textContent = String(state.usageCount);
    const offset = 188.5 - (state.usageCount / 100) * 188.5;
    $("#gaugeFill").style.strokeDashoffset = String(offset);

    renderQuestions();
    showToast(t("toast.generated") + state.questions.length, "demo");
    saveToStorage();
  }

  function saveToStorage() {
    try {
      localStorage.setItem(
        "quizai-draft",
        JSON.stringify({
          source: sourceText.value,
          questions: state.questions,
          config: {
            type: state.type,
            difficulty: state.difficulty,
            count: state.count,
            testLang: state.testLang,
          },
          usageCount: state.usageCount,
        })
      );
    } catch (_) {
      /* ignore */
    }
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem("quizai-draft");
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (data.source) sourceText.value = data.source;
      if (data.questions?.length) {
        state.questions = data.questions;
        statsBar.classList.add("visible");
        $("#statTime").textContent = "—";
        $("#statTokens").textContent = "—";
        $("#statAccuracy").textContent = "—";
      }
      if (data.config) {
        Object.assign(state, data.config);
        syncConfigUI();
      }
      if (data.usageCount) {
        state.usageCount = data.usageCount;
        $("#gaugeUsed").textContent = String(state.usageCount);
        const offset = 188.5 - (state.usageCount / 100) * 188.5;
        $("#gaugeFill").style.strokeDashoffset = String(offset);
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  function syncConfigUI() {
    setActiveInGroup($("#typeCards"), ".type-card", "data-type", state.type);
    setActiveInGroup(
      $("#difficultyControl"),
      "button",
      "data-difficulty",
      state.difficulty
    );
    setActiveInGroup($("#countPills"), "button", "data-count", String(state.count));
    setActiveInGroup(
      $("#testLangList"),
      "button",
      "data-test-lang",
      state.testLang
    );
  }

  function shuffleQuestions() {
    if (state.questions.length < 2) return;
    for (let i = state.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.questions[i], state.questions[j]] = [state.questions[j], state.questions[i]];
    }
    renderQuestions();
    showToast(t("toast.shuffled"));
    saveToStorage();
  }

  function initSourceText() {
    if (!loadFromStorage()) {
      sourceText.value = DEFAULT_SOURCE[state.testLang] || DEFAULT_SOURCE.ru;
    }
    updateCharCounter();
  }

  function bindEvents() {
    sourceText.addEventListener("input", () => {
      updateCharCounter();
    });

    btnGenerate.addEventListener("click", async () => {
      if (btnGenerate.disabled) return;
      if (window.QuizAIAuth && !window.QuizAIAuth.requireAuth()) return;
      btnGenerate.classList.add("loading");
      btnGenerate.disabled = true;
      await new Promise((r) => setTimeout(r, GENERATE_DELAY_MS));
      btnGenerate.classList.remove("loading");
      generateQuestions();
      updateCharCounter();
    });

    $("#typeCards").addEventListener("click", (e) => {
      const card = e.target.closest(".type-card");
      if (!card) return;
      state.type = card.dataset.type;
      setActiveInGroup($("#typeCards"), ".type-card", "data-type", state.type);
    });

    $("#difficultyControl").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-difficulty]");
      if (!btn) return;
      state.difficulty = btn.dataset.difficulty;
      setActiveInGroup(
        $("#difficultyControl"),
        "button",
        "data-difficulty",
        state.difficulty
      );
    });

    $("#countPills").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-count]");
      if (!btn) return;
      state.count = parseInt(btn.dataset.count, 10);
      setActiveInGroup($("#countPills"), "button", "data-count", String(state.count));
    });

    $("#testLangList").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-test-lang]");
      if (!btn) return;
      state.testLang = btn.dataset.testLang;
      setActiveInGroup(
        $("#testLangList"),
        "button",
        "data-test-lang",
        state.testLang
      );
    });

    $$(".lang-switch button").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.uiLang = btn.dataset.uiLang;
        $$(".lang-switch button").forEach((b) =>
          b.classList.toggle("active", b === btn)
        );
        applyI18n();
        window.dispatchEvent(
          new CustomEvent("quizai-lang", { detail: state.uiLang })
        );
      });
    });

    $("#viewTabs").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-view]");
      if (!btn) return;
      state.view = btn.dataset.view;
      setActiveInGroup($("#viewTabs"), "button", "data-view", state.view);
      state.previewIndex = 0;
      renderQuestions();
    });

    $("#btnShuffle").addEventListener("click", shuffleQuestions);

    $("#btnFilter").addEventListener("click", () => showToast(t("toast.filter")));

    $("#btnSave").addEventListener("click", () => {
      saveToStorage();
      showToast(t("toast.saved"));
    });

    $("#btnRefresh").addEventListener("click", () => {
      renderQuestions();
      showToast(t("toast.refreshed"));
    });

    $$("[data-demo]").forEach((el) => {
      el.addEventListener("click", () => showToast(t("toast.demo")));
    });

    $("#quickNew").addEventListener("click", () => {
      sourceText.value = "";
      state.questions = [];
      statsBar.classList.remove("visible");
      renderQuestions();
      updateCharCounter();
      showToast(t("toast.cleared"));
      localStorage.removeItem("quizai-draft");
    });

    $("#configToggle").addEventListener("click", () => {
      $("#configSidebar").classList.toggle("collapsed");
    });

    $("#previewPrev").addEventListener("click", () => {
      if (state.previewIndex > 0) {
        state.previewIndex--;
        renderQuestions();
      }
    });

    $("#previewNext").addEventListener("click", () => {
      if (state.previewIndex < state.questions.length - 1) {
        state.previewIndex++;
        renderQuestions();
      }
    });
  }

  function init() {
    window.QuizAI = { showToast };
    applyI18n();
    window.dispatchEvent(
      new CustomEvent("quizai-lang", { detail: state.uiLang })
    );
    syncConfigUI();
    initSourceText();
    renderQuestions();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
