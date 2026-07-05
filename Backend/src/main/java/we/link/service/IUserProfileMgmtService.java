package we.link.service;

import we.link.entity.Users;
import we.link.request.ProfileUploadRequest;
import we.link.response.UserProfileResponse;

public interface IUserProfileMgmtService {
	
	UserProfileResponse uploadProfile(ProfileUploadRequest request, Users user);
	
	UserProfileResponse getUserProfile(Users user);

}
