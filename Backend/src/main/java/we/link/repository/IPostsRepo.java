package we.link.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.Posts;

public interface IPostsRepo extends JpaRepository<Posts, Long> {

}
