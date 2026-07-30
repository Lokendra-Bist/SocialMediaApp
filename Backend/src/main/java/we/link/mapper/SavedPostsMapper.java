package we.link.mapper;

import we.link.entity.Posts;
import we.link.entity.SavedPosts;
import we.link.entity.Users;
import we.link.response.SavedPostsResponse;

public class SavedPostsMapper {
	
	public static SavedPosts toEntity(Posts post, Users user) {
		return SavedPosts.builder()
					.user(user)
					.post(post)
					.build();
	}
	
	public static SavedPostsResponse toResponse(SavedPosts savedPosts, boolean liked) {
		String profileImageUrl = savedPosts.getUser().getUserProfile() != null
								? savedPosts.getUser().getUserProfile().getProfileImageUrl() : null;
		return new SavedPostsResponse(
					savedPosts.getId(),
					savedPosts.getPost().getId(),
					savedPosts.getPost().getImageUrl(),
					savedPosts.getPost().getContent(),
					savedPosts.getPost().getLikesCount(),
					savedPosts.getPost().getCommentCount(),
					profileImageUrl,
					savedPosts.getUser().getFirstName(),
					savedPosts.getUser().getLastName(),
					liked,
					savedPosts.getCreatedAt()
				);
	}

}
