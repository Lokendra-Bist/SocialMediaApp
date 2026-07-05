package we.link.mapper;

import java.time.LocalDateTime;

import we.link.entity.UserProfile;
import we.link.entity.Users;
import we.link.request.ProfileUploadRequest;
import we.link.response.UserProfileResponse;

public class UserProfileMapper {
	
	public static UserProfile profileUploadToEntity(ProfileUploadRequest request, String imageUrl, Users user) {
		return UserProfile.builder()
					.profileImageUrl(imageUrl)
					.bio(request.bio())
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

}
