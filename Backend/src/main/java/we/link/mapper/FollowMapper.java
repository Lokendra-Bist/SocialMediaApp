package we.link.mapper;

import we.link.entity.Follow;
import we.link.entity.Users;
import we.link.response.FollowResponse;

public class FollowMapper {
	
	public static Follow toEntity(Users sender, Users receiver) {
		return Follow.builder()
				.follower(sender)
				.following(receiver)
				.build();
	}
	
	public static FollowResponse toFollowResponse(boolean followBack, Long followerCount, Long followingCount) {
		return new FollowResponse(
					true,
					followBack,
					followerCount,
					followingCount
				);
	}

}
