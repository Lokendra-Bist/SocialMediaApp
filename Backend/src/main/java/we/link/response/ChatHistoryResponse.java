package we.link.response;

import java.util.List;

public record ChatHistoryResponse(
	
	Long messageId,
	
	String receiverName,
	
	String receiverProfileImageUrl,
	
	List<MessageResponse> messages
		
) {}
