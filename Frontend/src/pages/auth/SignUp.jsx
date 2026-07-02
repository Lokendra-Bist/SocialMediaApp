import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSignUp } from "../../hooks/useSignUp";
import { OtpModal } from "../../components/auth/OtpModal";

export const SignUp = () => {
  const {
    formData,
    errors,
    showPassword,
    otpModalOpen,
    sendingOtp,
    setShowPassword,
    handleChange,
    handleSubmit,
    handleSetOtp,
    handleVerifyOtpAndRegister,
    sendOtpRequest,
    handleCloseModal,
  } = useSignUp();

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        <p className="text-center text-gray-500 mt-2 mb-8">
          Join our community today
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full rounded-xl px-4 py-3 border ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="font-medium block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full rounded-xl px-4 py-3 border ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="font-medium block mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              max={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${errors.dob ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>

          <div>
            <label className="font-medium block mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${errors.gender ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="font-medium block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"}`}
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
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-xl px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
            Create Account
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?
          <Link to="/signin" className="ml-2 text-blue-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>

      <OtpModal
        open={otpModalOpen}
        loading={sendingOtp}
        otp={formData.otp}
        setOtp={handleSetOtp}
        onVerify={handleVerifyOtpAndRegister}
        onResend={sendOtpRequest}
        onClose={handleCloseModal}
      />
    </>
  );
};
