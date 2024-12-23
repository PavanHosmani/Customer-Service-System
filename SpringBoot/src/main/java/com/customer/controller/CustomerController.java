package com.customer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.customer.entity.*;

import com.customer.service.CustomerServiceImpl;
import com.customer.service.*;

@RestController
@CrossOrigin(maxAge = 3360)
public class CustomerController {
	
	@Autowired
	private CustomerService CustomerService;
	
	@GetMapping("/customers")
	public ResponseEntity<List<Customer>> getAllCustomer(){
		return ResponseEntity.ok(CustomerService.getAllCustomer());
	}
	
	@PostMapping("/Addcustomers")
	public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer){
		return ResponseEntity.ok(CustomerService.addCustomer(customer));
	}
	
	@GetMapping("/customers/{customerId}")
	public ResponseEntity<Customer> getCustomer(@PathVariable("customerId") Long customnerId){
		return ResponseEntity.ok(CustomerService.getCustomer(customnerId));
	}
	
	@PatchMapping("/customers/{customerId}")
	public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer,@PathVariable("customerId") Long customnerId){
		Customer customerObj= CustomerService.getCustomer(customnerId);
		if(customerObj!=null) {
			customerObj.setBalance(customer.getBalance());
			customerObj.setName(customer.getName());
			customerObj.setEmail(customer.getEmail());
		}
		return ResponseEntity.ok(CustomerService.updateCustomer(customerObj));
	}
	
	@DeleteMapping("/customers/{customerId}")
	public ResponseEntity<String> deleteCustomer(@PathVariable("customerId") Long customerId){
		Customer customerObj= CustomerService.getCustomer(customerId);
		String deleteMsg=null;
		if(customerObj!=null) {
			deleteMsg=CustomerService.deleteCustomer(customerObj);
		}
		return ResponseEntity.ok(deleteMsg);
	}
	
	
	
	
	
}
