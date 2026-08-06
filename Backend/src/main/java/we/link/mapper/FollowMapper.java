package we.link.mapper;

import we.link.entity.Follow;
import we.link.entity.Users;
import we.link.response.FollowResponse;
import we.link.response.FollowUserResponse;

public class FollowMapper {
	
	public static Follow toEntity(Users sender, Users receiver) {
		return Follow.builder()
				.follower(sender)
				.following(receiver)
				.build();
	}
	
	public static FollowResponse toFollowResponse(boolean following ,boolean followBack, Long followerCount, Long followingCount) {
		return new FollowResponse(
					following,
					followBack,
					followerCount,
					followingCount
				);
	}
	
	public static FollowUserResponse toFollowUserResponse(Users user, boolean following) {
		String imageUrl = user.getUserProfile() != null
	            ? user.getUserProfile().getProfileImageUrl()
	            : null;

	    return new FollowUserResponse(
	            user.getId(),
	            user.getFirstName(),
	            user.getLastName(),
	            imageUrl,
	            following
	    );
	}

}
