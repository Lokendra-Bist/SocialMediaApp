package we.link.mapper;

import we.link.entity.Likes;
import we.link.entity.Posts;
import we.link.entity.Users;

public class LikesMapper {
	
	public static Likes toEntity(Users user, Posts post) {
		return Likes.builder()
					.user(user)
					.post(post)
					.build();
	}

}
