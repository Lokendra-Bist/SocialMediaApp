package we.link.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import we.link.entity.Users;


public interface IUserRepo extends JpaRepository<Users, Long> {
	
	Optional<Users> findByEmail(String email);
	
	boolean existsByEmail(String email);
	
	@Query("""
			SELECT u
			FROM Users u
			WHERE u.id <> :currentUserId
			AND (
			    LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%'))
			    OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%'))
			)
			ORDER BY u.firstName
			""")
	List<Users> searchUsers(Long currentUserId, String query);
	
}
