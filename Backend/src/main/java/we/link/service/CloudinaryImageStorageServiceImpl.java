package we.link.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;
import we.link.exception.BadRequestException;

@Service
@RequiredArgsConstructor
public class CloudinaryImageStorageServiceImpl implements ICloudinaryImageStorageService {
	
	private final Cloudinary cloudinary;

	@Override
	public String uploadImage(MultipartFile file) {
		try {
			Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
			
			return result.get("secure_url").toString();
		} catch (IOException e) {
			throw new BadRequestException("Failed to upload the image");
		}
	}

}
