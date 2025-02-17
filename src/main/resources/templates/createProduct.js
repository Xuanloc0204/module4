$(document).ready(function () {
    $("#addProductForm").submit(function (event) {
        event.preventDefault();

        let productData = {
            name: $("#product-name").val(),
            price: $("#product-price").val(),
            productType: $("#product-category").val(),
        };

        $.ajax({
            url: "http://localhost:8080/api/products",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(productData),
            success: function (response) {
                alert("Thêm sản phẩm thành công!");
                window.location.href = "list.html"; // Quay lại trang danh sách sản phẩm
            },
            error: function () {
                alert("Lỗi khi thêm sản phẩm!");
            }
        });
    });
});
