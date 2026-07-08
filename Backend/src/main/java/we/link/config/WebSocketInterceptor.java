package we.link.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import lombok.RequiredArgsConstructor;
import we.link.entity.CustomUserDetails;
import we.link.security.CustomUserDetailsService;
import we.link.util.JwtUtil;

@Configuration
@RequiredArgsConstructor
public class WebSocketInterceptor implements ChannelInterceptor {

	private final JwtUtil jwtUtil;

	private final CustomUserDetailsService userDetailsService;

	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {

	    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

	    if (StompCommand.CONNECT.equals(accessor.getCommand())) {
	        String authHeader = accessor.getFirstNativeHeader("Authorization");

	        if (authHeader != null && authHeader.startsWith("Bearer ")) {
	            String token = authHeader.substring(7);

	            String email = jwtUtil.extractUsername(token);

	            CustomUserDetails user =
	                    (CustomUserDetails) userDetailsService.loadUserByUsername(email);

	            UsernamePasswordAuthenticationToken authentication =
	                    new UsernamePasswordAuthenticationToken(
	                            user,
	                            null,
	                            user.getAuthorities());

	            accessor.setUser(authentication);
	        }
	    }

	    return message;
	}

}
