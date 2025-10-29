from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

class TestLoginPage:

    def setup_method(self):
        chrome_service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=chrome_service)
        self.wait = WebDriverWait(self.driver, 30)

    def teardown_method(self):
        self.driver.quit()

    def test_successful_login(self):
        self.driver.get("http://127.0.0.1:5500/login/index.html")

        login_input = self.wait.until(
            EC.visibility_of_element_located((By.ID, "username"))
        )
        password_input = self.wait.until(
            EC.visibility_of_element_located((By.ID, "password"))
        )
        submit_btn = self.wait.until(
            EC.element_to_be_clickable((By.ID, "loginBtn"))
        )

        login_input.send_keys("user")
        password_input.send_keys("AntonMikolyay")
        submit_btn.click()
        
        logout = self.wait.until(
            EC.visibility_of_element_located((By.ID, "successMessage"))
        )

        assert logout.is_displayed()
