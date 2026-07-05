package we.link.response;

import java.time.LocalDateTime;

public record PostResponse(

		Long id,

        String content,

        String imageUrl,

        String firstName,

        String lastName,
        
        String profileImageUrl,

        LocalDateTime createdAt
		
) {}
