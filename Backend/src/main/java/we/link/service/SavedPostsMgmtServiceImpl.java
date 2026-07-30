package we.link.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import we.link.entity.Posts;
import we.link.entity.SavedPosts;
import we.link.entity.Users;
import we.link.exception.ResourceNotFoundException;
import we.link.mapper.SavedPostsMapper;
import we.link.repository.ILikesRepo;
import we.link.repository.IPostsRepo;
import we.link.repository.ISavedPostsRepo;
import we.link.response.SavedPostsResponse;

@Service
@RequiredArgsConstructor
public class SavedPostsMgmtServiceImpl implements ISavedPostsMgmtService {
	
	private final ISavedPostsRepo savedPostsRepo;
	
	private final IPostsRepo postRepo;
	
	private final ILikesRepo likesRepo;

	@Override
	public SavedPostsResponse savePosts(Long postId, Users user) {
		Posts post = postRepo.findById(postId)
						.orElseThrow(() -> new ResourceNotFoundException("post not found with id"));
		
		SavedPosts savedPost = savedPostsRepo.save(
								SavedPostsMapper.toEntity(post, user)
							);
		
		Set<Long> likesPostId = new HashSet<>(
				likesRepo.findLikedPostIdsByUser(user.getId())
			);
		
		return SavedPostsMapper.toResponse(savedPost, likesPostId.contains(post.getId()));
	}

}
