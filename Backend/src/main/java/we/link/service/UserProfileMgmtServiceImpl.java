package we.link.service;


import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import we.link.entity.UserProfile;
import we.link.entity.Users;
import we.link.exception.ResourceNotFoundException;
import we.link.mapper.UserProfileMapper;
import we.link.repository.IFollowRepo;
import we.link.repository.IUserProfileRepo;
import we.link.repository.IUserRepo;
import we.link.response.ProfileResponse;
import we.link.response.UserProfileResponse;

@Service
@RequiredArgsConstructor
public class UserProfileMgmtServiceImpl implements IUserProfileMgmtService {
	
	private final IUserProfileRepo profileRepo;
	
	private final ICloudinaryImageStorageService cloudinaryImageStorageService;
	
	private final IUserRepo userRepo;
	
	private final IFollowRepo followRepo;

	@Override
	public UserProfileResponse uploadProfile(MultipartFile image, Users user) {
		String uploadedImageUrl = cloudinaryImageStorageService.uploadImage(image);
		
		UserProfile profile = profileRepo.findByUserId(user.getId())
		        .orElseGet(() -> {
		            UserProfile p = new UserProfile();
		            p.setUser(user);
		            p.setCreatedAt(LocalDateTime.now());
		            return p;
		        });

		profile.setProfileImageUrl(uploadedImageUrl);
		profile.setUpdatedAt(LocalDateTime.now());

		profileRepo.save(profile);

		return UserProfileMapper.toProfileUploadResponse(profile);
	}

	@Override
	public UserProfileResponse getUserProfile(Users user) {
		Users users = userRepo.findById(user.getId())
								.orElseThrow(() -> new ResourceNotFoundException("User not found!"));
		
		UserProfile userProfile = profileRepo.findByUserId(users.getId())
										.orElseThrow(() -> new ResourceNotFoundException("User profile not found!"));
		
		return UserProfileMapper.toProfileUploadResponse(userProfile);
	}

	@Override
	public ProfileResponse getMyProfile(Users user) {
		Users currentUser = userRepo.findByEmail(user.getEmail())
								.orElseThrow(() -> new ResourceNotFoundException("User Not Found!"));
		
		long followersCount = followRepo.countByFollower_Id(user.getId());
		long followingCount = followRepo.countByFollowing_Id(user.getId());
		
		return UserProfileMapper.toProfileResponse(currentUser, followersCount, followingCount);
	}

}
