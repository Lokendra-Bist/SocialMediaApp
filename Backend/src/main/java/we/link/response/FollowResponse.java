package we.link.response;

public record FollowResponse(

		boolean following,
		
		boolean followBack,
		
		Long followersCount,
		
		Long followingCount
		
) {}
