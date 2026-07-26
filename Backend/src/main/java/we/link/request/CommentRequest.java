package we.link.request;

import jakarta.validation.constraints.NotBlank;

public record CommentRequest(

	@NotBlank(message = "Comment cannot be empty.") 
	String content

) {
}
