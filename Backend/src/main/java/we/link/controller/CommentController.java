package we.link.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.request.CommentRequest;
import we.link.response.ApiResponse;
import we.link.response.CommentResponse;
import we.link.service.ICommentsMgmtService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {
	
	private final ICommentsMgmtService commentService;
	
	@PostMapping("/{postId}")
	public ResponseEntity<ApiResponse<CommentResponse>> addComment(
									@AuthenticationPrincipal CustomUserDetails details,
									@Valid CommentRequest request,
									@PathVariable Long postId) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"Notification Sent",
								commentService.addComment(details.getUser(), postId, request)
							)
				);
	}
	
	@GetMapping("/get-comments/{postId}")
	public ResponseEntity<ApiResponse<List<CommentResponse>>> fetchComments(@PathVariable Long postId) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"Comments Fetched",
								commentService.getCommentByPost(postId)
							)
				);
	}

}
