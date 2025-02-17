package com.example.bai_thi_module4.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_loai_sp", referencedColumnName = "cid")
    private ProductType productType;

    // Không cần thiết phải tạo lại getter/setter do Lombok đã sinh tự động
}
