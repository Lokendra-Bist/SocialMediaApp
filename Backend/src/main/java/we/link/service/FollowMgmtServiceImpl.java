package we.link.service;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import we.link.entity.Users;
import we.link.exception.BadRequestException;
import we.link.exception.ResourceNotFoundException;
import we.link.mapper.FollowMapper;
import we.link.repository.IFollowRepo;
import we.link.repository.IUserRepo;
import we.link.response.FollowResponse;

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
		
		boolean followBack = followRepo.existsByFollower_IdAndFollowing_Id(sender.getId(), receiver.getId());
		long followersCount = followRepo.countByFollower_Id(sender.getId());
		long followingCount = followRepo.countByFollowing_Id(receiver.getId());
		return FollowMapper.toFollowResponse(followBack, followersCount, followingCount);
	}

}
