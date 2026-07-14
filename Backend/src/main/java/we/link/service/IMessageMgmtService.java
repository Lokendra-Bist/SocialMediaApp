package we.link.service;

import we.link.entity.Users;

public interface IMessageMgmtService {
	
	void sendMessage(Users user, Long receiverId, String content);

}
