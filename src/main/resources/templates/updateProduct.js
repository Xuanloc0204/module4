$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert("Không tìm thấy ID sản phẩm!");
        window.location.href = "list.html"; // Chuyển hướng nếu không có ID
    }

    // Lấy thông tin sản phẩm và hiển thị lên form
    $.ajax({
        url: `http://localhost:8080/api/products/${id}`,
        type: 'GET',
        dataType: 'json',
        success: function (product) {
            $('#name').val(product.name);
            $('#price').val(product.price);
            $('#type').val(product.productType.id);
            $('#status').val(product.status);
        },
        error: function () {
            alert("Không thể tải dữ liệu sản phẩm!");
        }
    });

    // Xử lý sự kiện cập nhật
    $('#updateProductForm').submit(function (event) {
        event.preventDefault();

        let formData = {
            name: $('#name').val(),
            price: $('#price').val(),
            productType: { id: $('#type').val() },
            status: $('#status').val()
        };

        $.ajax({
            url: `http://localhost:8080/api/products/${id}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function () {
                alert('Cập nhật thành công!');
                window.location.href = "list.html"; // Quay lại danh sách
            },
            error: function () {
                alert("Lỗi khi cập nhật sản phẩm!");
            }
        });
    });

    // Đóng form
    $('#closeFormBtn').click(function () {
        window.location.href = "list.html";
    });
});
