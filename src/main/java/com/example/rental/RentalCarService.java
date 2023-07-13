package com.example.rental;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RentalCarService {

    private final RentalRepository rentalRepository;
    private final CarRepository carRepository;

    @Autowired
    public RentalCarService(RentalRepository rentalRepository, CarRepository carRepository) {
        this.rentalRepository = rentalRepository;
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() {
        return carRepository.getAllCars();
    }
    public Rental saveRental(Rental rental) {
        return rentalRepository.save(rental);
    }
    public List<Rental> getAllRentals() {
        return rentalRepository.getAllRentals();
    }
}
