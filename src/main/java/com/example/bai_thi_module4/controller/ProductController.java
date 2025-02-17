package com.example.bai_thi_module4.controller;


import com.example.bai_thi_module4.model.Product;
import com.example.bai_thi_module4.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private IProductService productService;

    @GetMapping("")
    public Iterable<Product> getAllProducts() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Product> getProductById(Long id) {
        return productService.findById(id);
    }
    @PutMapping("/{id}")
    public void updateProduct(@PathVariable Long id, @RequestBody Product productUpdate) {
        Optional<Product> productOptional = productService.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setName(productUpdate.getName());
            product.setPrice(productUpdate.getPrice());
            product.setStatus(productUpdate.getStatus());
            productService.save(product);
        }
    }
}
