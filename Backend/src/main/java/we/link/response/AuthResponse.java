package we.link.response;

public record AuthResponse(

		String token,
		
		UserResponse user
		
) {}
