package we.link.response;

import java.time.LocalDateTime;

public record UserProfileResponse(
		
		Long id,

		String bio,

		String imageUrl,
		
		LocalDateTime createdAt,
		
		LocalDateTime updatedAt

) {}
