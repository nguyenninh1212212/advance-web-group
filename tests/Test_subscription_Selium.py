from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

URL_LOGIN = "http://localhost:3000/auth/login"
URL_SUBSCRIPTION = "http://localhost:3000/subscription-plan"


def setup_driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=options)
    driver.set_window_size(1280, 800)
    return driver


def login(driver, email, password):
    driver.get(URL_LOGIN)
    WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Email']")))
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Email']").send_keys(email)
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']").send_keys(password)
    driver.find_element(By.XPATH, "//button[contains(text(),'Sign In')]").click()

    # Chờ token trong localStorage
    WebDriverWait(driver, 10).until(
        lambda d: d.execute_script("return window.localStorage.getItem('accessToken');") is not None
    )


def test_subscription_not_visible_without_login():
    driver = setup_driver()
    try:
        driver.get("http://localhost:3000")
        driver.delete_all_cookies()
        driver.execute_script("window.localStorage.clear();")

        driver.get(URL_SUBSCRIPTION)

        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='subscribe-now-button']"))
            )
            print("❌ Fail: Subscription hiện khi chưa login")
        except:
            print("✅ Pass: Subscription không hiện khi chưa login")
    finally:
        driver.quit()


def test_subscription_visible_after_login():
    driver = setup_driver()
    try:
        login(driver, "user123@gmail.com", "123456")
        driver.get(URL_SUBSCRIPTION)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='subscribe-now-button']"))
        )
        print("✅ Pass: Subscription hiện sau khi login")
    finally:
        driver.quit()


def test_open_confirm_popup():
    driver = setup_driver()
    try:
        login(driver, "user123@gmail.com", "123456")
        driver.get(URL_SUBSCRIPTION)

        WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-testid='subscribe-now-button']"))
        ).click()

        popup = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[role='dialog']"))
        )
        popup_text = popup.find_element(By.TAG_NAME, "p").text

        if "Bạn có chắc" in popup_text:
            print("✅ Pass: Popup xác nhận hiện ra")
        else:
            print("❌ Fail: Popup xác nhận không đúng")
    finally:
        driver.quit()

def test_confirm_subscription():
    driver = webdriver.Chrome()
    try:
        login(driver, "user123@gmail.com", "123456")

        driver.get(URL_SUBSCRIPTION)

        # Click nút Subscribe
        subscribe_btn = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Subscribe now')]"))
        )
        subscribe_btn.click()

        # Đợi popup hiện
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".fixed.inset-0.bg-black.bg-opacity-50"))
        )

        # Lấy confirm button
        confirm_btn = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-testid='confirm-button']"))
        )
        driver.execute_script("arguments[0].scrollIntoView(true);", confirm_btn)
        driver.execute_script("arguments[0].click();", confirm_btn)

        # Xác nhận popup biến mất
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.CSS_SELECTOR, ".fixed.inset-0.bg-black.bg-opacity-50"))
        )

        print("✅ Pass: Đã xác nhận mua gói và popup đã biến mất")
    finally:
        driver.quit()


if __name__ == "__main__":
    print("🚫 Test 1: Subscription không hiện khi chưa login")
    test_subscription_not_visible_without_login()

    print("\n🔐 Test 2: Subscription hiện sau khi login")
    test_subscription_visible_after_login()

    print("\n✅ Test 3: Popup xác nhận hiện ra khi nhấn Subscribe")
    test_open_confirm_popup()

    print("\n✅ Test 4: Xác nhận mua gói và đóng popup")
    test_confirm_subscription()
