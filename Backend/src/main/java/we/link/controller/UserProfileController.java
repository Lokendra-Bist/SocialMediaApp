package we.link.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.response.ApiResponse;
import we.link.response.ProfileResponse;
import we.link.response.UserProfileResponse;
import we.link.service.IUserProfileMgmtService;


@RestController
@RequestMapping("/api/user-profile")
@RequiredArgsConstructor
public class UserProfileController {
	
	private final IUserProfileMgmtService userProfileMgmtService;
	
	@PostMapping("/upload-profile")
	public ResponseEntity<ApiResponse<UserProfileResponse>> uploadUserProfile(@RequestParam MultipartFile file,
									@AuthenticationPrincipal CustomUserDetails userDetails) {
		return ResponseEntity.ok(
					new ApiResponse<>(true, "Profile uploaded successfull!", userProfileMgmtService.uploadProfile(file, userDetails.getUser()))
				);
	}
	
	@GetMapping("/getMyProfile")
	public ResponseEntity<ApiResponse<UserProfileResponse>> getMyProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
		return ResponseEntity.ok(
				new ApiResponse<>(true, "Image Retrieved!", userProfileMgmtService.getUserProfile(userDetails.getUser()))
			);
	}
	
	@GetMapping("/myProfile")
	public ResponseEntity<ApiResponse<ProfileResponse>> getLoggedinUserProfile(@AuthenticationPrincipal CustomUserDetails details) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"Profile Fetched",
								userProfileMgmtService.getMyProfile(details.getUser())
							)
				);
	}
	
	@PostMapping("/upload-cover")
	public ResponseEntity<ApiResponse<UserProfileResponse>> uploadCover(@RequestParam MultipartFile file,
								@AuthenticationPrincipal CustomUserDetails details) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"Photo Uploaded Successfully!",
								userProfileMgmtService.uploadCoverPhoto(file, details.getUser())
							)
				);
	}

}
