package com.sunbase.services;

import java.util.List;
import java.util.Optional;

import com.sunbase.exception.SunbaseException;
import com.sunbase.model.Customer;

public interface CustomerService {
	
	public List<Customer> getAllCustomers() throws SunbaseException;
	public Customer createCustomer(Customer customer) throws SunbaseException;
	public void deleteCustomer(Integer id) throws SunbaseException;
	public Optional<Customer> getCustomerById(Integer id) throws SunbaseException;
	public Customer updateCustomer(Integer id, Customer customer) throws SunbaseException;

}
