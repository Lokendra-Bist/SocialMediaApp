package we.link.response;

import java.time.LocalDateTime;

import we.link.entity.NotificationType;

public record NotificationResponse(

		Long id,
		
		Long senderId,
		
		String senderName,
		
		String senderProfileUrl,
		
		Long postId,
		
		NotificationType type,
		
		Boolean isRead,
		
		LocalDateTime createdAt
		
) {}
