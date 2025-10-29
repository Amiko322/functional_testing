from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

def test_open_browser_page():
    driver_instance = None

    try:
        options = Options()
        options.add_argument("--start-maximized")

        chrome_service = Service(ChromeDriverManager().install())

        driver_instance = webdriver.Chrome(service=chrome_service, options=options)

        url = "https://www.yandex.ru"
        driver_instance.get(url)
        print(f"Страница успешно открыта: {driver_instance.title}")

        time.sleep(3)

    except Exception as error:
        print(f"Возникла ошибка: {error}")

    finally:
        if driver_instance:
            driver_instance.quit()
            print("Браузер был закрыт")