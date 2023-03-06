// 获取modal窗口和关闭按钮
var modalContainer = document.getElementById("modal-container");
var modalCloseButton = document.getElementById("modal-close-button");

// 获取offcanvas中的第一个item
var offcanvasItem = document.querySelector("#offcanvas li:first-of-type a");
// 获取所有 offcanvas items 元素
var offcanvasItems = document.querySelectorAll("#offcanvas li a");
// 为offcanvasItem添加点击事件
offcanvasItem.addEventListener("click", function (e) {
  e.preventDefault();
  modalContainer.style.display = "flex";
});

// 为关闭按钮添加点击事件
modalCloseButton.addEventListener("click", function (e) {
  e.preventDefault();
  modalContainer.style.display = "none";
  stars.forEach(function (s) {
    s.classList.remove("hover");
    s.classList.remove("checked");
  });

  // 在关闭模态窗口时移除所有 offcanvas items 的 'active' 类名
  offcanvasItems.forEach(function (item) {
    item.classList.remove("active");
  });

  // 重置输入框的值
  document.getElementById("name-input").value = "";
  document.getElementById("price-input").value = "";
  ratingInput.value = "";
});

// 获取所有星星元素
var stars = document.querySelectorAll(".star");
// 获取隐藏的rating-input元素
var ratingInput = document.getElementById("rating-input");

// 为每个星星添加点击事件
// 为每个星星添加鼠标移入事件
stars.forEach(function (star, index) {
  star.addEventListener("mouseover", function () {
    // 将当前星星及之前的星星添加hover类名
    for (var i = 0; i <= index; i++) {
      stars[i].classList.add("hover");
    }
  });

  // 为每个星星添加鼠标移出事件
  star.addEventListener("mouseout", function () {
    // 将所有星星的hover类名移除
    stars.forEach(function (s) {
      s.classList.remove("hover");
    });
  });

  // 为每个星星添加点击事件
  star.addEventListener("click", function () {
    // 将所有星星的样式恢复到默认状态
    stars.forEach(function (s) {
      s.classList.remove("checked");
    });

    // 将当前星星及之前的所有星星设置为选中状态
    for (var i = 0; i <= index; i++) {
      stars[i].classList.add("checked");
    }

    // 将选中的评分值赋给隐藏的rating-input元素
    ratingInput.value = this.getAttribute("data-value");
  });
});
////
//
//
//
//
// 获取表单元素和提交按钮
var form = document.querySelector("form");
var submitButton = form.querySelector("button[type=submit]");

// 绑定表单提交事件
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // 获取输入值
  var name = document.getElementById("name-input").value;
  var price = document.getElementById("price-input").value;
  var rating = ratingInput.value;

  // 计算评分概率权重
  var ratingWeight = Math.pow(rating, 1);

  // 生成一个唯一的ID作为菜单项的ID
  var id = new Date().getTime();

  // 创建新菜单项
  var newMenuItem = {
    id: id,
    name: name,
    price: price,
    rating: rating,
    weight: ratingWeight,
  };

  // 从localStorage中获取menuList
  var menuList = JSON.parse(localStorage.getItem("menuList")) || [];

  // 将新菜单项添加到菜单列表中
  menuList.push(newMenuItem);
  // 将更新后的菜单列表保存到localStorage中
  localStorage.setItem("menuList", JSON.stringify(menuList));

  // 从localStorage中获取最新的菜单列表
  menuList = JSON.parse(localStorage.getItem("menuList"));

  // 重置表单和评分星星状态
  form.reset();
  stars.forEach(function (s) {
    s.classList.remove("checked");
  });

  // 禁用提交按钮
  submitButton.disabled = true;
  submitButton.classList.add("disabled");
  // 显示添加成功提示
  submitButton.innerHTML = "<div class='loader'></div>";
  setTimeout(function () {
    submitButton.innerHTML = "등록완료";
  }, 300);
  setTimeout(function () {
    submitButton.innerHTML = "등록";
    // 启用提交按钮
    submitButton.disabled = false;
    submitButton.classList.remove("disabled");
  }, 1000);
});
