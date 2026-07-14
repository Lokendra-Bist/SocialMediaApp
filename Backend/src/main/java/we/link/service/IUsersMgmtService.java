package we.link.service;

import java.util.List;

import we.link.entity.Users;
import we.link.response.UserSearchResponse;

public interface IUsersMgmtService {
	
	List<UserSearchResponse> searchUsers(Users user, String query);

}
