
// Bài tập 1: Thay đổi nội dung của một phần tử
document.getElementById("title").textContent = "Hello, DOM!";

// Bài tập 2: Thay đổi màu sắc của phần tử
document.getElementById("text").style.color = "red";

// Bài tập 3: Thêm phần tử mới vào DOM
let newItem = document.createElement("li");
newItem.textContent = "New Item";
document.getElementById("list").appendChild(newItem);

// Bài tập 4: Xóa phần tử khỏi DOM
let elementToRemove = document.getElementById("remove-me");
elementToRemove.parentNode.removeChild(elementToRemove);

// Bài tập 5: Thay đổi thuộc tính của phần tử
document.getElementById("image").src = "new-image.jpg";

// Bài tập 6: Xử lý sự kiện click
document.getElementById("btn").addEventListener("click", function() {
    alert("Button clicked!");
});

// Bài tập 7: Thay đổi nội dung của nhiều phần tử
let paragraphs = document.getElementsByTagName("p");
for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].textContent = "Updated paragraph";
}

// Bài tập 8: Tạo một bảng động
let table = document.createElement("table");

for (let i = 0; i < 3; i++) {
    let row = table.insertRow();
    for (let j = 0; j < 3; j++) {
        let cell = row.insertCell();
        cell.textContent = `Row ${i + 1}, Cell ${j + 1}`;
    }
}

document.getElementById("table-container").appendChild(table);

// Bài tập 9: Đếm số lượng phần tử trong DOM
let divCount = document.getElementsByTagName("div").length;
console.log("Number of <div> elements:", divCount);

// Bài tập 10: Thay đổi nội dung bằng cách thao tác với Class
let items = document.getElementsByClassName("item");
for (let i = 0; i < items.length; i++) {
    items[i].textContent = "Updated item";
}
