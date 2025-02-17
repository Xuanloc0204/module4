package com.example.bai_thi_module4.repository;

import com.example.bai_thi_module4.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Long> {
}
