import unittest
import time
import random
import string
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from faker import Faker
import json

class LoginTestGenerator:
    """
    Tự động tạo các test cases cho chức năng đăng nhập TruyenVerse
    """
    
    def __init__(self):
        self.fake = Faker('vi_VN')  # Sử dụng locale Việt Nam
        self.base_url = "http://localhost:3000"
        self.login_url = f"{self.base_url}/auth/login"
        
        # Dữ liệu test hợp lệ (cần cập nhật theo thực tế)
        self.valid_credentials = {
            "email": "q0934455620@gmail.com",
            "password": "Anmisoi12"
        }
        
        # Các pattern test cases
        self.test_patterns = [
            "valid_login",
            "invalid_email", 
            "invalid_password",
            "empty_email",
            "empty_password",
            "empty_both",
            "invalid_email_format",
            "special_characters",
            "sql_injection",
            "xss_attempt",
            "long_inputs",
            "boundary_values",
            "case_sensitivity",
            "whitespace_handling",
            "unicode_characters"
        ]
    
    def generate_invalid_emails(self, count=5):
        """Tạo các email không hợp lệ"""
        invalid_emails = []
        patterns = [
            lambda: self.fake.word(),  # Không có @
            lambda: f"{self.fake.word()}@",  # Thiếu domain
            lambda: f"@{self.fake.domain_name()}",  # Thiếu local part
            lambda: f"{self.fake.word()}@.com",  # Domain không hợp lệ
            lambda: f"{self.fake.word()}@{self.fake.word()}..",  # Kết thúc bằng ..
            lambda: f"{self.fake.word()}@@{self.fake.domain_name()}",  # Hai @
            lambda: f"{self.fake.word()}@{self.fake.word()}",  # Thiếu TLD
            lambda: " " * random.randint(1, 5),  # Chỉ có space
            lambda: self.fake.email().replace("@", ""),  # Xóa @
            lambda: self.fake.email() + " ",  # Có space cuối
        ]
        
        for _ in range(count):
            pattern = random.choice(patterns)
            invalid_emails.append(pattern())
        
        return invalid_emails
    
    def generate_invalid_passwords(self, count=5):
        """Tạo các password không hợp lệ"""
        invalid_passwords = [
            "",  # Empty
            " ",  # Chỉ space
            "123",  # Quá ngắn
            "a" * 100,  # Quá dài
            "password",  # Thông thường
            "12345678",  # Chỉ số
            "abcdefgh",  # Chỉ chữ
            "PASSWORD",  # Chỉ chữ hoa
            "   pass   ",  # Có space đầu cuối
            # Thay dòng gây lỗi bằng:
            self.fake.password(length=8)  # Độ dài an toàn
        ]
        
        return random.sample(invalid_passwords, min(count, len(invalid_passwords)))
    
    def generate_special_test_data(self):
        """Tạo dữ liệu test đặc biệt"""
        return {
            'sql_injection': [
                "admin@test.com' OR '1'='1",
                "admin@test.com'; DROP TABLE users; --",
                "admin@test.com' UNION SELECT * FROM users --"
            ],
            'xss_attempts': [
                "<script>alert('XSS')</script>@test.com",
                "javascript:alert('XSS')@test.com",
                "<img src=x onerror=alert('XSS')>@test.com"
            ],
            'unicode_chars': [
                "tést@ëxämplë.cöm",
                "用户@测试.com",
                "юзер@тест.ру"
            ],
            'long_inputs': [
                "a" * 255 + "@test.com",
                "test@" + "a" * 250 + ".com"
            ]
        }
    
    def generate_test_cases(self):
        """Tự động tạo tất cả test cases"""
        test_cases = []
        special_data = self.generate_special_test_data()
        
        # 1. Valid login test
        test_cases.append({
            'name': 'test_valid_login',
            'email': self.valid_credentials['email'],
            'password': self.valid_credentials['password'],
            'expected_result': 'success',
            'description': 'Đăng nhập thành công với thông tin hợp lệ'
        })
        
        # 2. Invalid email tests
        for i, email in enumerate(self.generate_invalid_emails(3)):
            test_cases.append({
                'name': f'test_invalid_email_{i+1}',
                'email': email,
                'password': self.valid_credentials['password'],
                'expected_result': 'email_error',
                'description': f'Đăng nhập với email không hợp lệ: {email}'
            })
        
        # 3. Invalid password tests
        for i, password in enumerate(self.generate_invalid_passwords(3)):
            test_cases.append({
                'name': f'test_invalid_password_{i+1}',
                'email': self.valid_credentials['email'],
                'password': password,
                'expected_result': 'password_error' if password == "" else 'login_error',
                'description': f'Đăng nhập với password không hợp lệ'
            })
        
        # 4. Empty fields tests
        test_cases.extend([
            {
                'name': 'test_empty_email',
                'email': '',
                'password': self.valid_credentials['password'],
                'expected_result': 'email_error',
                'description': 'Đăng nhập với email trống'
            },
            {
                'name': 'test_empty_password',
                'email': self.valid_credentials['email'],
                'password': '',
                'expected_result': 'password_error',
                'description': 'Đăng nhập với password trống'
            },
            {
                'name': 'test_empty_both',
                'email': '',
                'password': '',
                'expected_result': 'both_error',
                'description': 'Đăng nhập với cả hai trường trống'
            }
        ])
        
        # 5. SQL Injection tests
        for i, email in enumerate(special_data['sql_injection']):
            test_cases.append({
                'name': f'test_sql_injection_{i+1}',
                'email': email,
                'password': 'password123',
                'expected_result': 'email_error',
                'description': f'Kiểm tra SQL injection: {email}'
            })
        
        # 6. XSS tests
        for i, email in enumerate(special_data['xss_attempts']):
            test_cases.append({
                'name': f'test_xss_attempt_{i+1}',
                'email': email,
                'password': 'password123',
                'expected_result': 'email_error',
                'description': f'Kiểm tra XSS: {email}'
            })
        
        # 7. Unicode tests
        for i, email in enumerate(special_data['unicode_chars']):
            test_cases.append({
                'name': f'test_unicode_email_{i+1}',
                'email': email,
                'password': 'password123',
                'expected_result': 'email_error',
                'description': f'Kiểm tra unicode: {email}'
            })
        
        # 8. Boundary value tests
        test_cases.extend([
            {
                'name': 'test_long_email',
                'email': special_data['long_inputs'][0],
                'password': 'password123',
                'expected_result': 'email_error',
                'description': 'Email quá dài'
            },
            {
                'name': 'test_long_password',
                'email': self.valid_credentials['email'],
                'password': 'a' * 1000,
                'expected_result': 'login_error',
                'description': 'Password quá dài'
            }
        ])
        
        # 9. Whitespace tests
        test_cases.extend([
            {
                'name': 'test_email_with_spaces',
                'email': f"  {self.valid_credentials['email']}  ",
                'password': self.valid_credentials['password'],
                'expected_result': 'login_error',
                'description': 'Email có space đầu cuối'
            },
            {
                'name': 'test_password_with_spaces',
                'email': self.valid_credentials['email'],
                'password': f"  {self.valid_credentials['password']}  ",
                'expected_result': 'login_error',
                'description': 'Password có space đầu cuối'
            }
        ])
        
        # 10. Case sensitivity test
        test_cases.append({
            'name': 'test_case_sensitivity',
            'email': self.valid_credentials['email'].upper(),
            'password': self.valid_credentials['password'],
            'expected_result': 'login_error',
            'description': 'Kiểm tra case sensitive của email'
        })
        
        return test_cases

class TruyenVerseLoginTest(unittest.TestCase):
    """
    Test suite tự động cho chức năng đăng nhập TruyenVerse
    """
    
    @classmethod
    def setUpClass(cls):
        """Thiết lập ban đầu cho toàn bộ test suite"""
        cls.generator = LoginTestGenerator()
        cls.test_cases = cls.generator.generate_test_cases()
        
        # Setup Chrome options
        cls.chrome_options = Options()
        cls.chrome_options.add_argument("--headless")
        cls.chrome_options.add_argument("--no-sandbox")
        cls.chrome_options.add_argument("--disable-dev-shm-usage")
        cls.chrome_options.add_argument("--window-size=1920,1080")
        
        # Kết quả test
        cls.test_results = []
    
    def setUp(self):
        """Thiết lập trước mỗi test case"""
        self.driver = webdriver.Chrome(options=self.chrome_options)
        self.driver.implicitly_wait(10)
        self.wait = WebDriverWait(self.driver, 10)
        
        # Mở trang đăng nhập
        self.driver.get(self.generator.login_url)
        time.sleep(2)
    
    def tearDown(self):
        """Dọn dẹp sau mỗi test case"""
        if self.driver:
            self.driver.quit()
    
    def find_element_safely(self, by, value):
        """Tìm element an toàn"""
        try:
            return self.wait.until(EC.presence_of_element_located((by, value)))
        except TimeoutException:
            return None
    
    def fill_login_form(self, email, password):
        """Điền form đăng nhập"""
        try:
            # Tìm và điền email
            email_input = self.find_element_safely(By.XPATH, 
                "//input[@type='text' and (contains(@placeholder, 'Email') or @placeholder='')]")
            if email_input:
                email_input.clear()
                email_input.send_keys(email)
            
            # Tìm và điền password
            password_input = self.find_element_safely(By.XPATH, 
                "//input[@type='password' and (contains(@placeholder, 'Password') or @placeholder='')]")
            if password_input:
                password_input.clear()
                password_input.send_keys(password)
            
            return True
        except Exception as e:
            print(f"Lỗi khi điền form: {e}")
            return False
    
    def click_signin_button(self):
        """Click nút Sign In"""
        try:
            signin_button = self.find_element_safely(By.XPATH, 
                "//button[contains(text(), 'Sign In')]")
            if signin_button:
                signin_button.click()
                return True
            return False
        except Exception as e:
            print(f"Lỗi khi click Sign In: {e}")
            return False
    
    def check_validation_errors(self):
        """Kiểm tra lỗi validation"""
        errors = {
            'email_error': False,
            'password_error': False,
            'login_error': False
        }
        
        try:
            # Kiểm tra lỗi email
            email_error = self.driver.find_elements(By.XPATH, 
                "//p[contains(@class, 'text-red-500') and contains(text(), 'Email')]")
            if email_error:
                errors['email_error'] = True
            
            # Kiểm tra lỗi password
            password_error = self.driver.find_elements(By.XPATH, 
                "//p[contains(@class, 'text-red-500') and contains(text(), 'Password')]")
            if password_error:
                errors['password_error'] = True
            
            # Kiểm tra lỗi đăng nhập
            login_error = self.driver.find_elements(By.XPATH, 
                "//p[contains(@class, 'text-red-500') and contains(text(), 'Sai tài khoản')]")
            if login_error:
                errors['login_error'] = True
                
        except Exception as e:
            print(f"Lỗi khi kiểm tra validation: {e}")
        
        return errors
    
    def check_successful_login(self):
        """Kiểm tra đăng nhập thành công"""
        try:
            # Đợi redirect hoặc thay đổi URL
            self.wait.until(lambda driver: driver.current_url != self.generator.login_url)
            
            # Kiểm tra URL đích
            if self.driver.current_url == self.generator.base_url + "/":
                return True
            
            # Kiểm tra localStorage có access token
            access_token = self.driver.execute_script("return localStorage.getItem('accessToken');")
            return access_token is not None
            
        except TimeoutException:
            return False
        except Exception as e:
            print(f"Lỗi khi kiểm tra đăng nhập thành công: {e}")
            return False
    
    def run_test_case(self, test_case):
        """Chạy một test case cụ thể"""
        try:
            # Điền form
            if not self.fill_login_form(test_case['email'], test_case['password']):
                return False, "Không thể điền form"
            
            # Click sign in
            if not self.click_signin_button():
                return False, "Không thể click Sign In"
            
            # Đợi phản hồi
            time.sleep(3)
            
            # Kiểm tra kết quả dựa trên expected_result
            expected = test_case['expected_result']
            
            if expected == 'success':
                if self.check_successful_login():
                    return True, "Đăng nhập thành công"
                else:
                    return False, "Không đăng nhập được"
            
            else:
                # Kiểm tra các loại lỗi
                errors = self.check_validation_errors()
                
                if expected == 'email_error' and errors['email_error']:
                    return True, "Hiển thị lỗi email đúng"
                elif expected == 'password_error' and errors['password_error']:
                    return True, "Hiển thị lỗi password đúng"
                elif expected == 'login_error' and errors['login_error']:
                    return True, "Hiển thị lỗi đăng nhập đúng"
                elif expected == 'both_error' and errors['email_error'] and errors['password_error']:
                    return True, "Hiển thị cả hai lỗi đúng"
                else:
                    return False, f"Kết quả không như mong đợi. Errors: {errors}"
            
        except Exception as e:
            return False, f"Exception: {str(e)}"

# Tạo dynamic test methods
def create_test_method(test_case):
    """Tạo method test động cho mỗi test case"""
    def test_method(self):
        print(f"\n--- Chạy {test_case['name']} ---")
        print(f"Mô tả: {test_case['description']}")
        print(f"Email: {test_case['email']}")
        print(f"Password: {'*' * len(test_case['password']) if test_case['password'] else 'Empty'}")
        
        success, message = self.run_test_case(test_case)
        
        # Lưu kết quả
        result = {
            'test_name': test_case['name'],
            'description': test_case['description'],
            'success': success,
            'message': message,
            'email': test_case['email'],
            'expected': test_case['expected_result']
        }
        self.__class__.test_results.append(result)
        
        print(f"Kết quả: {'PASS' if success else 'FAIL'} - {message}")
        
        # Assert để unittest báo lỗi nếu fail
        self.assertTrue(success, f"{test_case['description']} - {message}")
    
    return test_method

# Tự động thêm các test methods vào class
def add_generated_tests():
    """Thêm các test methods được generate vào class"""
    generator = LoginTestGenerator()
    test_cases = generator.generate_test_cases()
    
    for test_case in test_cases:
        test_method = create_test_method(test_case)
        test_method.__name__ = test_case['name']
        setattr(TruyenVerseLoginTest, test_case['name'], test_method)

# Thêm tests vào class
add_generated_tests()

class TestReporter:
    """Báo cáo kết quả test"""
    
    @staticmethod
    def generate_report(test_results):
        """Tạo báo cáo test"""
        total_tests = len(test_results)
        passed_tests = sum(1 for result in test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        report = {
            'summary': {
                'total': total_tests,
                'passed': passed_tests,
                'failed': failed_tests,
                'pass_rate': f"{(passed_tests/total_tests*100):.2f}%" if total_tests > 0 else "0%"
            },
            'details': test_results
        }
        
        # In báo cáo
        print("\n" + "="*80)
        print("BÁOÁO KẾT QUẢ TEST ĐĂNG NHẬP TRUYENVERSE")
        print("="*80)
        print(f"Tổng số test: {total_tests}")
        print(f"Thành công: {passed_tests}")
        print(f"Thất bại: {failed_tests}")
        print(f"Tỷ lệ thành công: {report['summary']['pass_rate']}")
        print("="*80)
        
        # Chi tiết các test thất bại
        if failed_tests > 0:
            print("\nCHI TIẾT CÁC TEST THẤT BẠI:")
            print("-"*80)
            for result in test_results:
                if not result['success']:
                    print(f"❌ {result['test_name']}")
                    print(f"   Mô tả: {result['description']}")
                    print(f"   Lý do: {result['message']}")
                    print(f"   Email test: {result['email']}")
                    print("-"*80)
        
        # Lưu báo cáo ra file JSON
        with open('login_test_report.json', 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        
        print(f"\nBáo cáo chi tiết đã được lưu vào: login_test_report.json")
        
        return report

if __name__ == '__main__':
    # Chạy tất cả tests
    loader = unittest.TestLoader()
    suite = loader.loadTestsFromTestCase(LoginTestGenerator)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Tạo báo cáo
    reporter = TestReporter()
    if hasattr(LoginTestGenerator, 'test_results'):
        reporter.generate_report(LoginTestGenerator.test_results)
    
    # Exit với mã lỗi nếu có test thất bại
    exit(0 if result.wasSuccessful() else 1)