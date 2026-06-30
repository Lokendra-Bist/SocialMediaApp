package we.link.service;

import we.link.entity.Users;
import we.link.request.PostCreateRequest;
import we.link.response.PostCreateResponse;

public interface IPostsMgmtService {
	
	PostCreateResponse createPost(PostCreateRequest request, Users user);

}
