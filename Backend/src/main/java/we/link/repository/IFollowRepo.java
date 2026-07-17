package we.link.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.Follow;

public interface IFollowRepo extends JpaRepository<Follow, Long> {

	boolean existsByFollower_IdAndFollowing_Id(Long followerId, Long followingId);
	
	long countByFollower_Id(Long userId);
	
	long countByFollowing_Id(Long userId);

}
