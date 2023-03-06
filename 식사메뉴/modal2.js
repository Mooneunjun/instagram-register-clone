// 获取第二个 modal 窗口和关闭按钮的元素
var deleteModalContainer = document.getElementById("delete-modal-container");
var deleteModalCloseButton = document.getElementById(
  "delete-modal-close-button"
);
// 获取所有 offcanvas items 元素
var offcanvasItems = document.querySelectorAll("#offcanvas li a");
// 获取 "메뉴편집" 菜单项的元素，并添加点击事件监听器
var offcanvasDeleteItem = document.querySelector(
  "#offcanvas li:last-of-type a"
);
offcanvasDeleteItem.addEventListener("click", function (e) {
  e.preventDefault();
  deleteModalContainer.style.display = "flex";
  showMenuList(); // 点击菜单项后，展示第二个 modal 窗口
});

// 为第二个 modal 窗口的关闭按钮添加点击事件监听器，点击后隐藏第二个 modal 窗口
deleteModalCloseButton.addEventListener("click", function (e) {
  e.preventDefault();
  deleteModalContainer.style.display = "none";
  // 在关闭模态窗口时移除所有 offcanvas items 的 'active' 类名
  offcanvasItems.forEach(function (item) {
    item.classList.remove("active");
  });
});

// 展示菜单列表
function showMenuList() {
  var menuList = JSON.parse(localStorage.getItem("menuList")) || []; // 从本地存储中获取菜单列表
  var menuListElem = document.getElementById("menu-list");
  menuListElem.innerHTML = "";
  menuList.forEach(function (item) {
    var li = document.createElement("li");
    li.innerHTML =
      item.name + " - " + item.price + "원" + " - " + item.rating + "스타";
    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "삭제";
    // 添加删除按钮的点击事件监听器
    deleteBtn.addEventListener("click", function () {
      deleteMenuItem(item.id); // 点击删除按钮后，删除该菜单项
    });
    li.appendChild(deleteBtn);
    menuListElem.appendChild(li);
  });
}

// 删除菜单项
function deleteMenuItem(itemId) {
  var menuList = JSON.parse(localStorage.getItem("menuList")) || []; // 从本地存储中获取菜单列表
  menuList = menuList.filter(function (item) {
    return item.id !== itemId;
  });
  localStorage.setItem("menuList", JSON.stringify(menuList)); // 更新本地存储中的菜单列表
  showMenuList(); // 更新菜单列表的显示
}
