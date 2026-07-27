package we.link.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.Comments;

public interface ICommentsRepo extends JpaRepository<Comments, Long> {
	
	List<Comments> findByPost_Id(Long postId);

}
