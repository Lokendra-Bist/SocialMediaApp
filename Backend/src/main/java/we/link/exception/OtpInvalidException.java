package we.link.exception;

public class OtpInvalidException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public OtpInvalidException(String msg) {
		super(msg);
	}

}
