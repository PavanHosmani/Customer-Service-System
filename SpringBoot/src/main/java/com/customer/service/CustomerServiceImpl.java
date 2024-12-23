package com.customer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.customer.entity.Customer;
import com.customer.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	private CustomerRepository customerRepository;
	
	@Override
	public List<Customer> getAllCustomer() {
		// TODO Auto-generated method stub
		return  (List<Customer>)customerRepository.findAll();
	}

	@Override
	public Customer getCustomer(Long customerId) {
		// TODO Auto-generated method stub
		return customerRepository.findById(customerId).get();
	}

	@Override
	public Customer addCustomer(Customer Customer) {
		// TODO Auto-generated method stub
		return customerRepository.save(Customer);
	}

	@Override
	public Customer updateCustomer(Customer Customer) {
		// TODO Auto-generated method stub
		return customerRepository.save(Customer);
	}

	@Override
	public String deleteCustomer(Customer Customer) {
		// TODO Auto-generated method stub
		customerRepository.delete(Customer);
		return "Customer is deleted successfully for customerId: "+Customer.getCustomerId();
	}

}
