package we.link.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.request.PostCreateRequest;
import we.link.response.ApiResponse;
import we.link.response.PostCreateResponse;
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

}
