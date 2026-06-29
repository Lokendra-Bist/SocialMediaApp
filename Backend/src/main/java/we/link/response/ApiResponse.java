package we.link.response;

public record ApiResponse<T>(
		
	boolean success,
	
	String message,
	
	T data

) { }
