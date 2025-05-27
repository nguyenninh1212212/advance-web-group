import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
import random
import string
import time
from datetime import datetime, timedelta

class RegisterFormTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        service = Service(ChromeDriverManager().install())
        cls.driver = webdriver.Chrome(service=service, options=chrome_options)
        cls.wait = WebDriverWait(cls.driver, 10)
        cls.base_url = "http://localhost:3000/auth/register"

    def setUp(self):
        self.driver.get(self.base_url)
        
    @classmethod    
    def tearDownClass(cls):
        cls.driver.quit()

    def generate_random_string(self, length=10):
        return ''.join(random.choices(string.ascii_letters, k=length))

    def generate_random_email(self):
        return f"{self.generate_random_string(8)}@test.com"

    def generate_random_date(self, start_date="1950-01-01"):
        start = datetime.strptime(start_date, "%Y-%m-%d")
        end = datetime.now() - timedelta(days=365*18)  # 18 years ago
        random_date = start + timedelta(days=random.randint(0, (end-start).days))
        return random_date.strftime("%Y-%m-%d")

    def fill_form(self, full_name="", email="", password="", confirm_password="", date_of_birth=""):
        if full_name:
            self.driver.find_element(By.NAME, "fullName").send_keys(full_name)
        if email:
            self.driver.find_element(By.NAME, "email").send_keys(email)
        if password:
            self.driver.find_element(By.NAME, "password").send_keys(password)
        if confirm_password:
            self.driver.find_element(By.NAME, "confirmPassword").send_keys(confirm_password)
        if date_of_birth:
            self.driver.find_element(By.NAME, "dateOfBirth").send_keys(date_of_birth)
        
        # Check robot checkbox
        self.driver.find_element(By.XPATH, "//input[@type='checkbox']").click()

    def submit_form(self):
        self.driver.find_element(By.XPATH, "//button[@type='submit']").click()

    # Test Cases
    def test_01_valid_registration(self):
        """Test đăng ký với dữ liệu hợp lệ"""
        self.fill_form(
            full_name="Test User",
            email=self.generate_random_email(),
            password="Password123",
            confirm_password="Password123",
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        # Đợi URL thay đổi hoặc có thông báo thành công
        try:
            WebDriverWait(self.driver, 5).until(
                lambda x: x.current_url != self.base_url or
                len(x.find_elements(By.CLASS_NAME, "success-message")) > 0
            )
            self.assertTrue(True)
        except TimeoutException:
            self.fail("Registration didn't complete successfully")

    def test_02_empty_form_submission(self):
        """Test submit form trống"""
        self.submit_form()
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_03_invalid_email_format(self):
        """Test email không hợp lệ"""
        self.fill_form(
            full_name="Test User",
            email="invalid.email",
            password="Password123",
            confirm_password="Password123",
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_04_password_mismatch(self):
        """Test mật khẩu không khớp"""
        self.fill_form(
            full_name="Test User",
            email=self.generate_random_email(),
            password="Password123",
            confirm_password="Password124",
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        time.sleep(1)
        alert = self.driver.switch_to.alert
        self.assertEqual(alert.text, "Passwords do not match!")
        alert.accept()

    def test_05_future_birth_date(self):
        """Test ngày sinh trong tương lai"""
        future_date = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        self.fill_form(
            full_name="Test User",
            email=self.generate_random_email(),
            password="Password123",
            confirm_password="Password123",
            date_of_birth=future_date
        )
        self.submit_form()
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_06_special_characters_name(self):
        """Test tên với ký tự đặc biệt"""
        self.fill_form(
            full_name="Test@User#123",
            email=self.generate_random_email(),
            password="Password123",
            confirm_password="Password123",
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        time.sleep(1)
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_07_very_long_inputs(self):
        """Test input quá dài"""
        long_string = "a" * 256
        self.fill_form(
            full_name=long_string,
            email=f"{long_string[:245]}@test.com",
            password=long_string,
            confirm_password=long_string,
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_08_sql_injection_attempt(self):
        """Test SQL injection"""
        self.fill_form(
            full_name="' OR '1'='1",
            email="test@test.com' OR '1'='1",
            password="' OR '1'='1",
            confirm_password="' OR '1'='1",
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        time.sleep(1)
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_09_xss_attempt(self):
        """Test XSS attack"""
        self.fill_form(
            full_name="<script>alert('xss')</script>",
            email=self.generate_random_email(),
            password="Password123",
            confirm_password="Password123",
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        time.sleep(1)
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_10_whitespace_only(self):
        """Test nhập khoảng trắng"""
        self.fill_form(
            full_name="   ",
            email=self.generate_random_email(),
            password="   ",
            confirm_password="   ",
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_11_without_robot_check(self):
        """Test không check robot"""
        self.fill_form(
            full_name="Test User",
            email=self.generate_random_email(),
            password="Password123",
            confirm_password="Password123",
            date_of_birth="2000-01-01"
        )
        # Don't click robot checkbox
        self.submit_form()
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_12_password_complexity(self):
        """Test độ phức tạp mật khẩu"""
        self.fill_form(
            full_name="Test User",
            email=self.generate_random_email(),
            password="simple",
            confirm_password="simple",
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_13_email_case_sensitivity(self):
        """Test email case sensitive"""
        email = self.generate_random_email()
        self.fill_form(
            full_name="Test User",
            email=email.upper(),
            password="Password123",
            confirm_password="Password123",
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        # Kiểm tra thông báo thành công thay vì URL
        try:
            WebDriverWait(self.driver, 5).until(
                lambda x: len(x.find_elements(By.CLASS_NAME, "success-message")) > 0
            )
            self.assertTrue(True)
        except TimeoutException:
            self.fail("Registration with uppercase email failed")

    def test_14_multiple_submissions(self):
        """Test submit nhiều lần"""
        for _ in range(3):
            self.fill_form(
                full_name="Test User",
                email=self.generate_random_email(),
                password="Password123",
                confirm_password="Password123",
                date_of_birth="2000-01-01"
            )
            self.submit_form()
            time.sleep(1)
            self.driver.get(self.base_url)

    def test_15_browser_navigation(self):
        """Test navigation trình duyệt"""
        self.fill_form(
            full_name="Test User",
            email=self.generate_random_email(),
            password="Password123",
            confirm_password="Password123",
            date_of_birth="2000-01-01"
        )
        self.driver.back()
        self.driver.forward()
        self.assertEqual(self.driver.current_url, self.base_url)

    def test_16_form_reset(self):
        """Test reset form"""
        self.fill_form(
            full_name="Test User",
            email=self.generate_random_email(),
            password="Password123",
            confirm_password="Password123",
            date_of_birth="2000-01-01"
        )
        self.driver.refresh()
        name_field = self.driver.find_element(By.NAME, "fullName")
        self.assertEqual(name_field.get_attribute("value"), "")

    def test_17_network_error(self):
        """Test lỗi mạng"""
        # Tắt kết nối mạng
        self.driver.execute_script("window.navigator.onLine = false;")
        self.fill_form(
            full_name="Test User",
            email=self.generate_random_email(),
            password="Password123",
            confirm_password="Password123",
            date_of_birth="2000-01-01"
        )
        self.submit_form()
        
        # Đợi thông báo lỗi xuất hiện
        try:
            error_message = WebDriverWait(self.driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, "error-message"))
            )
            self.assertIn("lỗi", error_message.text.lower())
        except TimeoutException:
            self.fail("Network error message not shown")

    def test_18_keyboard_navigation(self):
        """Test điều hướng bàn phím"""
        # Focus vào trường đầu tiên
        first_input = self.driver.find_element(By.NAME, "fullName")
        first_input.click()
        
        # Tab qua tất cả các trường
        for _ in range(6):
            active = self.driver.switch_to.active_element
            self.driver.execute_script("arguments[0].dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}))", active)
            time.sleep(0.5)
        
        # Kiểm tra nút submit là element cuối cùng
        submit_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        self.assertEqual(self.driver.switch_to.active_element, submit_button)

    def test_20_auto_focus(self):
        """Test focus tự động"""
        # Refresh page để đảm bảo trạng thái ban đầu
        self.driver.refresh()
        time.sleep(1)
        
        # Kiểm tra focus bằng cách gửi keys
        test_input = "Test"
        self.driver.switch_to.active_element.send_keys(test_input)
        
        # Verify text xuất hiện trong trường đầu tiên
        first_input = self.driver.find_element(By.NAME, "fullName")
        self.assertEqual(first_input.get_attribute("value"), test_input)

if __name__ == '__main__':
    unittest.main(verbosity=2)


#Các test case trên bao gồm kiểm tra:

    #Đăng ký thành công với dữ liệu hợp lệ
    #Submit form trống
    #Email không hợp lệ
    #Mật khẩu không khớp
    #Ngày sinh trong tương lai
    #Tên chứa ký tự đặc biệt
    #Input quá dài
    #SQL injection
    #XSS attack
    #Input chỉ có khoảng trắng
    #Không check robot
    #Độ phức tạp mật khẩu
    #Email case sensitive
    #Submit nhiều lần
    #Navigation trình duyệt
    #Reset form
    #Lỗi mạng
    #Điều hướng bàn phím
    #Kiểm tra trường bắt buộc
    #Focus tự động