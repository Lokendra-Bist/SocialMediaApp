package we.link.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.response.ApiResponse;
import we.link.response.FollowResponse;
import we.link.response.FollowUserResponse;
import we.link.service.IFollowMgmtService;

@RestController
@RequestMapping("api/follow")
@RequiredArgsConstructor
public class FollowController {
	
	private final IFollowMgmtService followMgmtService;
	
	@PostMapping("/add-follow/{userId}")
	public ResponseEntity<ApiResponse<FollowResponse>> addFollow(@PathVariable Long userId,
									@AuthenticationPrincipal CustomUserDetails details
								) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"User Followed",
								followMgmtService.addFollow(userId, details.getUser())
							)
				);
	}
	
	@DeleteMapping("unfollow/{userId}")
	public ResponseEntity<ApiResponse<FollowResponse>> unFollow(@PathVariable Long userId,
							@AuthenticationPrincipal CustomUserDetails details) {
		return ResponseEntity.ok(
				new ApiResponse<>(
							true,
							"User UnFollowed",
							followMgmtService.unFollow(userId, details.getUser())
						)
			);
	}
	
	@GetMapping("/get-follower")
	public ResponseEntity<ApiResponse<Page<FollowUserResponse>>> getFollowers(@PageableDefault(size = 5) Pageable pageable,
										@AuthenticationPrincipal CustomUserDetails details) {
		return ResponseEntity.ok(
			new ApiResponse<>(
						true,
						"Follower Data",
						followMgmtService.getFollowers(details.getUser(), pageable)
					)
			);
	}
	
	@GetMapping("/get-following")
	public ResponseEntity<ApiResponse<Page<FollowUserResponse>>> getFollowings(@PageableDefault(size = 5) Pageable pageable,
										@AuthenticationPrincipal CustomUserDetails details) {
		return ResponseEntity.ok(
			new ApiResponse<>(
						true,
						"Follower Data",
						followMgmtService.getFollowings(details.getUser(), pageable)
					)
			);
	}

}
