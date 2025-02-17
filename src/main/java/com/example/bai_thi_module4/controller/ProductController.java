package com.example.bai_thi_module4.controller;


import com.example.bai_thi_module4.model.Product;
import com.example.bai_thi_module4.model.ProductType;
import com.example.bai_thi_module4.service.IProductService;
import com.example.bai_thi_module4.service.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private IProductService productService;

    @Autowired
    private IProductTypeService productTypeService;

    @GetMapping
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("index");
        List<Product> productList = productService.findAll();
        List<ProductType> productTypeList = productTypeService.findAll();
        mv.addObject("productList", productList);
        mv.addObject("productTypeList", productTypeList);
        return mv;
    }

    @GetMapping("/create")
    public ModelAndView create() {
        ModelAndView mv = new ModelAndView("create");
        Product product = new Product();
        mv.addObject("product", product);
        List<ProductType> productTypeList = productTypeService.findAll();
        mv.addObject("productTypeList", productTypeList);
        return mv;
    }

    @GetMapping("/update/{id}")
    public ModelAndView update(@PathVariable Long id) {
        ModelAndView mv = new ModelAndView("update");
        Product product = productService.findById(id).get();
        mv.addObject("product", product);
        List<ProductType> productTypeList = productTypeService.findAll();
        mv.addObject("productTypeList", productTypeList);
        return mv;
    }

    @PostMapping
    public ModelAndView save(@ModelAttribute Product product) {
        productService.save(product);
        return new ModelAndView("redirect:/product");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProducts(@RequestBody List<Long> idList) {
        if (idList == null || idList.isEmpty()) {
            return ResponseEntity.badRequest().body("Danh sách ID không hợp lệ!");
        }

        for (Long id : idList) {
            Optional<Product> product = productService.findById(id);
            if (product.isPresent()) {
                productService.delete(product.get());
            }
        }

        return ResponseEntity.ok("Các sản phẩm đã bị xóa!");
    }




    @PutMapping("/{id}")
    public ModelAndView update(@ModelAttribute Product product, @PathVariable Long id) {
        productService.save(product);
        return new ModelAndView("redirect:/product");
    }

}