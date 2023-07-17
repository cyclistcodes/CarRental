package com.example.rental;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
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
	@GetMapping("/get/cars")
	public List<Car> showCars() {
		return service.getAllCars();
	}
	@GetMapping("/get/isAvailable")
	public boolean isAvailable(@RequestBody AvailabilityRequest request) {
		var count = service.countNumberOfOverlapsForCar(request.carModel, request.startDate, request.endDate);
		if(count == 0){
			return true;
		}
		return false;
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
