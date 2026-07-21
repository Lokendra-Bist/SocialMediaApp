package we.link.response;

public record PostLikeResponse(
        Long postId,
        
        Long likesCount
        
) {}