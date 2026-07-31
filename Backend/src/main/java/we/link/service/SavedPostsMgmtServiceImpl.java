package we.link.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import we.link.entity.Posts;
import we.link.entity.SavedPosts;
import we.link.entity.Users;
import we.link.exception.ResourceNotFoundException;
import we.link.mapper.PostsMapper;
import we.link.mapper.SavedPostsMapper;
import we.link.repository.ILikesRepo;
import we.link.repository.IPostsRepo;
import we.link.repository.ISavedPostsRepo;
import we.link.response.PostResponse;
import we.link.response.SavePostResponse;

@Service
@RequiredArgsConstructor
public class SavedPostsMgmtServiceImpl implements ISavedPostsMgmtService {
	
	private final ISavedPostsRepo savedPostsRepo;
	
	private final IPostsRepo postRepo;
	
	private final ILikesRepo likesRepo;
	
	@Override
	public SavePostResponse savePosts(Long postId, Users user) {
		Posts post = postRepo.findById(postId)
						.orElseThrow(() -> new ResourceNotFoundException("post not found with id"));
		
		Optional<SavedPosts> existingSavedPost = savedPostsRepo.findByUserAndPost(user, post);
		
		boolean saved;
		if(existingSavedPost.isPresent()) {
			savedPostsRepo.delete(existingSavedPost.get());
			saved=false;
		} else {
			savedPostsRepo.save(SavedPostsMapper.toEntity(post, user));
			saved = true;
		}
		
		return new SavePostResponse(saved);
	}

	@Override
	public Page<PostResponse> getSavedPosts(Users user, Pageable pageable) {
		Set<Long> likesPostId = new HashSet<>(
				likesRepo.findLikedPostIdsByUser(user.getId())
			);
				
		return savedPostsRepo
	            .findSavedPostsByUser(user, pageable)
	            .map(post -> PostsMapper.toPostResponse(post, likesPostId.contains(post.getId()), true));
	}

}
