package we.link.service;

import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import we.link.entity.EmailVerification;
import we.link.entity.Users;
import we.link.exception.BadRequestException;
import we.link.exception.EmailAlreadyExistException;
import we.link.exception.OtpExpiredException;
import we.link.exception.OtpInvalidException;
import we.link.exception.ResourceAlreadyExistsException;
import we.link.exception.ResourceNotFoundException;
import we.link.mapper.UserMapper;
import we.link.repository.IEmailVerificationRepo;
import we.link.repository.IUserRepo;
import we.link.request.LoginRequest;
import we.link.request.OtpSendRequest;
import we.link.request.ResetPasswordRequest;
import we.link.request.VerifyOtpRequest;
import we.link.request.VerifyOtpResetPasswordRequest;
import we.link.response.AuthResponse;
import we.link.util.JwtUtil;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {
	
	private final IUserRepo userRepo;
	
	private final IEmailVerificationRepo emailVerificationRepo;
	
	private final IEmailMgmtService emailService;
	
	private final PasswordEncoder passwordEncoder;
	
	private final AuthenticationManager authManager;
		
	private final JwtUtil jwtUtil;

	@Override
	public void sendOtp(OtpSendRequest request) {
		if("REGISTRATION".equalsIgnoreCase(request.type())) {
			if(userRepo.existsByEmail(request.email())) {
				throw new EmailAlreadyExistException("Email Already Exists!");
			}
		} else if("FORGOT_PASSWORD".equalsIgnoreCase(request.type())) {
			if (!userRepo.existsByEmail(request.email())) {
	            throw new ResourceNotFoundException("No account found with this email address.");
	        }
		} else {
	        throw new BadRequestException("Invalid action type provided.");
	    }
		
		emailVerificationRepo.findByEmail(request.email()).ifPresent(emailVerificationRepo::delete);

		String otp = generateOtp();
		
		EmailVerification verification = EmailVerification.builder()
											.email(request.email())
											.otp(otp)
											.expiryTime(LocalDateTime.now().plusMinutes(5))
											.verified(false)
											.build();
		emailVerificationRepo.save(verification);
		emailService.OtpSender(request.email(), otp);
	}

	private String generateOtp() {
		return String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));
	}

	@Override
	public AuthResponse verifyOtpAndRegister(VerifyOtpRequest request) {
		EmailVerification verification = emailVerificationRepo
											.findTopByEmailOrderByIdDesc(request.email())
											.orElseThrow(() -> new ResourceAlreadyExistsException("Email Already Exists!"));
		
		if(!verification.getOtp().equals(request.otp())) {
			throw new OtpInvalidException("Invalid OTP!");
		}
		
		if(verification.getExpiryTime().isBefore(LocalDateTime.now())) {
			throw new OtpExpiredException("OTP Expired!");
		}
		
		Users savedUser = userRepo.save(UserMapper.toEntity(request, passwordEncoder.encode(request.password())));
		verification.setVerified(true);
		emailVerificationRepo.save(verification);
		
		return new AuthResponse(jwtUtil.generateToken(request.email()), UserMapper.toResponse(savedUser));
	}

	@Override
	public AuthResponse login(LoginRequest request) {
		try {
			authManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.email(), request.password())
				);		
			
			Users user = userRepo.findByEmail(request.email())
							.orElseThrow(() -> new ResourceNotFoundException("User Not Found!"));
			
			return new AuthResponse(jwtUtil.generateToken(request.email()), UserMapper.toResponse(user));
		} catch (AuthenticationException e) {
			e.printStackTrace();
			throw new BadRequestException("Error While LogIn" + e.getMessage());
		}
	}

	@Override
	public void verifyOtpToResetPassword(VerifyOtpResetPasswordRequest request) {
		EmailVerification verification = emailVerificationRepo
				.findTopByEmailOrderByIdDesc(request.email())
				.orElseThrow(() -> new ResourceAlreadyExistsException("Email Already Exists!"));

		if(!verification.getOtp().equals(request.otp())) {
			throw new OtpInvalidException("Invalid OTP!");
		}
		
		if(verification.getExpiryTime().isBefore(LocalDateTime.now())) {
			throw new OtpExpiredException("OTP Expired!");
		}
		
		verification.setVerified(true);
		emailVerificationRepo.save(verification);
	}

	@Override
	public void resetPassword(ResetPasswordRequest request) {
		Users user = userRepo.findByEmail(request.email())
						.orElseThrow(() -> new ResourceNotFoundException("User not found with the email"));
		user.setPassword(passwordEncoder.encode(request.password()));
		userRepo.save(user);
		emailVerificationRepo.findByEmail(request.email())
        							.ifPresent(emailVerificationRepo::delete);
	}

}
