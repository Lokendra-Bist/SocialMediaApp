package we.link.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> handleGlobalException(Exception ex) {
		return new ResponseEntity<>(new ErrorDetails(
									HttpStatus.INTERNAL_SERVER_ERROR.value(),
									"Internal Server Error",
									ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(EmailAlreadyExistException.class)
	public ResponseEntity<ErrorDetails> handleEmailExistException(EmailAlreadyExistException ex) {
		return new ResponseEntity<>(new ErrorDetails(
									HttpStatus.INTERNAL_SERVER_ERROR.value(),
									HttpStatus.CONFLICT.getReasonPhrase(),
									ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(ResourceAlreadyExistsException.class)
	public ResponseEntity<ErrorDetails> resourceAlreadyExistException(ResourceAlreadyExistsException ex) {
		return new ResponseEntity<>(new ErrorDetails(
									HttpStatus.INTERNAL_SERVER_ERROR.value(),
									HttpStatus.CONFLICT.getReasonPhrase(),
									ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(OtpInvalidException.class)
	public ResponseEntity<ErrorDetails> invalidOtpException(OtpInvalidException ex) {
		return new ResponseEntity<>(new ErrorDetails(
									HttpStatus.INTERNAL_SERVER_ERROR.value(),
									HttpStatus.CONFLICT.getReasonPhrase(),
									ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(OtpExpiredException.class)
	public ResponseEntity<ErrorDetails> otpExpiredException(OtpExpiredException ex) {
		return new ResponseEntity<>(new ErrorDetails(
									HttpStatus.INTERNAL_SERVER_ERROR.value(),
									HttpStatus.CONFLICT.getReasonPhrase(),
									ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ErrorDetails> badRequestException(BadRequestException ex) {
		return new ResponseEntity<>(new ErrorDetails(
									HttpStatus.INTERNAL_SERVER_ERROR.value(),
									HttpStatus.CONFLICT.getReasonPhrase(),
									ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
