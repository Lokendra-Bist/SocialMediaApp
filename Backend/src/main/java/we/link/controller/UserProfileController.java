package we.link.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.request.ProfileUploadRequest;
import we.link.response.ApiResponse;
import we.link.response.UserProfileResponse;
import we.link.service.IUserProfileMgmtService;

@RestController
@RequestMapping("/api/user-profile")
@RequiredArgsConstructor
public class UserProfileController {
	
	private final IUserProfileMgmtService userProfileMgmtService;
	
	@PostMapping("/upload-profile")
	public ResponseEntity<ApiResponse<UserProfileResponse>> uploadUserProfile(@Valid @ModelAttribute ProfileUploadRequest request,
									@AuthenticationPrincipal CustomUserDetails userDetails) {
		return ResponseEntity.ok(
					new ApiResponse<>(true, "Profile uploaded successfull!", userProfileMgmtService.uploadProfile(request, userDetails.getUser()))
				);
	}
	
	@GetMapping("/getMyProfile")
	public ResponseEntity<ApiResponse<UserProfileResponse>> getMyProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
		return ResponseEntity.ok(
				new ApiResponse<>(true, "Image Retrieved!", userProfileMgmtService.getUserProfile(userDetails.getUser()))
			);
	}

}
