package com.example.bai_thi_module4.repository;

import com.example.bai_thi_module4.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductTypeRepository extends JpaRepository<ProductType, Long> {
}
