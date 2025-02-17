$(document).ready(function () {
    let currentPage = 1;
    let pageSize = 5; // Số sản phẩm trên mỗi trang

    function loadProduct(page = 1) {
        $.ajax({
            method: "GET",
            url: `http://localhost:8080/api/products?page=${page}&limit=${pageSize}`,
            success: function (data) {
                let index = (page - 1) * pageSize + 1;
                let productsHtml = "";

                data.forEach((product) => {
                    let productTypeName = product.productType ? product.productType.name : "Chưa phân loại"; // Kiểm tra null

                    productsHtml += `
                    <tr>
                        <td>${index++}</td>
                        <td><input type="checkbox" value="${product.id}"></td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${productTypeName}</td>
                        <td>${product.status}</td>
                        <td class="action-buttons">
                            <button onclick="redirectToUpdate(${product.id})">Sửa</button>
                        </td>
                    </tr>`;
                });

                $("#product").html(productsHtml);
                updatePagination(data.totalPages);
            },
            error: function () {
                alert("Không thể tải danh sách sản phẩm.");
            }
        });
    }

    function updatePagination(totalPages) {
        let paginationHtml = "";

        if (currentPage > 1) {
            paginationHtml += `<button class="page-btn" data-page="${currentPage - 1}">Trước</button>`;
        }

        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        if (currentPage < totalPages) {
            paginationHtml += `<button class="page-btn" data-page="${currentPage + 1}">Sau</button>`;
        }

        $("#pagination").html(paginationHtml);
    }

    $(document).on("click", ".page-btn", function () {
        currentPage = $(this).data("page");
        loadProduct(currentPage);
    });

    loadProduct();
});


$("#delete-btn").click(function() {
    let selectedProducts = [];
    $("#product input[type='checkbox']:checked").each(function () {
        selectedProducts.push($(this).val());
    });

    if (selectedProducts.length === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm để xóa.");
        return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?")) {
        $.ajax({
            url: "delete_products.php",
            type: "POST",
            data: {productIds: selectedProducts},
            success: function (response) {
                alert(response);
                fetchProducts();
            },
            error: function () {
                alert("Lỗi khi xóa sản phẩm.");
            }
        });
    }
});

$(document).ready(function () {
    // Hiển thị form khi nhấn nút
    $('#editCoachBtn').click(function () {
        $('#updateCoachContainer').fadeIn();
    });

    // Ẩn form khi nhấn nút đóng
    $('#closeFormBtn').click(function () {
        $('#updateCoachContainer').fadeOut();
    });

    // Lấy ID từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        // Load dữ liệu huấn luyện viên vào form
        $.ajax({
            url: `http://localhost:8080/api/products/${id}`,
            type: 'GET',
            dataType: 'json',
            success: function (product) {
                $('#name').val(product.name);
                $('#price').val(product.price);
                $('#type').val(product.productType);
                $('#status').val(product.status);
            },
            error: function (xhr, status, error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
                alert('Không thể tải dữ liệu.');
            }
        });
    }


    // Xử lý sự kiện cập nhật
    $('#updateProductForm').submit(function (event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append("name", $('#name').val());
        formData.append("price", $('#price').val());
        formData.append("tyoe", $('#type').val());
        formData.append("status", $('#status').val());

        $.ajax({
            url: `http://localhost:8080/api/products/${id}`,
            type: "PUT",
            processData: false,
            contentType: false,
            data: formData,
            success: function (response) {
                alert('Cập nhật thành công!');
                $('#updateProductContainer').fadeOut();
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error("Lỗi cập nhật:", error);
                alert("Không thể cập nhật dữ liệu.");
            }
        });
    });

});

function redirectToUpdate(productId) {
    window.location.href = `update.html?id=${productId}`;
}