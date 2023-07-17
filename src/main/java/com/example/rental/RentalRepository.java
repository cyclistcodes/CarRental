package com.example.rental;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Integer> {
	@Query(value = "SELECT * FROM Rental", nativeQuery = true)
	List<Rental> getAllRentals();

	@Query(value = "SELECT COUNT(*) FROM Rental r WHERE r.car_model = :carModel AND ((:startDate BETWEEN r.start_date AND r.end_date) OR (:endDate BETWEEN r.start_date AND r.end_date))", nativeQuery = true)
	int countNumberOfOverlapsForCar(String carModel, LocalDate startDate, LocalDate endDate);
}
