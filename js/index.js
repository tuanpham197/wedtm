const myForm = document.getElementById("myForm");
const btnSubmit = document.getElementById("btnSubmit");
const scriptUrl = "https://script.google.com/macros/s/AKfycbxWlSA9PeHqGyO6lCQCZ2SYOwmBGeeqKwSI6JYqWeJHu30gy2x5uwKy6HKERCmYjBA8/exec";

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
    };

    // Gửi request POST
    fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        mode: "no-cors"
    })
    
    .then(result => {
        console.log("Phản hồi từ server:", result);
        if (result.status === "success") {
            alert("Tuấn và Minh xin cảm ơn bạn đã gửi lời chúc!");
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
    alert("Tuấn và Minh xin cảm ơn bạn đã gửi lời chúc!");
});

function fetchAndRenderData() {
    fetch(scriptUrl, {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        return response.json(); // Lấy dữ liệu JSON từ server
    })
    .then(result => {
      console.log(result, 'Debug ')
        if (result.status === "success") {
            const data = result.data;
            console.log(data, 'Debug ')
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

// Đặt polling: 5000ms = 5 giây (tùy ý)
setInterval(fetchAndRenderData, 1000);