package we.link.response;

import java.time.LocalDateTime;

public record SavedPostsResponse(

		Long id,
		
		Long postId,
		
		String imageUrl,
		
		String content,
		
		Long likesCount,
		
		Long commentCount,
		
		String profileImageUrl,
		
		String firstName,
		
		String lastName,
		
		boolean liked,
		
		LocalDateTime createdAt
		
) {}
