package we.link.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.entity.Users;
import we.link.exception.ResourceNotFoundException;
import we.link.repository.IUserRepo;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	
	private final IUserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users user = userRepo.findByEmail(email)
						.orElseThrow(() -> new ResourceNotFoundException("User Not FOund!"));
		
		return new CustomUserDetails(user);
				
	}

}
