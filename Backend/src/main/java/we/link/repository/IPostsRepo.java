package we.link.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.Posts;

public interface IPostsRepo extends JpaRepository<Posts, Long> {
	
	Page<Posts> findByUser_Id(Pageable pageable, Long userId);

}
