package we.link.response;

import java.time.LocalDateTime;

public record MessageResponse(

		Long id,
		
		Long senderId,
		
		String senderName,
		
		String senderProfileUrl,
		
		Long receiverId,
		
		String content,
		
		LocalDateTime sentAt
		
) {}
