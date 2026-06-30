package we.link.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PostCreateRequest(

		@NotBlank(message = "Content cannot be blank")
		@Size(max = 500, message = "Content cannot exceed 500 characters")
		String content,
		
		MultipartFile image
		
) {}
