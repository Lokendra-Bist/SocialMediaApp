package we.link.mapper;

import java.time.LocalDateTime;

import we.link.entity.Posts;
import we.link.entity.Users;
import we.link.request.PostCreateRequest;
import we.link.response.PostCreateResponse;

public class PostsMapper {
	
	public static Posts toEntity(PostCreateRequest request, String imageUrl, Users user) {
		return Posts.builder()
				.content(request.content())
                .imageUrl(imageUrl)
                .user(user)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
	}
	
	public static PostCreateResponse toResponse(Posts post) {
		return new PostCreateResponse(
					post.getContent(),
					post.getImageUrl(),
					post.getUser()
				);
	}

}
