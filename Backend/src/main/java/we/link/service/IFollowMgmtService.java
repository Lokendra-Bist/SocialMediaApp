package we.link.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import we.link.entity.Users;
import we.link.response.FollowResponse;
import we.link.response.FollowUserResponse;

public interface IFollowMgmtService {
	
	FollowResponse addFollow(Long receiverId, Users sender);
	
	FollowResponse unFollow(Long receiverId, Users sender);
	
	Page<FollowUserResponse> getFollowers(Users user, Pageable pageable);
	
	Page<FollowUserResponse> getFollowings(Users user, Pageable pageable);

}
