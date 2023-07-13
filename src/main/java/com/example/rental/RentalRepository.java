package com.example.rental;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Integer> {
	@Query(value = "SELECT * FROM Rental", nativeQuery = true)
	List<Rental> getAllRentals();
}
