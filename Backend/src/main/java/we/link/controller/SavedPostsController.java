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
import we.link.response.SavedPostsResponse;
import we.link.service.ISavedPostsMgmtService;

@RestController
@RequestMapping("/api/saved_posts")
@RequiredArgsConstructor
public class SavedPostsController {
	
	private final ISavedPostsMgmtService savedPostService;
	
	@PostMapping("/save-post/{postId}")
	public ResponseEntity<ApiResponse<SavedPostsResponse>> savedPosts(@PathVariable Long postId,
									@AuthenticationPrincipal CustomUserDetails details) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"Post Saved To SavedPosts",
								savedPostService.savePosts(postId, details.getUser())
							)
				);
	}

}
