const myForm = document.getElementById("myForm");
const btnSubmit = document.getElementById("btnSubmit");
const scriptUrl = "https://script.google.com/macros/s/AKfycby8SsIPGgTzriv6-0t2y12QPhqrbyOxbMRAWb6XLglTwmsRdV5GUP4EOObbFTSa4CMX/exec";

btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Nút submit được click!");
    
    // Lấy giá trị từ form
    const nameVal = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim(); // Bỏ comment để sử dụng
    
    // Kiểm tra dữ liệu
    if (!nameVal || !message) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Tạo object dữ liệu
    const data = {
        name: nameVal,
        message: message,
        timestamp: new Date().toISOString() // Thêm timestamp nếu cần
    };

    // Gửi request POST
    fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        mode: "no-cors" // Thêm dòng này
        // Loại bỏ mode: "no-cors" để nhận được response
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log("Phản hồi từ server:", result);
        if (result.status === "success") {
            alert("Đã gửi thành công!");
            // Reset form nếu cần
            myForm.reset();
            // Cập nhật danh sách hiển thị
            fetchAndRenderData();
        }
    })
    .catch(error => {
        console.error("Lỗi:", error);
        alert("Có lỗi xảy ra khi gửi dữ liệu!");
    });
});

function fetchAndRenderData() {
    fetch(scriptUrl, {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        if (result.status === "success") {
            const data = result.data;
            const reversedData = data.reverse();
            const container = document.getElementById("scrollBox");

            let html = "";
            reversedData.forEach((item) => {
                html += `<div class="message"><span id="name_guest">${item.name}</span>:<i> ${item.message}</i></div>`;
            });
            container.innerHTML = html;
        } else {
            console.error("Server error:", result.message);
        }
    })
    .catch(err => {
        console.error("Lỗi fetch:", err);
    });
}

// Gọi hàm lần đầu
fetchAndRenderData();