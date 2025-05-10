import { api } from "./index";

// ✅ Gửi email bằng `params`
export const requestOtp = async (email: string): Promise<void> => {
  try {
    const response = await api.post(
      "/users/forgot-password/request-otp",
      null,
      {
        params: { email }, // ✅ Đúng kiểu `@RequestParam`
      }
    );

    if (response.status === 200) {
      console.log("OTP sent successfully:", response.data.message);
      alert(response.data.message);
    } else {
      throw new Error(response.data?.message || "Failed to request OTP");
    }
  } catch {
    console.error("Error:", "Unknown error occurred.");
  }
};

// ✅ API kiểm tra OTP hợp lệ
export const validateOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  try {
    const response = await api.post("/users/forgot-password/validate", null, {
      params: { email, otp }, // ✅ Gửi đúng `@RequestParam`
    });
    console.log("OTP Validation:", response.data);
    return response.data === "OTP is valid!";
  } catch {
    console.error("Error validating OTP:");
    return false;
  }
};

// ✅ Đặt lại mật khẩu
export const resetPassword = async (
  email: string,
  newPassword: string,
  confirmPassword: string
): Promise<void> => {
  try {
    const response = await api.post("/users/forgot-password/reset", null, {
      params: { email, newPassword, confirmPassword }, // ✅ Xóa `otp`, phù hợp backend
    });

    alert(response.data.message);
  } catch {
    console.error("Failed to reset password");
  }
};
