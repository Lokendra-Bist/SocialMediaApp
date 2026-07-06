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
import we.link.response.LikesResponse;
import we.link.service.ILikesMgmtService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikesController {
	
	private final ILikesMgmtService likesService;
	
	@PostMapping("/toggle-like/{id}")
	public ResponseEntity<ApiResponse<LikesResponse>> onToggle(@PathVariable Long id,
											@AuthenticationPrincipal CustomUserDetails details) {
		return ResponseEntity.ok(
					new ApiResponse<>(true, "Likes Toggles", likesService.onLike(details.getUser(), id))
				);
	}

}
