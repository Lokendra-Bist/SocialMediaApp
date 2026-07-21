package we.link.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import we.link.entity.Posts;
import we.link.entity.Users;
import we.link.mapper.PostsMapper;
import we.link.repository.ILikesRepo;
import we.link.repository.IPostsRepo;
import we.link.request.PostCreateRequest;
import we.link.response.PostCreateResponse;
import we.link.response.PostResponse;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements IPostsMgmtService {
		
	private final IPostsRepo postsRepo;
	
	private final ICloudinaryImageStorageService storageService;
	
	private final ILikesRepo likesRepo;

	@Override
	public PostCreateResponse createPost(PostCreateRequest request, Users user) {
		String uploadedImageUrl = storageService.uploadImage(request.image());
		
		Posts savedPost = postsRepo.save(PostsMapper.createPostToEntity(request, uploadedImageUrl, user));
		return PostsMapper.createPostToResponse(savedPost);
	}

	@Override
	public Page<PostResponse> getAllPosts(int page, int size, Users user) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
		Page<Posts> posts = postsRepo.findAll(pageable);
		
		Set<Long> likesPostsId = new HashSet<>(
					likesRepo.findLikedPostIdsByUser(user.getId())
				);
		
		return posts.map(post -> 
							PostsMapper.toPostResponse(
										post,
										likesPostsId.contains(post.getId())
									)
						);
	}

	@Override
	public Page<PostResponse> getMyPosts(int page, int size, Users user) {
		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
		Page<Posts> pageData = postsRepo.findByUser_Id(pageable, user.getId());
		
		Set<Long> likesPostId = new HashSet<>(
					likesRepo.findLikedPostIdsByUser(user.getId())
				);
		
		return pageData.map(post -> 
					PostsMapper.toPostResponse(
							post,
							likesPostId.contains(post.getId())
						)
				);
	}

}
