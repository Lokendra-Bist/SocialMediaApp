package we.link.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import we.link.entity.Posts;
import we.link.entity.SavedPosts;
import we.link.entity.Users;

public interface ISavedPostsRepo extends JpaRepository<SavedPosts, Long> {

	Optional<SavedPosts> findByUserAndPost(Users user, Posts post);

	@Query("""
			    SELECT sp.post
			    FROM SavedPosts sp
			    WHERE sp.user = :user
			    ORDER BY sp.id DESC
			""")
	Page<Posts> findSavedPostsByUser(Users user, Pageable pageable);

	@Query("""
			SELECT sp.post.id
			FROM SavedPosts sp
			WHERE sp.user.id = :userId
			""")
	List<Long> findSavedPostIdsByUser(Long userId);

}
