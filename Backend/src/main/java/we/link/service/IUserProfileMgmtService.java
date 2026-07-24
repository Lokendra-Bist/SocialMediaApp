package we.link.service;

import org.springframework.web.multipart.MultipartFile;

import we.link.entity.Users;
import we.link.response.ProfileResponse;
import we.link.response.UserProfileResponse;

public interface IUserProfileMgmtService {
	
	UserProfileResponse uploadProfile(MultipartFile image, Users user);
	
	UserProfileResponse getUserProfile(Users user);
	
	ProfileResponse getMyProfile(Users user);
	
	UserProfileResponse uploadCoverPhoto(MultipartFile image,  Users user);

}
