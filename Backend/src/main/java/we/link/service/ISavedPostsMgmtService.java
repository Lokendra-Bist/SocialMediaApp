package we.link.service;

import we.link.entity.Users;
import we.link.response.SavedPostsResponse;

public interface ISavedPostsMgmtService {
	
	SavedPostsResponse savePosts(Long postId, Users user);

}
