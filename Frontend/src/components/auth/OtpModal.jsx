import { useEffect, useRef, useState } from "react";

export const OtpModal = ({
  open,
  loading,
  otp,
  setOtp,
  onVerify,
  onResend,
  onClose,
}) => {
  const [timer, setTimer] = useState(30);

  const inputs = useRef([]);

  useEffect(() => {
    if (!open || loading) return;

    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open, loading]);

  if (!open) return null;

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const otpArray = otp.split("");

    otpArray[index] = value;

    const newOtp = otpArray.join("");

    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8">
        {loading ? (
          <>
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
            </div>

            <h2 className="text-2xl font-bold text-center mt-6">Sending OTP</h2>

            <p className="text-gray-500 text-center mt-3">
              Please wait while we send a verification code to your email.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center">Verify Email</h2>

            <p className="text-center text-gray-500 mt-3">
              Enter the 6-digit verification code.
            </p>

            <div className="flex justify-center gap-3 mt-8">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  value={otp[index] || ""}
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 border-2 rounded-xl text-center text-xl font-bold focus:border-blue-600 outline-none"
                />
              ))}
            </div>

            <button
              disabled={otp.length !== 6}
              onClick={onVerify}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition"
            >
              Verify OTP
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-500">Didn't receive the code?</p>

              {timer > 0 ? (
                <p className="font-semibold mt-2">
                  Resend in {String(timer).padStart(2, "0")}s
                </p>
              ) : (
                <button
                  onClick={onResend}
                  className="mt-2 text-blue-600 font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-full mt-6 text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};
