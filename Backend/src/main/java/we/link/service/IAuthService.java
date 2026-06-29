package we.link.service;

import we.link.request.LoginRequest;
import we.link.request.OtpSendRequest;
import we.link.request.VerifyOtpRequest;
import we.link.response.AuthResponse;

public interface IAuthService {
	
	void sendOtp(OtpSendRequest request);
	
	AuthResponse verifyOtpAndRegister(VerifyOtpRequest request);
	
	AuthResponse login(LoginRequest request);
	
}
