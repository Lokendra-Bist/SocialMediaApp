package we.link.mapper;

import we.link.entity.Role;
import we.link.entity.Users;
import we.link.request.VerifyOtpRequest;
import we.link.response.UserResponse;
import we.link.response.UserSearchResponse;

public class UserMapper {
		
	public static Users toEntity(VerifyOtpRequest request, String password) {
		return Users.builder()
				.firstName(request.firstName())
				.lastName(request.lastName())
				.dob(request.dob())
				.gender(request.gender())
				.email(request.email())
				.password(password)
				.role(Role.ROLE_USER)
				.build();
	}
	
	public static UserResponse toResponse(Users user) {
		return new UserResponse(
					user.getId(),
					user.getFirstName(),
					user.getLastName(),
					user.getDob(),
					user.getGender(),
					user.getEmail(),
					user.getRole().name()
				);
	}
	
	public static UserSearchResponse toUserSearchResponse(Users user) {
		return new UserSearchResponse(
					user.getId(),
					user.getFirstName() + " " + user.getLastName(),
					user.getUserProfile().getProfileImageUrl()
				);
	}

}
