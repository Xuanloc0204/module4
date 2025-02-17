package com.example.bai_thi_module4.service;

import com.example.bai_thi_module4.model.Product;
import com.example.bai_thi_module4.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService implements IProductService{
    @Autowired
    private IProductRepository productRepository;

    @Override
    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product object) {
        productRepository.save(object);
        return object;
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}
