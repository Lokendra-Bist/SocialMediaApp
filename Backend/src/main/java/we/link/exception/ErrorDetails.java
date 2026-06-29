package we.link.exception;

import java.time.LocalDateTime;

public class ErrorDetails {
	
	private LocalDateTime timeStamp;
	
	private int status;
	
	private String error;
	
	private String message;
	
	public ErrorDetails(int status, String error, String message) {
        this.timeStamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
    }

}
