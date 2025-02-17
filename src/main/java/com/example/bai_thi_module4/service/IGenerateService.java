package com.example.bai_thi_module4.service;

import java.util.List;
import java.util.Optional;

public interface IGenerateService<T> {
    List<T> findAll();

    Optional<T> findById(Long id);


    void save(T object);

    void delete(T t);

}
