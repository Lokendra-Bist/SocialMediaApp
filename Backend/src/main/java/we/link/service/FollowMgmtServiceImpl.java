package we.link.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import we.link.entity.Follow;
import we.link.entity.Users;
import we.link.exception.BadRequestException;
import we.link.exception.ResourceNotFoundException;
import we.link.mapper.FollowMapper;
import we.link.repository.IFollowRepo;
import we.link.repository.IUserRepo;
import we.link.response.FollowResponse;
import we.link.response.FollowUserResponse;

@Service
@AllArgsConstructor
public class FollowMgmtServiceImpl implements IFollowMgmtService {
	
	private final IFollowRepo followRepo;
	
	private final IUserRepo userRepo;

	@Override
	public FollowResponse addFollow(Long receiverId, Users sender) {
		if(sender.getId().equals(receiverId)) {
			throw new BadRequestException("YOu cannot follow yourself");
		}
		
		Users receiver = userRepo.findById(receiverId)
							.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		
		if(followRepo.existsByFollower_IdAndFollowing_Id(sender.getId(), receiver.getId())) {
			throw new BadRequestException("Already following this user");
		}
		
		followRepo.save(FollowMapper.toEntity(sender, receiver));
		
		boolean followBack = followRepo.existsByFollower_IdAndFollowing_Id(receiver.getId(), sender.getId());
		long followersCount = followRepo.countByFollowing_Id(receiver.getId());
		long followingCount = followRepo.countByFollower_Id(sender.getId());
		return FollowMapper.toFollowResponse(true ,followBack, followersCount, followingCount);
	}

	@Override
	public FollowResponse unFollow(Long receiverId, Users sender) {
		Users receiver = userRepo.findById(receiverId)
								.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		
		Follow follow = followRepo.findByFollowerAndFollowing(sender, receiver)
							.orElseThrow(() -> new ResourceNotFoundException("Follow not found"));
		
		followRepo.delete(follow);
		
		boolean followBack = followRepo.existsByFollower_IdAndFollowing_Id(receiver.getId(), sender.getId());
		long followersCount = followRepo.countByFollowing_Id(receiver.getId());
		long followingCount = followRepo.countByFollower_Id(sender.getId());
		return FollowMapper.toFollowResponse(false, followBack, followersCount, followingCount);
	}

	@Override
	public Page<FollowUserResponse> getFollowers(Users user, Pageable pageable) {
		return followRepo.findByFollowing_Id(user.getId(), pageable)
	            .map(follow -> {
	                Users follower = follow.getFollower();

	                boolean following = followRepo.existsByFollower_IdAndFollowing_Id(
	                        user.getId(),
	                        follower.getId()
	                );

	                return FollowMapper.toFollowUserResponse(follower, following);
	            });
	}

	@Override
	public Page<FollowUserResponse> getFollowings(Users user, Pageable pageable) {
		return followRepo.findByFollower_Id(user.getId(), pageable)
	            .map(follow -> {
	                Users followingUser = follow.getFollowing();

	                return FollowMapper.toFollowUserResponse(followingUser, true);
	            });
	}

}
