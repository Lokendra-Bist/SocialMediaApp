package we.link.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import we.link.entity.Posts;
import we.link.entity.Users;
import we.link.mapper.PostsMapper;
import we.link.repository.IPostsRepo;
import we.link.request.PostCreateRequest;
import we.link.response.PostCreateResponse;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements IPostsMgmtService {
		
	private final IPostsRepo postsRepo;
	
	private final ICloudinaryImageStorageService storageService;

	@Override
	public PostCreateResponse createPost(PostCreateRequest request, Users user) {
		String uploadedImageUrl = storageService.uploadImage(request.image());
		
		Posts savedPost = postsRepo.save(PostsMapper.toEntity(request, uploadedImageUrl, user));
		return PostsMapper.toResponse(savedPost);
	}

}
