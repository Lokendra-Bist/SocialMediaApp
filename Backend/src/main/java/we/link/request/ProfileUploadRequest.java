package we.link.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProfileUploadRequest(
		
		@NotBlank(message = "Bio cannot be blank")
		@Size(max = 500, message = "Bio cannot exceed 500 characters")
		String bio,
		
		MultipartFile image
		
) {}
