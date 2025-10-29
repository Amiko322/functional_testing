const users = [
    {
        username: "user",
        password: "AntonMikolyay"
    }
];

const usernameEl = document.getElementById('username');
const passwordEl = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const errorEl = document.getElementById('error');
const afterLogin = document.getElementById('afterLogin');

function showError(text) {
    errorEl.textContent = text;
    errorEl.classList.remove('hidden');
}

function clearError() {
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
}

loginBtn.addEventListener('click', function () {
    clearError();
    const u = usernameEl.value.trim();
    const p = passwordEl.value;

    if (!u || !p) {
        showError('Пожалуйста, заполните логин и пароль.');
        return;
    }

    const found = users.find(x => x.username === u && x.password === p);
    if (found) {
        afterLogin.classList.remove('hidden');
        document.getElementById('successMessage').textContent = `Вход выполнен успешно!`;
    } else {
        showError('Неверный логин или пароль.');
    }
});
