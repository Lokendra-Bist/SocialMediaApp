package we.link.mapper;

import java.time.LocalDateTime;

import we.link.entity.UserProfile;
import we.link.entity.Users;
import we.link.response.ProfileResponse;
import we.link.response.UserProfileResponse;

public class UserProfileMapper {
	
	public static UserProfile profileUploadToEntity(String imageUrl, Users user) {
		return UserProfile.builder()
					.profileImageUrl(imageUrl)
					.user(user)
					.createdAt(LocalDateTime.now())
					.updatedAt(LocalDateTime.now())
					.build();
	}
	
	public static UserProfileResponse toProfileUploadResponse(UserProfile profile) {
		return new UserProfileResponse(
					profile.getId(),
					profile.getBio(),
					profile.getProfileImageUrl(),
					profile.getCreatedAt(),
					profile.getUpdatedAt()
				);
	}
	
	public static ProfileResponse toProfileResponse(Users user, Long followersCount, Long followingCount) {
		UserProfile profile = user.getUserProfile();
		String bio = (profile != null) ? profile.getBio() : "";
        String profileImageUrl = (profile != null) ? profile.getProfileImageUrl() : null;
        String coverImageUrl = (profile != null) ? profile.getCoverImageUrl() : null;
        
		return new ProfileResponse(
					user.getId(),
					user.getFirstName() + " " + user.getLastName(),
					profileImageUrl,
					coverImageUrl,
					bio,
					followersCount,
					followingCount
				);
	}

}
