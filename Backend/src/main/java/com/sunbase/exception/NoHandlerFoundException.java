package com.sunbase.exception;

public class NoHandlerFoundException extends RuntimeException{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public NoHandlerFoundException(String message) {
		super(message);
	}
}
