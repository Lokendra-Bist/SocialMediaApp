package we.link.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import we.link.entity.Conversation;
import we.link.entity.Users;
import we.link.repository.IConversationRepo;
import we.link.response.ConversationResponse;

@Service
@RequiredArgsConstructor
public class ConversationMgmtServiceImpl implements IConversationMgmtService {
	
	private final IConversationRepo conversationRepo;

	@Override
	public List<ConversationResponse> getMyConversations(Users currentUser) {
		List<Conversation> conversations = conversationRepo.findByUserOneOrUserTwoOrderByLastMessageTimeDesc(currentUser, currentUser);
		
		return conversations.stream()
						.map(conv -> {
							Users otherUser = conv.getUserOne().getId().equals(currentUser.getId())
									? conv.getUserTwo() : conv.getUserOne();
							
							return new ConversationResponse(
										otherUser.getId(),
										otherUser.getFirstName() + " " + otherUser.getLastName(),
										otherUser.getUserProfile().getProfileImageUrl(),
										conv.getLastMessage(),
										conv.getLastMessageTime()
									);
						})
						.toList();
	}

}
