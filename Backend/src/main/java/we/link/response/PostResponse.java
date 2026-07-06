package we.link.response;

import java.time.LocalDateTime;

public record PostResponse(

		Long id,

        String content,

        String imageUrl,

        String firstName,

        String lastName,
        
        Long likesCount,
        
        boolean liked,
        
        String profileImageUrl,

        LocalDateTime createdAt
		
) {}
