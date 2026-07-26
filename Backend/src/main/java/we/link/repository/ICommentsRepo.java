package we.link.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.Comments;

public interface ICommentsRepo extends JpaRepository<Comments, Long> {

}
