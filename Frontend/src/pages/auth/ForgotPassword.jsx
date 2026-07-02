import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { OtpModal } from "../../components/auth/OtpModal";
import { useForgotPassword } from "../../hooks/useForgotPassword";

export const ForgotPassword = () => {
  const {
    formData,
    errors,
    otpModalOpen,
    sendingOtp,
    handleChange,
    handleSetOtp,
    handleSubmit,
    handleVerify,
    sendOtpRequest,
    handleCloseModal,
  } = useForgotPassword();

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <HiOutlineMail className="text-3xl text-blue-600" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-500 mt-3 mb-8 leading-relaxed">
          No worries! Enter your registered email address and we'll send you a
          verification code to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-xl border pl-12 pr-4 py-3.5 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={sendingOtp}
            className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
          >
            {sendingOtp ? "Sending..." : "Send Verification Code"}
          </button>
        </form>

        <div className="mt-8 flex justify-center">
          <Link
            to="/signin"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>

      <OtpModal
        open={otpModalOpen}
        loading={sendingOtp}
        otp={formData.otp}
        setOtp={handleSetOtp}
        onVerify={handleVerify}
        onResend={() => sendOtpRequest(formData.email)}
        onClose={handleCloseModal}
      />
    </div>
  );
};
