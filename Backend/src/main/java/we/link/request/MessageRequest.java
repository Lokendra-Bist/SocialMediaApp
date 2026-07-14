package we.link.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record MessageRequest(

		@NotNull(message = "ReceiverID can't be null")
		Long receiverId,
		
		@NotBlank(message = "Content cannot be blank")
		@Size(max = 500, message = "Content cannot exceed 500 characters")
		String content
		
) {}
