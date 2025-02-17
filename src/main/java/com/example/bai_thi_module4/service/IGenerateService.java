package com.example.bai_thi_module4.service;

import java.util.Optional;

public interface IGenerateService<T> {
    Iterable<T> findAll();

    Optional<T> findById(Long id);


    void save(T object);

    void deleteById(Long id);

}
