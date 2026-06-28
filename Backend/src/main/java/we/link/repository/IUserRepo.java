package we.link.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.Users;


public interface IUserRepo extends JpaRepository<Users, Long> {
	
	Optional<Users> findByEmail(String email);

}
