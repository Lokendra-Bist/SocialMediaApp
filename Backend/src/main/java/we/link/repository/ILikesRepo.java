package we.link.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import we.link.entity.Likes;
import we.link.entity.Posts;
import we.link.entity.Users;

public interface ILikesRepo extends JpaRepository<Likes, Long> {
		
	Optional<Likes> findByUserAndPost(Users user, Posts post);
	
	Long countByPost(Posts post);
	
	@Query("""
			SELECT l.post.id
			FROM Likes l
			WHERE l.user.id = :userId
			""")
	List<Long> findLikedPostIdsByUser(Long userId);

}
