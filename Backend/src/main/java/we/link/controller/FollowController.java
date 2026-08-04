package we.link.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.response.ApiResponse;
import we.link.response.FollowResponse;
import we.link.service.IFollowMgmtService;

@RestController
@RequestMapping("api/follow")
@RequiredArgsConstructor
public class FollowController {
	
	private final IFollowMgmtService followMgmtService;
	
	@PostMapping("/add-follow/{receiverId}")
	public ResponseEntity<ApiResponse<FollowResponse>> addFollow(@PathVariable Long receiverId,
									@AuthenticationPrincipal CustomUserDetails details
								) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"User Followed",
								followMgmtService.addFollow(receiverId, details.getUser())
							)
				);
	}

}
