import requests

API_BASE = "https://reqres.in/api"
TIMEOUT_SEC = 10
HEADERS = {"Content-Type": "application/json", "x-api-key": "reqres-free-v1"}

class TestAPI:
    """
    Минимальный набор автотестов для reqres.in
    """

    def _check_fields_and_values(self, data: dict, expected_values: dict, required_keys: list):
        """Универсальная проверка наличия полей и соответствия значений"""
        for key in required_keys:
            assert key in data, f"Нет поля '{key}'"
        for key, value in expected_values.items():
            assert data[key] == value, f"{key} не совпадает"

    def test_get_single_user(self):
        """GET: проверка данных одного пользователя"""
        resp = requests.get(f"{API_BASE}/users/1", headers=HEADERS, timeout=TIMEOUT_SEC)
        assert resp.status_code == 200, f"Ожидался 200, получен {resp.status_code}"

        user_info = resp.json().get("data", {})
        required_fields = ["id", "email", "first_name", "last_name", "avatar"]
        expected_values = {"id": 1}
        self._check_fields_and_values(user_info, expected_values, required_fields)
        assert "@" in user_info["email"], "Email имеет некорректный формат"

    def test_add_user(self):
        """POST: создание нового пользователя"""
        new_user = {"fullName": "Anton Mikolyay", "position": "QA Engineer", "years": 22}
        resp = requests.post(f"{API_BASE}/users", json=new_user, headers=HEADERS, timeout=TIMEOUT_SEC)
        assert resp.status_code == 201, f"Ожидался 201, получен {resp.status_code}"

        required_keys = ["fullName", "position", "years", "id", "createdAt"]
        self._check_fields_and_values(resp.json(), new_user, required_keys)

    def test_modify_user(self):
        """PUT: обновление данных пользователя"""
        update_user = {"fullName": "Anton Mikolyay", "position": "Automation QA", "years": 23}
        resp = requests.put(f"{API_BASE}/users/2", json=update_user, headers=HEADERS, timeout=TIMEOUT_SEC)
        assert resp.status_code == 200, f"Ожидался 200, получен {resp.status_code}"

        required_keys = ["fullName", "position", "years", "updatedAt"]
        self._check_fields_and_values(resp.json(), update_user, required_keys)
