package we.link.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.Follow;
import we.link.entity.Users;


public interface IFollowRepo extends JpaRepository<Follow, Long> {

	boolean existsByFollower_IdAndFollowing_Id(Long followerId, Long followingId);
	
	long countByFollower_Id(Long userId);
	
	long countByFollowing_Id(Long userId);
	
	Optional<Follow> findByFollowerAndFollowing(Users follower, Users following);
	
	Page<Follow> findByFollower_Id(Long id, Pageable pageable);
	
	Page<Follow> findByFollowing_Id(Long id, Pageable pageable);

}
