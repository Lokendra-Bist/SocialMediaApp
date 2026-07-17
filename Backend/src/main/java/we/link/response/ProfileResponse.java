package we.link.response;

public record ProfileResponse(

		Long id,
		
		String name,
		
		String profileImageUrl,
		
		String coverImageUrl,
		
		String bio,
		
		Long followersCount,
		
		Long followingCount
		
) {}
