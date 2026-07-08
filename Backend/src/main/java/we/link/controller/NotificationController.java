package we.link.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.response.ApiResponse;
import we.link.service.INotificationMgmtService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {
	
	private final INotificationMgmtService notificationService;
	
	@GetMapping
    public ResponseEntity<?> getNotifications(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(
	                new ApiResponse<>(
	                        true,
	                        "Notifications fetched successfully",
	                        notificationService.getMyNotifications(userDetails.getUser())
	                )
        		);
    }

    @GetMapping("/unread-count")
    public ResponseEntity<?> unreadCount(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(
	                new ApiResponse<>(
	                        true,
	                        "Unread count",
	                        notificationService.getUnreadCount(userDetails.getUser())
	                )
        		);
    }

    @PutMapping("/read-all")
    public ResponseEntity<?> markAllRead(@AuthenticationPrincipal CustomUserDetails userDetails) {
        notificationService.markAllAsRead(userDetails.getUser());

        return ResponseEntity.ok(
	                new ApiResponse<>(
	                        true,
	                        "All notifications marked as read",
	                        null
	                )
        		);
    }

}
