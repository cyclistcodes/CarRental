package com.example.rental;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class RentalController {

	private final RentalRepository rentalRepository;

	public RentalController(RentalRepository rentalRepository) {
		this.rentalRepository = rentalRepository;
	}
	/*@GetMapping
	public HelloWorld sayHello() {
		return helloWorldRepository.getHelloWorldFromDatabase();
	}*/
}
