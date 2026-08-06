package we.link.response;

public record FollowUserResponse(

		Long id,
		
		String firstName,
		
		String lastName,
		
		String profileImageUrl,
		
		boolean following
		
) {}
