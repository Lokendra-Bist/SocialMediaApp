package we.link.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record VerifyOtpResetPasswordRequest(
		@NotBlank(message = "Email is required")
	    @Email(message = "Please provide a valid email address")
		String email,
		
		@NotBlank(message = "Otp is required")
		String otp
		
) {}
