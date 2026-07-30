package we.link.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import we.link.entity.SavedPosts;

public interface ISavedPostsRepo extends JpaRepository<SavedPosts, Long> {

}
