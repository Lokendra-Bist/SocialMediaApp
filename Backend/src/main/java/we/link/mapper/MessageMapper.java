package we.link.mapper;

import we.link.entity.Message;
import we.link.response.MessageResponse;

public class MessageMapper {
	
	public static MessageResponse toResponse(Message msg) {
		return new MessageResponse(
					msg.getId(),
					msg.getSender().getId(),
					msg.getSender().getFirstName() + " " +
							msg.getSender().getLastName(),
					msg.getSender().getUserProfile().getProfileImageUrl(),
					msg.getReceiver().getId(),
					msg.getContent(),
					msg.getSentAt()
				);
	}

}
