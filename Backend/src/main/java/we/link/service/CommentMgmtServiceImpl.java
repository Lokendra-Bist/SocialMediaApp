package we.link.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import we.link.entity.Comments;
import we.link.entity.Posts;
import we.link.entity.Users;
import we.link.exception.ResourceNotFoundException;
import we.link.mapper.CommentMapper;
import we.link.repository.ICommentsRepo;
import we.link.repository.IPostsRepo;
import we.link.request.CommentRequest;
import we.link.response.CommentResponse;

@Service
@RequiredArgsConstructor
public class CommentMgmtServiceImpl implements ICommentsMgmtService {
		
	private final ICommentsRepo commentRepo;
	
	private final IPostsRepo postRepo;
	
	private final SimpMessagingTemplate messagingTemplate;
	
	private final INotificationMgmtService notificationService;

	@Override
	public CommentResponse addComment(Users user, Long postId, CommentRequest request) {
		Posts post = postRepo.findById(postId)
	            	.orElseThrow(() -> new ResourceNotFoundException("Post not found"));
		
		Comments comment = commentRepo.save(
	                    		CommentMapper.toEntity(
		                            user,
		                            post,
		                            request
	                    		)
	            			);
		
		post.setCommentCount(post.getCommentCount() + 1);
		postRepo.save(post);
		
		CommentResponse response = CommentMapper.toResponse(comment);

	    messagingTemplate.convertAndSend(
	            "/topic/comments/" + postId,
	            response
	    );

	    notificationService.sendCommentNotification(user, post);

	    return response;
	}

}
