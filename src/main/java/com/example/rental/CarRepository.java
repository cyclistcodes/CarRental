package com.example.rental;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    @Query(value = "SELECT * FROM car", nativeQuery = true)
    public List<Car> getAllCars();

    @Query(value = "SELECT * FROM car WHERE id = :id", nativeQuery = true)
    public Car getCarById(@Param("id") int id);
}
