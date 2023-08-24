package com.sunbase.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbase.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    
}

