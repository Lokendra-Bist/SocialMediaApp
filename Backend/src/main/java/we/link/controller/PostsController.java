package we.link.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.request.PostCreateRequest;
import we.link.response.ApiResponse;
import we.link.response.PostCreateResponse;
import we.link.response.PostResponse;
import we.link.service.IPostsMgmtService;


@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostsController {
	
	private final IPostsMgmtService postService;
	
	@PostMapping(value = "/create-post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ApiResponse<PostCreateResponse>> createPost(@Valid @ModelAttribute PostCreateRequest request,
															@AuthenticationPrincipal CustomUserDetails userDetails
														) {
		return ResponseEntity.ok(
				new ApiResponse<>(
					true, "Image Uploaded Seccessfully!", postService.createPost(request, userDetails.getUser())
				)
			);
	}
	
	@GetMapping("/get-all-posts")
	public ResponseEntity<ApiResponse<Page<PostResponse>>> getAllPosts(
														@RequestParam(defaultValue = "0") int page,
														@RequestParam(defaultValue = "10") int size,
														@AuthenticationPrincipal CustomUserDetails details
													) {
		return ResponseEntity.ok(
					new ApiResponse<>(
							true, "Post Fetched!", postService.getAllPosts(page, size, details.getUser())
						)
				);
	}
	
	@GetMapping("/get-my-posts")
	public ResponseEntity<ApiResponse<Page<PostResponse>>> getMyPosts(
									@RequestParam(defaultValue = "0") int page,
									@RequestParam(defaultValue = "5") int size,
									@AuthenticationPrincipal CustomUserDetails details
							) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"Post Fetched!",
								postService.getMyPosts(page, size, details.getUser())
							)
				);
	}

}
