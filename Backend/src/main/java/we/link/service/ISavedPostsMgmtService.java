package we.link.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import we.link.entity.Users;
import we.link.response.PostResponse;
import we.link.response.SavePostResponse;

public interface ISavedPostsMgmtService {
	
	SavePostResponse savePosts(Long postId, Users user);
	
	Page<PostResponse> getSavedPosts(Users user, Pageable pageable);

}
