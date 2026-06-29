package we.link.request;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

public record VerifyOtpRequest(

		@NotBlank(message = "Firstname is required")
	    @Size(min = 3, max = 15, message = "First name cannot exceed 15 characters")
	    String firstName,
	    
	    @NotBlank(message = "Lastname is required")
	    @Size(min = 3, max = 15, message = "Last name cannot exceed 15 characters")
	    String lastName,
	    
	    @NotNull(message = "Date of birth is required")
	    @Past(message = "Date of birth must be in the past")
	    LocalDate dob,
	    
	    @NotBlank(message = "Gender is required")
	    String gender,

	    @NotBlank(message = "Email is required")
	    @Email(message = "Please provide a valid email address")
	    String email,

	    @NotBlank(message = "Password is required")
	    @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
	    String password,
	    
	    @NotBlank(message = "Otp is required")
	    String otp
		
) {}
