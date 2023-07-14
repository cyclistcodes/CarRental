package com.example.rental;

import javax.persistence.*;


@Entity
@Table()
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)   
    private String model;
    @Column(nullable = false)
    private Integer price;

    public Integer getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public Integer getPrice() {
        return price;
    } 
}