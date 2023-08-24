package com.sunbase.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private Integer id;

    private String uuid;
    @Size(min = 2, max = 20)
    private String firstName;
    @Size(min = 2, max = 20)
    private String lastName;
    @Size(min = 2, max = 40)
    private String street;
    @Size(min = 2, max = 80)
    private String address;
    @Size(min = 2, max = 40)
    private String city;
    @Size(min = 2, max = 40)
    private String state;
    @Size(min = 2, max = 40)
    private String email;
    private String phone;

}

