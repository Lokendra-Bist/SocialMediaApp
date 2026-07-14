package we.link.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import we.link.entity.Conversation;
import we.link.entity.Users;

public interface IConversationRepo extends JpaRepository<Conversation, Long> {
	
	@Query("""
	        SELECT c
	        FROM Conversation c
	        WHERE
	        (c.userOne.id = :userOneId AND c.userTwo.id = :userTwoId)
	        OR
	        (c.userOne.id = :userTwoId AND c.userTwo.id = :userOneId)
	    """)
	    Optional<Conversation> findConversation(
	            Long userOneId,
	            Long userTwoId
	    );
	
	List<Conversation> findByUserOneOrUserTwoOrderByLastMessageTimeDesc(Users userOne, Users userTwo);

}
