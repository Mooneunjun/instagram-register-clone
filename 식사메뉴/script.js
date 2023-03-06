const offcanvasButton = document.getElementById("offcanvas-button");
const offcanvas = document.getElementById("offcanvas");
const offcanvasHeader = document.querySelector(".offcanvas-header");
const offcanvasCloseButton = document.getElementById("offcanvas-close-button");
const offcanvasOverlay = document.getElementById("offcanvas-overlay");
var offcanvasLinks = document.querySelectorAll("#offcanvas ul li a");




// 点击 Offcanvas 按钮打开 Offcanvas
offcanvasButton.addEventListener("click", () => {
  offcanvas.classList.add("open");
  offcanvasOverlay.classList.add("open");
  // 重置 delta 变量
  delta = 0;
  offcanvas.style.transform = "translateX(0%)";
});

// 点击 Offcanvas 关闭按钮关闭 Offcanvas
offcanvasCloseButton.addEventListener("click", () => {
  offcanvas.classList.remove("open");
  offcanvasOverlay.classList.remove("open");
  offcanvas.style.transform = "translateX(-100%)";
  // 关闭 Offcanvas 时删除所有菜单项链接的“active”类
  offcanvasLinks.forEach(function (link) {
    link.classList.remove("active");
  });
});

// 点击 Offcanvas 外部关闭 Offcanvas
offcanvasOverlay.addEventListener("click", (event) => {
  // 判断点击事件是否是由于点击 Offcanvas 内部元素而导致的
  if (!event.target.closest("#offcanvas")) {
    offcanvas.classList.remove("open");
    offcanvasOverlay.classList.remove("open");
    offcanvas.style.transform = "translateX(-100%)";
    // 关闭 Offcanvas 时删除所有菜单项链接的“active”类
    offcanvasLinks.forEach(function (link) {
      link.classList.remove("active");
    });
  }
});

// offcanvas内部item点击后给active类
for (var i = 0; i < offcanvasLinks.length; i++) {
  offcanvasLinks[i].addEventListener("click", function () {
    // 移除所有菜单项的“active”类
    for (var j = 0; j < offcanvasLinks.length; j++) {
      offcanvasLinks[j].classList.remove("active");
    }
    // 将当前点击的菜单项添加“active”类
    this.classList.add("active");
  });
}

// 添加“关闭”按钮的 click 事件监听器
offcanvasCloseButton.addEventListener("click", function () {
  // 移除所有菜单项的“active”类
  for (var i = 0; i < offcanvasLinks.length; i++) {
    offcanvasLinks[i].classList.remove("active");
  }
});

let startX;
let currentX;
let previousX = 0;
let delta = 0;
let threshold = 50;

offcanvas.addEventListener("touchstart", handleTouchStart, false);
offcanvas.addEventListener("touchmove", handleTouchMove, false);
offcanvas.addEventListener("touchend", handleTouchEnd, false);

function handleTouchStart(event) {
  startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  event.preventDefault();
  currentX = event.touches[0].clientX;
  delta = currentX - startX;

  // 添加 notransition 类，禁用过渡动画
  offcanvas.classList.add("notransition");

  // 限制 Offcanvas 的左右拖动范围
  if (delta > 0) {
    delta = 0;
  } else if (delta < -offcanvas.offsetWidth) {
    delta = -offcanvas.offsetWidth;
  }

  offcanvas.style.transform = "translateX(" + delta + "px)";
}

function handleTouchEnd(event) {
  if (delta < -threshold) {
    // 关闭 Offcanvas
    offcanvas.style.transform = "translateX(-100%)";
    // 关闭 Offcanvas
    offcanvas.classList.remove("open");
    offcanvasOverlay.classList.remove("open");
    // 移除所有链接的“active”类
    offcanvasLinks.forEach((link) => {
      link.classList.remove("active");
    });
  } else {
    // 回到 Offcanvas 的原始位置
    offcanvas.style.transform = "translateX(0%)";
    // 移除所有链接的“active”类
    offcanvasLinks.forEach((link) => {
      link.classList.remove("active");
    });
  }

  // 移除 notransition 类，重新启用过渡动画
  offcanvas.classList.remove("notransition");
}
