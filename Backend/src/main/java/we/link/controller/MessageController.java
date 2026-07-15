package we.link.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.request.MessageRequest;
import we.link.response.ApiResponse;
import we.link.response.MessageResponse;
import we.link.service.IMessageMgmtService;

@RestController
@RequestMapping("/api/message")
@RequiredArgsConstructor
public class MessageController {
	
	private final IMessageMgmtService msgService;
	
	@PostMapping("/send")
	public ResponseEntity<ApiResponse<Void>> sendMessage(@AuthenticationPrincipal CustomUserDetails details,
															@RequestBody MessageRequest request) {
		msgService.sendMessage(details.getUser(), request.receiverId(), request.content());
		return ResponseEntity.ok(
					new ApiResponse<>(
							true,
							"Message Sent",
							null
					)
				);
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<ApiResponse<List<MessageResponse>>> getConversationHistory(@AuthenticationPrincipal CustomUserDetails details,
									@PathVariable Long userId) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"Chat History Fetched!",
								msgService.getChatHistory(details.getUser(), userId)
							)
				);
	}

}
