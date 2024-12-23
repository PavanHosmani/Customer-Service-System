package com.customer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.customer.entity.Customer;

@Service
public interface CustomerService {
	List<Customer> getAllCustomer();
	Customer getCustomer(Long customerId);
	Customer addCustomer(Customer Customer);
	Customer updateCustomer(Customer Customer);
	String deleteCustomer(Customer Customer);
}
