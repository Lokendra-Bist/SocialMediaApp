package we.link.service;

import java.util.List;

import we.link.entity.Users;
import we.link.response.ConversationResponse;

public interface IConversationMgmtService {
	
	List<ConversationResponse> getMyConversations(Users currentUser);

}
