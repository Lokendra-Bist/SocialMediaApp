import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignIn } from "../../hooks/useSignIn";

export const SignIn = () => {
  const {
    formData,
    errors,
    showPassword,
    isLoading,
    handleChange,
    handleSubmit,
    togglePassword,
  } = useSignIn();

  return (
    <div>
      <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
      <p className="text-center text-gray-500 mt-2 mb-8">Login to continue</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-medium block mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-600 ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="font-medium block mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-600 ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
            />

            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          <div className="flex justify-end mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold disabled:opacity-50 transition-colors"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="text-center mt-6">
        Don't have an account?
        <Link
          to="/signup"
          className="ml-2 text-blue-600 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};
