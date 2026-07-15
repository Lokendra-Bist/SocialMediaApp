package we.link.service;

import java.util.List;

import we.link.entity.Users;
import we.link.response.MessageResponse;

public interface IMessageMgmtService {
	
	void sendMessage(Users user, Long receiverId, String content);
	
	List<MessageResponse> getChatHistory(Users currentUser, Long otherUserId);

}
