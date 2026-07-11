package we.link.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.RequiredArgsConstructor;
import we.link.security.CustomUserDetailsService;
import we.link.util.JwtUtil;

@Configuration
@RequiredArgsConstructor
public class WebSocketInterceptor implements ChannelInterceptor {

	private final JwtUtil jwtUtil;

	private final CustomUserDetailsService userDetailsService;
	
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
	    StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

	    if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
	        String token = accessor.getFirstNativeHeader("Authorization");

	        if (token != null && token.startsWith("Bearer ")) {
	            try {
	                token = token.substring(7);
	                String userEmail = jwtUtil.extractUsername(token);
	                
	                UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
	                
	                if (jwtUtil.isTokenValid(token, userDetails)) {
	                	UsernamePasswordAuthenticationToken authentication = 
	                            new UsernamePasswordAuthenticationToken(userEmail, null, userDetails.getAuthorities());
	                	accessor.setUser(authentication);
	                    
	                    return MessageBuilder.createMessage(message.getPayload(), accessor.getMessageHeaders());
	                }
	            } catch (Exception e) {
	                System.err.println("WebSocket Auth failed gracefully: " + e.getMessage());
	                throw new MessageDeliveryException("Token validation failed: " + e.getMessage());
	            }
	        }
	        throw new MessageDeliveryException("Missing or invalid Authorization header");
	    }
	    return message;
	}

}
