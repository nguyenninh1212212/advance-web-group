import { api } from ".";

// Request OTP for password reset
export const requestOtp = async (email: string): Promise<void> => {
  try {
    const response = await api.post("/forgot-password/request-otp", null, {
      params: { email },
    });
    console.log(response.data.message); // Log success message
  } catch (error: any) {
    console.error(error.response?.data?.message || "Failed to request OTP");
    throw new Error(error.response?.data?.message || "Failed to request OTP");
  }
};

// Reset password
export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string,
  confirmPassword: string
): Promise<void> => {
  try {
    const response = await api.post("/forgot-password/reset", null, {
      params: { email, otp, newPassword, confirmPassword },
    });
    console.log(response.data.message); // Log success message
  } catch (error: any) {
    console.error(error.response?.data?.message || "Failed to reset password");
    throw new Error(error.response?.data?.message || "Failed to reset password");
  }
};