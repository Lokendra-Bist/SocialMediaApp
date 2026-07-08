package we.link.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.Notification;
import we.link.entity.Users;

public interface INotificationRepo extends JpaRepository<Notification, Long> {
	
	
	 List<Notification> findByReceiverOrderByCreatedAtDesc(Users receiver);

	 long countByReceiverAndIsReadFalse(Users receiver);

}
