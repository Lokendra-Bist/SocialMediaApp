package we.link.mapper;

import we.link.entity.Posts;
import we.link.entity.SavedPosts;
import we.link.entity.Users;

public class SavedPostsMapper {
	
	public static SavedPosts toEntity(Posts post, Users user) {
		return SavedPosts.builder()
					.user(user)
					.post(post)
					.build();
	}

}
