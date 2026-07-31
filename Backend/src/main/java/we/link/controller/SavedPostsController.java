package we.link.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.response.ApiResponse;
import we.link.response.PostResponse;
import we.link.response.SavePostResponse;
import we.link.service.ISavedPostsMgmtService;

@RestController
@RequestMapping("/api/saved_posts")
@RequiredArgsConstructor
public class SavedPostsController {
	
	private final ISavedPostsMgmtService savedPostService;
	
	@PostMapping("/save-post/{postId}")
	public ResponseEntity<ApiResponse<SavePostResponse>> savedPosts(@PathVariable Long postId,
									@AuthenticationPrincipal CustomUserDetails details) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"Post Saved To SavedPosts",
								savedPostService.savePosts(postId, details.getUser())
							)
				);
	}
	
	@GetMapping("/get-saved-posts")
	public ResponseEntity<ApiResponse<Page<PostResponse>>> getSavedPosts(
				@AuthenticationPrincipal CustomUserDetails details,
				@PageableDefault(
							page = 0, size = 5, sort = "createdAt", direction = Sort.Direction.DESC
						)
				Pageable pageable
			) {
		return ResponseEntity.ok(
				new ApiResponse<>(
							true,
							"Fetched SavedPosts",
							savedPostService.getSavedPosts(details.getUser(), pageable)
						)
			);
	}

}
