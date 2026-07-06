package we.link.service;

import we.link.entity.Users;
import we.link.response.LikesResponse;

public interface ILikesMgmtService {
	
	LikesResponse onLike(Users user, Long postId);

}
