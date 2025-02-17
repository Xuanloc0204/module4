package com.example.bai_thi_module4.service;

import com.example.bai_thi_module4.model.Product;

import java.util.Optional;

public interface IGenerateService<T> {
    Iterable<T> findAll();

    Optional<T> findById(Long id);


    Product save(T object);

    void deleteById(Long id);

}
