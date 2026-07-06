package we.link.service;

import org.springframework.data.domain.Page;

import we.link.entity.Users;
import we.link.request.PostCreateRequest;
import we.link.response.PostCreateResponse;
import we.link.response.PostResponse;

public interface IPostsMgmtService {
	
	PostCreateResponse createPost(PostCreateRequest request, Users user);
	
	Page<PostResponse> getAllPosts(int page, int size, Users user);

}
