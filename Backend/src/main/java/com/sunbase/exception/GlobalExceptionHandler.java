package com.sunbase.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler{
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetails> argumentNotValidException(MethodArgumentNotValidException ex, WebRequest req){
		ErrorDetails err = new ErrorDetails();
		err.setTimestamp(LocalDateTime.now());
		err.setMessage(ex.getMessage());
		err.setDetails(req.getDescription(false));
		
		return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST);
	}
	
	
	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ErrorDetails> notFoundException(NotFoundException ex, WebRequest req){
		ErrorDetails err = new ErrorDetails();
		err.setTimestamp(LocalDateTime.now());
		err.setMessage(ex.getMessage());
		err.setDetails(req.getDescription(false));
		
		return new ResponseEntity<ErrorDetails>(err, HttpStatus.NOT_FOUND);
	}
	
	
	@ExceptionHandler(SunbaseException.class)
	public ResponseEntity<ErrorDetails> bigBasketException(SunbaseException ex, WebRequest req){
		ErrorDetails err = new ErrorDetails();
		err.setTimestamp(LocalDateTime.now());
		err.setMessage(ex.getMessage());
		err.setDetails(req.getDescription(false));
		
		return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST);
	}
	
	
	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ErrorDetails> noHandlerFoundException(NoHandlerFoundException ex, WebRequest req){
		ErrorDetails err = new ErrorDetails();
		err.setTimestamp(LocalDateTime.now());
		err.setMessage(ex.getMessage());
		err.setDetails(req.getDescription(false));
		
		return new ResponseEntity<ErrorDetails>(err, HttpStatus.BAD_REQUEST);
	}
	
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> otherExceptionHandler(Exception ex, WebRequest req){
		ErrorDetails err = new ErrorDetails();
		err.setTimestamp(LocalDateTime.now());
		err.setMessage(ex.getMessage());
		err.setDetails(req.getDescription(false));
		
		return new ResponseEntity<ErrorDetails>(err, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
