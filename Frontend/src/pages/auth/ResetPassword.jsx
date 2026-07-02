import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useResetPassword } from "../../hooks/useResetPassword";

export const ResetPassword = () => {
  const {
    formData,
    loading,
    errors,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
  } = useResetPassword();

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl bg-white border border-gray-200 shadow-xl p-8">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <FaLock className="text-2xl text-blue-600" />
          </div>
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Reset Password
        </h2>
        <p className="mt-3 text-center text-gray-500">
          Create a strong password for your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block mb-2 font-medium">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                /* 🔴 Added dynamic border-red-500 class if an error exists */
                className={`w-full rounded-xl border px-4 py-3 pr-12 outline-none focus:border-blue-600 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* 🔴 Display error message conditionally */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full rounded-xl border px-4 py-3 pr-12 outline-none focus:border-blue-600 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/signin" className="text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
