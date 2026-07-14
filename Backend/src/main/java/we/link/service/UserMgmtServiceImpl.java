package we.link.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import we.link.entity.Users;
import we.link.mapper.UserMapper;
import we.link.repository.IUserRepo;
import we.link.response.UserSearchResponse;

@Service
@RequiredArgsConstructor
public class UserMgmtServiceImpl implements IUsersMgmtService {
	
	private final IUserRepo userRepo;

	@Override
	public List<UserSearchResponse> searchUsers(Users user, String query) {
		return userRepo.searchUsers(user.getId(), query)
						.stream()
						.map(UserMapper::toUserSearchResponse)
						.toList();
	}

}
