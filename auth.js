(function () {
  "use strict";

  const USERS_KEY = "quizai-users";
  const SESSION_KEY = "quizai-session";
  const UI_LANG_KEY = "quizai-ui-lang";

  const i18n = {
    ru: {
      "auth.login": "Войти",
      "auth.register": "Регистрация",
      "auth.logout": "Выйти",
      "auth.tabRegister": "Регистрация",
      "auth.tabLogin": "Вход",
      "auth.registerTitle": "Создать аккаунт",
      "auth.loginTitle": "Войти в аккаунт",
      "auth.registerSub": "Сохраняйте тесты и отслеживайте лимиты",
      "auth.loginSub": "Продолжите работу с вашими тестами",
      "auth.name": "Имя",
      "auth.email": "Email",
      "auth.password": "Пароль",
      "auth.passwordConfirm": "Подтвердите пароль",
      "auth.agree": "Я согласен с условиями использования",
      "auth.submitRegister": "Зарегистрироваться",
      "auth.submitLogin": "Войти",
      "auth.err.name": "Введите имя (минимум 2 символа)",
      "auth.err.email": "Введите корректный email",
      "auth.err.password": "Пароль минимум 6 символов",
      "auth.err.confirm": "Пароли не совпадают",
      "auth.err.agree": "Примите условия использования",
      "auth.err.exists": "Пользователь с таким email уже зарегистрирован",
      "auth.err.invalid": "Неверный email или пароль",
      "auth.success.register": "Регистрация успешна! Добро пожаловать",
      "auth.success.login": "Вы вошли в аккаунт",
      "auth.success.logout": "Вы вышли из аккаунта",
      "auth.needLogin": "Войдите или зарегистрируйтесь для генерации",
    },
    kz: {
      "auth.login": "Кіру",
      "auth.register": "Тіркелу",
      "auth.logout": "Шығу",
      "auth.tabRegister": "Тіркелу",
      "auth.tabLogin": "Кіру",
      "auth.registerTitle": "Аккаунт жасау",
      "auth.loginTitle": "Аккаунтқа кіру",
      "auth.registerSub": "Тесттерді сақтаңыз және лимиттерді бақылаңыз",
      "auth.loginSub": "Тесттеріңізбен жұмысты жалғастырыңыз",
      "auth.name": "Аты",
      "auth.email": "Email",
      "auth.password": "Құпия сөз",
      "auth.passwordConfirm": "Құпия сөзді растаңыз",
      "auth.agree": "Пайдалану шарттарымен келісемін",
      "auth.submitRegister": "Тіркелу",
      "auth.submitLogin": "Кіру",
      "auth.err.name": "Атыңызды енгізіңіз (кемінде 2 таңба)",
      "auth.err.email": "Дұрыс email енгізіңіз",
      "auth.err.password": "Құпия сөз кемінде 6 таңба",
      "auth.err.confirm": "Құпия сөздер сәйкес емес",
      "auth.err.agree": "Пайдалану шарттарын қабылдаңыз",
      "auth.err.exists": "Бұл email тіркелген",
      "auth.err.invalid": "Email немесе құпия сөз қате",
      "auth.success.register": "Тіркелу сәтті! Қош келдіңіз",
      "auth.success.login": "Сіз кірдіңіз",
      "auth.success.logout": "Сіз шықтыңыз",
      "auth.needLogin": "Генерация үшін кіріңіз немесе тіркеліңіз",
    },
    en: {
      "auth.login": "Log in",
      "auth.register": "Sign up",
      "auth.logout": "Log out",
      "auth.tabRegister": "Sign up",
      "auth.tabLogin": "Log in",
      "auth.registerTitle": "Create account",
      "auth.loginTitle": "Log in to your account",
      "auth.registerSub": "Save tests and track your usage limits",
      "auth.loginSub": "Continue working with your tests",
      "auth.name": "Name",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.passwordConfirm": "Confirm password",
      "auth.agree": "I agree to the terms of use",
      "auth.submitRegister": "Sign up",
      "auth.submitLogin": "Log in",
      "auth.err.name": "Enter a name (at least 2 characters)",
      "auth.err.email": "Enter a valid email",
      "auth.err.password": "Password must be at least 6 characters",
      "auth.err.confirm": "Passwords do not match",
      "auth.err.agree": "Please accept the terms of use",
      "auth.err.exists": "An account with this email already exists",
      "auth.err.invalid": "Invalid email or password",
      "auth.success.register": "Registration successful! Welcome",
      "auth.success.login": "You are logged in",
      "auth.success.logout": "You have logged out",
      "auth.needLogin": "Log in or sign up to generate questions",
    },
  };

  let uiLang = localStorage.getItem(UI_LANG_KEY) || "ru";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function t(key) {
    const pack = i18n[uiLang] || i18n.ru;
    return pack[key] || i18n.ru[key] || key;
  }

  function applyI18n() {
    $$("#authModal [data-i18n], #authNav [data-i18n], #userMenu [data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    updateModalTitles();
  }

  function updateModalTitles() {
    const tab = $(".auth-tab.active")?.dataset.authTab || "register";
    const title = $("#authModalTitle");
    const sub = $(".auth-modal-sub");
    if (tab === "login") {
      title.textContent = t("auth.loginTitle");
      if (sub) sub.textContent = t("auth.loginSub");
    } else {
      title.textContent = t("auth.registerTitle");
      if (sub) sub.textContent = t("auth.registerSub");
    }
  }

  async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }

  function setSession(user) {
    const session = {
      userId: user.id,
      name: user.name,
      email: user.email,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function getInitials(name) {
    return name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";
  }

  function showToast(message, type = "success") {
    if (window.QuizAI?.showToast) {
      window.QuizAI.showToast(message, type);
      return;
    }
    alert(message);
  }

  function updateNav() {
    const session = getSession();
    const authNav = $("#authNav");
    const userMenu = $("#userMenu");

    if (session) {
      authNav.classList.add("hidden");
      userMenu.classList.remove("hidden");
      $("#avatarInitials").textContent = getInitials(session.name);
      $("#userDisplayName").textContent = session.name;
      $("#userDisplayEmail").textContent = session.email;
    } else {
      authNav.classList.remove("hidden");
      userMenu.classList.add("hidden");
      $("#userDropdown").classList.add("hidden");
    }
  }

  function openModal(tab = "register") {
    switchTab(tab);
    $("#authModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    $("#authModal").classList.add("hidden");
    document.body.style.overflow = "";
    clearFormErrors();
    $("#registerForm").reset();
    $("#loginForm").reset();
  }

  function switchTab(tab) {
    $$(".auth-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.authTab === tab);
    });
    $("#registerForm").classList.toggle("hidden", tab !== "register");
    $("#loginForm").classList.toggle("hidden", tab !== "login");
    updateModalTitles();
    clearFormErrors();
  }

  function showFormError(formId, message) {
    const errEl = formId === "register" ? $("#registerError") : $("#loginError");
    errEl.textContent = message;
    errEl.classList.remove("hidden");
  }

  function clearFormErrors() {
    $("#registerError").classList.add("hidden");
    $("#loginError").classList.add("hidden");
    $$(".auth-form input").forEach((inp) => inp.classList.remove("invalid"));
  }

  async function handleRegister(e) {
    e.preventDefault();
    clearFormErrors();

    const name = $("#regName").value.trim();
    const email = $("#regEmail").value.trim().toLowerCase();
    const password = $("#regPassword").value;
    const confirm = $("#regPasswordConfirm").value;
    const agree = $("#regAgree").checked;

    if (name.length < 2) {
      $("#regName").classList.add("invalid");
      showFormError("register", t("auth.err.name"));
      return;
    }
    if (!isValidEmail(email)) {
      $("#regEmail").classList.add("invalid");
      showFormError("register", t("auth.err.email"));
      return;
    }
    if (password.length < 6) {
      $("#regPassword").classList.add("invalid");
      showFormError("register", t("auth.err.password"));
      return;
    }
    if (password !== confirm) {
      $("#regPasswordConfirm").classList.add("invalid");
      showFormError("register", t("auth.err.confirm"));
      return;
    }
    if (!agree) {
      showFormError("register", t("auth.err.agree"));
      return;
    }

    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      $("#regEmail").classList.add("invalid");
      showFormError("register", t("auth.err.exists"));
      return;
    }

    const submitBtn = $("#registerForm button[type=submit]");
    submitBtn.disabled = true;

    try {
      const passwordHash = await hashPassword(password);
      const user = {
        id: crypto.randomUUID(),
        name,
        email,
        passwordHash,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      saveUsers(users);
      setSession(user);
      updateNav();
      closeModal();
      showToast(t("auth.success.register"), "success");
      window.dispatchEvent(new CustomEvent("quizai-auth", { detail: { loggedIn: true } }));
    } finally {
      submitBtn.disabled = false;
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    clearFormErrors();

    const email = $("#loginEmail").value.trim().toLowerCase();
    const password = $("#loginPassword").value;

    if (!isValidEmail(email)) {
      $("#loginEmail").classList.add("invalid");
      showFormError("login", t("auth.err.email"));
      return;
    }

    const users = getUsers();
    const user = users.find((u) => u.email === email);

    const submitBtn = $("#loginForm button[type=submit]");
    submitBtn.disabled = true;

    try {
      const passwordHash = await hashPassword(password);
      if (!user || user.passwordHash !== passwordHash) {
        showFormError("login", t("auth.err.invalid"));
        return;
      }
      setSession(user);
      updateNav();
      closeModal();
      showToast(t("auth.success.login"), "success");
      window.dispatchEvent(new CustomEvent("quizai-auth", { detail: { loggedIn: true } }));
    } finally {
      submitBtn.disabled = false;
    }
  }

  function handleLogout() {
    clearSession();
    updateNav();
    $("#userDropdown").classList.add("hidden");
    showToast(t("auth.success.logout"), "success");
    window.dispatchEvent(new CustomEvent("quizai-auth", { detail: { loggedIn: false } }));
  }

  function bindEvents() {
    $("#btnRegister").addEventListener("click", () => openModal("register"));
    $("#btnLogin").addEventListener("click", () => openModal("login"));
    $("#authModalClose").addEventListener("click", closeModal);
    $("#authModal").addEventListener("click", (e) => {
      if (e.target === $("#authModal")) closeModal();
    });

    $$(".auth-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchTab(tab.dataset.authTab));
    });

    $("#registerForm").addEventListener("submit", handleRegister);
    $("#loginForm").addEventListener("submit", handleLogin);
    $("#btnLogout").addEventListener("click", handleLogout);

    $("#avatarBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      const dd = $("#userDropdown");
      const open = dd.classList.toggle("hidden");
      $("#avatarBtn").setAttribute("aria-expanded", String(!open));
    });

    document.addEventListener("click", () => {
      $("#userDropdown").classList.add("hidden");
      $("#avatarBtn").setAttribute("aria-expanded", "false");
    });

    $("#userDropdown").addEventListener("click", (e) => e.stopPropagation());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    window.addEventListener("quizai-lang", (e) => {
      uiLang = e.detail || "ru";
      localStorage.setItem(UI_LANG_KEY, uiLang);
      applyI18n();
    });
  }

  function init() {
    applyI18n();
    updateNav();
    bindEvents();

    window.QuizAIAuth = {
      isLoggedIn: () => !!getSession(),
      getSession,
      openRegister: () => openModal("register"),
      openLogin: () => openModal("login"),
      requireAuth: () => {
        if (getSession()) return true;
        showToast(t("auth.needLogin"), "demo");
        openModal("register");
        return false;
      },
      t,
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
