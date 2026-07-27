package we.link.service;

import java.util.List;

import we.link.entity.Users;
import we.link.request.CommentRequest;
import we.link.response.CommentResponse;

public interface ICommentsMgmtService {
	
	CommentResponse addComment(Users user, Long postId, CommentRequest request);
	
	List<CommentResponse> getCommentByPost(Long postId);

}
