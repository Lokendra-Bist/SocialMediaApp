package we.link.mapper;

import java.time.LocalDateTime;

import we.link.entity.Posts;
import we.link.entity.Users;
import we.link.request.PostCreateRequest;
import we.link.response.PostCreateResponse;
import we.link.response.PostResponse;

public class PostsMapper {
	
	public static Posts createPostToEntity(PostCreateRequest request, String imageUrl, Users user) {
		return Posts.builder()
				.content(request.content())
                .imageUrl(imageUrl)
                .user(user)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
	}
	
	public static PostCreateResponse createPostToResponse(Posts post) {
		return new PostCreateResponse(
					post.getContent(),
					post.getImageUrl(),
					post.getUser().getId()
				);
	}
	
	public static PostResponse toPostResponse(Posts post) {
		Users user = post.getUser();
		String profileImageUrl = (user.getUserProfile() != null) 
		        ? user.getUserProfile().getProfileImageUrl() 
		        : null;
		return new PostResponse(
					post.getId(),
					post.getContent(),
					post.getImageUrl(),
					post.getUser().getFirstName(),
					post.getUser().getLastName(),
					profileImageUrl,
					post.getCreatedAt()
				);
	}

}
