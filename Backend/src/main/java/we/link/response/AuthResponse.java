package we.link.response;

import we.link.entity.Users;

public record AuthResponse(

		String token,
		
		Users user
		
) {}
