package we.link.response;

import we.link.entity.Users;

public record PostCreateResponse(

		String content,
		
		String imageUrl,
		
		Users user
		
) {}
