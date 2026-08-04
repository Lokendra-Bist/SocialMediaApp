package we.link.service;

import we.link.entity.Users;
import we.link.response.FollowResponse;

public interface IFollowMgmtService {
	
	FollowResponse addFollow(Long receiverId, Users sender);

}
