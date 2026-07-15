package we.link.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import we.link.entity.Message;

public interface IMessageRepo extends JpaRepository<Message, Long> {

	@Query("""
			    SELECT m
			    FROM Message m
			    WHERE
			        (m.sender.id = :currentUserId AND m.receiver.id = :otherUserId)
			    OR
			        (m.sender.id = :otherUserId AND m.receiver.id = :currentUserId)
			    ORDER BY m.sentAt ASC
			""")
	List<Message> getConversation(Long currentUserId, Long otherUserId);

}
