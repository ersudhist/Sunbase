package com.sunbase.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbase.model.Customer;
import com.sunbase.repository.CustomerRepository;
import com.sunbase.exception.*;


@Service
public class CustomerServiceImpl implements CustomerService{
	
	 @Autowired
	 private CustomerRepository customerRepository;

	@Override
	public List<Customer> getAllCustomers() {
List<Customer> customers= customerRepository.findAll();
		
		if(customers.isEmpty())
			throw new NotFoundException("No Customer find");
		
		return customers;
	}

	@Override
	public Customer createCustomer(Customer customer) {
		if (customer == null) {
            throw new SunbaseException("Null value passed");
        }
		return customerRepository.save(customer);
	}

	@Override
	public void deleteCustomer(Integer id) {
		if (!customerRepository.existsById(id)) {
            throw new NotFoundException("Customer not found with id: " + id);
        }
        customerRepository.deleteById(id);
		
	}

	@Override
	public Customer updateCustomer( Integer id, Customer customer) {
		Customer customer1 = customerRepository.findById(id).orElseThrow(() -> new SunbaseException("Null value") ) ;
  
        if (customer1 != null) {
            // Update the customer fields based on the updatedCustomer object
        	customer1.setFirstName(customer.getFirstName());
        	customer1.setLastName(customer.getLastName());
        	customer1.setStreet(customer.getStreet());
        	customer1.setAddress(customer.getAddress());
            customer1.setCity(customer.getCity());
            customer1.setState(customer.getState());
            customer1.setEmail(customer.getEmail());
            customer1.setPhone(customer.getPhone());
            
            
            return customerRepository.save(customer);
        }

        return null; 
    }

	@Override
	public Optional<Customer> getCustomerById(Integer id) throws SunbaseException {
		return customerRepository.findById(id);
                
	}

}
