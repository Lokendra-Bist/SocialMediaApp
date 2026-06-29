package we.link.mapper;

import we.link.entity.Role;
import we.link.entity.Users;
import we.link.request.VerifyOtpRequest;

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

}
