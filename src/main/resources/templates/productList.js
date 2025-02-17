$(document).ready(function () {
    function loadProduct() {
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/api/products",
            success: function (data) {
                let index = 1;
                let productsHtml = "";
                data.forEach((product) => {
                    productsHtml += `
                    <tr>
                        <td>${index++}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.productType}</td>
                        <td>${product.status}</td>
                        <td>${product.details}</td>
                        <td class="action-buttons">
                            <button onclick="navigateToEdit(${product.id})">&#9998;</button>
                        </td>
                    </tr>`;
                });
                $("#product").html(productsHtml);
            },
            error: function () {
                alert("Không thể tải danh sách sản phẩm.");
            }
        });
    }

    loadProduct();
});