package we.link.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.response.ApiResponse;
import we.link.response.ConversationResponse;
import we.link.service.IConversationMgmtService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/conversation")
public class ConversationController {
	
	private final IConversationMgmtService conversationService;
	
	@GetMapping("/conversations")
	public ResponseEntity<ApiResponse<List<ConversationResponse>>> getConversations(
						@AuthenticationPrincipal CustomUserDetails details) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"Conversation Fetched!",
								conversationService.getMyConversations(details.getUser())
							)
				);
	}

}
