package we.link.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import we.link.entity.Likes;
import we.link.entity.Posts;
import we.link.entity.Users;
import we.link.exception.ResourceNotFoundException;
import we.link.mapper.LikesMapper;
import we.link.repository.ILikesRepo;
import we.link.repository.IPostsRepo;
import we.link.response.LikesResponse;

@Service
@RequiredArgsConstructor
public class LikesMgmtServiceImpl implements ILikesMgmtService {

	private final ILikesRepo likesRepo;

	private final IPostsRepo postsRepo;

	@Transactional
	@Override
	public LikesResponse onLike(Users user, Long postId) {

		Posts post = postsRepo.findById(postId)
						.orElseThrow(() -> new ResourceNotFoundException("Post not found"));

		Optional<Likes> existing = likesRepo.findByUserAndPost(user, post);

		boolean liked;

		if (existing.isPresent()) {
			likesRepo.delete(existing.get());
			post.setLikesCount(post.getLikesCount() - 1);
			liked = false;
		} else {
			likesRepo.save(LikesMapper.toEntity(user, post));
			post.setLikesCount(post.getLikesCount() + 1);
			liked = true;
		}

		return new LikesResponse(liked, post.getLikesCount());
	}

}
