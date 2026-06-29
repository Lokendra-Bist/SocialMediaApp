package we.link.exception;

public class OtpExpiredException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public OtpExpiredException(String msg) {
		super(msg);
	}

}
