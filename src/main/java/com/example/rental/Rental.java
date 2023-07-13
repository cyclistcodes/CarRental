package com.example.rental;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table()
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    String fullName;

    @Column(nullable = false)
    LocalDate birthDate;

    @Column(nullable = false)
    String carModel;

    @Column(nullable = false)
    LocalDate startDate;

    @Column(nullable = false)
    LocalDate endDate;

    @Column(nullable = false)
    Integer totalRevenue;

    public Rental() {
    }

    public Rental(String fullName, LocalDate birthDate, String carModel, LocalDate startDate, LocalDate endDate, Integer totalRevenue) {
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.carModel = carModel;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalRevenue = totalRevenue;
    }
    public String getFullName() {
        return fullName;
    }
    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getCarModel() {
        return carModel;
    }

    public LocalDate getStartDate() {
        return startDate;
    }
    public LocalDate getEndDate() {
        return endDate;
    }

    public Integer getTotalRevenue() {
        return totalRevenue;
    }

}