package we.link.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.UserProfile;
import we.link.entity.Users;


public interface IUserProfileRepo extends JpaRepository<UserProfile, Long> {
	
	Optional<UserProfile> findByUserId(Long userId);

}
