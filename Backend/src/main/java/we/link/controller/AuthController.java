package we.link.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import we.link.request.LoginRequest;
import we.link.request.OtpSendRequest;
import we.link.request.VerifyOtpRequest;
import we.link.response.ApiResponse;
import we.link.response.AuthResponse;
import we.link.service.IAuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	
	private final IAuthService authService;
	
	@PostMapping("/sent-otp")
	public ResponseEntity<ApiResponse<Void>> sendOtp(@Valid @RequestBody OtpSendRequest request) {
		authService.sendOtp(request);
		return ResponseEntity.ok(
				new ApiResponse<>(
					true, "OTP send ucessfully to your email!", null
				)
			);
	}
	
	@PostMapping("/verifyOtpAndRegister")
	public ResponseEntity<ApiResponse<AuthResponse>> verifyOtpAndRegisterUser(@Valid @RequestBody VerifyOtpRequest request) {
		return ResponseEntity.ok(
					new ApiResponse<>(
						true, "User Registered Sucessfully!", authService.verifyOtpAndRegister(request)
					)
				);
	}
	
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
		System.out.println("Login Method");
		return ResponseEntity.ok(
					new ApiResponse<>(
							true, "User LoggedIn Successfully!", authService.login(request)							)
				);
	}
	
}
