package com.example.rental;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RentalCarController {
	private final RentalCarService service;
	private final RentalRepository rentalRepository;
	private final CarRepository carRepository;
	@Autowired
	public RentalCarController(RentalCarService service, RentalRepository rentalRepository, CarRepository carRepository) {
		this.rentalRepository = rentalRepository;
		this.carRepository=carRepository;
		this.service=service;
	}
	@GetMapping("/get/rentals")
	public List<Rental> showAdmin() {
		return service.getAllRentals();
	}
	@PostMapping("/post/rental")
	public Rental bookCar(@RequestBody Rental rental) {
		return service.saveRental(rental);
	}
}
