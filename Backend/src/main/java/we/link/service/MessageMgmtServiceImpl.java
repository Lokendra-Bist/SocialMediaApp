package we.link.service;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import we.link.entity.Conversation;
import we.link.entity.Message;
import we.link.entity.Users;
import we.link.exception.ResourceNotFoundException;
import we.link.mapper.MessageMapper;
import we.link.repository.IConversationRepo;
import we.link.repository.IMessageRepo;
import we.link.repository.IUserRepo;
import we.link.response.MessageResponse;

@Service
@RequiredArgsConstructor
public class MessageMgmtServiceImpl implements IMessageMgmtService {
	
	private final IMessageRepo msgRepo;
	
	private final IUserRepo userRepo;
	
	private final SimpMessagingTemplate messagingTemplate;
	
	private final IConversationRepo conversationRepo;

	@Override
	public void sendMessage(Users sender, Long receiverId, String content) {
		Users receiver = userRepo.findById(receiverId)
						.orElseThrow(() -> new ResourceNotFoundException("Receiver not found!"));
		
		Conversation conversation = conversationRepo.findConversation(sender.getId(), receiver.getId())
										.orElseGet(() -> {
											return conversationRepo.save(
														Conversation.builder()
															.userOne(sender)
															.userTwo(receiver)
															.build()
													);
										});
		
		Message savedMessage = msgRepo.save(
				Message.builder()
					.sender(sender)
					.receiver(receiver)
					.conversation(conversation)
					.content(content)
					.build()
				);
		
		conversation.setLastMessage(savedMessage.getContent());
		conversation.setLastMessageTime(savedMessage.getSentAt());
		conversationRepo.save(conversation);
		
		MessageResponse response = MessageMapper.toResponse(savedMessage);
		
		messagingTemplate.convertAndSendToUser(
									receiver.getEmail(),
									"/topic/messages",
									response
								);
		messagingTemplate.convertAndSendToUser(
							        sender.getEmail(),
							        "/topic/messages",
							        response
								);
	}

	@Override
	public List<MessageResponse> getChatHistory(Users currentUser, Long otherUserId) {
		return msgRepo.getConversation(currentUser.getId(), otherUserId)
						.stream()
						.map(MessageMapper::toResponse)
						.toList();
	}

}
