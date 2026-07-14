package we.link.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.response.ApiResponse;
import we.link.response.UserSearchResponse;
import we.link.service.IUsersMgmtService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
	
	private final IUsersMgmtService userService;
	
	@GetMapping("search-users")
	public ResponseEntity<ApiResponse<List<UserSearchResponse>>> searchUsers(@AuthenticationPrincipal CustomUserDetails details,
												@RequestParam(defaultValue = "") String 	query) {
		return ResponseEntity.ok(
					new ApiResponse<>(
								true,
								"Search Successfully!",
								userService.searchUsers(details.getUser(), query)
							)
				);
	}

}
