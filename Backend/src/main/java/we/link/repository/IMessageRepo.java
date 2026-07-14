package we.link.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.Message;

public interface IMessageRepo extends JpaRepository<Message, Long> {

}
