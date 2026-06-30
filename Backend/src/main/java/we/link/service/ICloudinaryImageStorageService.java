package we.link.service;

import org.springframework.web.multipart.MultipartFile;

public interface ICloudinaryImageStorageService {
	
	String uploadImage(MultipartFile file);

}
