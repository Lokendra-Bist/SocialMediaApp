package we.link.response;

import java.time.LocalDate;

public record UserResponse(

		Long id,
		
		String firstName,
		
		String lastName,
		
		LocalDate dob,
		
		String gender,
		
		String email,
		
		String role
		
) {}
