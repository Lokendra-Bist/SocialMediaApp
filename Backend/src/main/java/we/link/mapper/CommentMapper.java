package we.link.mapper;

import java.time.LocalDateTime;

import we.link.entity.Comments;
import we.link.entity.Posts;
import we.link.entity.Users;
import we.link.request.CommentRequest;
import we.link.response.CommentResponse;

public class CommentMapper {

	public static Comments toEntity(Users user, Posts post, CommentRequest request) {
		return Comments.builder()
				.user(user)
				.post(post)
				.content(request.content())
				.createdAt(LocalDateTime.now())
				.build();
	}

	public static CommentResponse toResponse(Comments comment) {
		String profileImageUrl = (comment.getUser().getUserProfile() != null) 
		        ? comment.getUser().getUserProfile().getProfileImageUrl() 
		        : null;
		return new CommentResponse(
				comment.getId(),
				comment.getPost().getId(),
				comment.getUser().getId(),
				comment.getUser().getFirstName() + " " + comment.getUser().getLastName(),
				profileImageUrl,
				comment.getContent(),
				comment.getPost().getCommentCount(),
				comment.getCreatedAt()
			);
	}

}
