package we.link.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.EmailVerification;

public interface IEmailVerificationRepo extends JpaRepository<EmailVerification, Long> {
	
	Optional<EmailVerification> findTopByEmailOrderByIdDesc(String email);

}
