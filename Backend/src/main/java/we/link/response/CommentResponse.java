package we.link.response;

import java.time.LocalDateTime;

public record CommentResponse(

		Long id,

        Long postId,

        Long senderId,

        String senderName,

        String senderProfileImage,

        String content,

        LocalDateTime createdAt
		
) {}
