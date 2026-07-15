package we.link.response;

import java.time.LocalDateTime;

public record ConversationResponse(

		Long id,

		String name,

		String profileImageUrl,

		String lastMessage,

		LocalDateTime lastMessageTime

) {
}
