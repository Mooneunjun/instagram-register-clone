// 获取随机抽选相关元素
var randomButton = document.getElementById("random-button");
var randomResult = document.getElementById("random-result");

// 绑定点击事件，实现随机抽选功能
randomButton.addEventListener("click", function () {
  // 从localStorage中获取menuList
  var menuList = JSON.parse(localStorage.getItem("menuList")) || [];
  // 计算权重和概率之和
  var totalWeight = 0;
  for (var i = 0; i < menuList.length; i++) {
    totalWeight += menuList[i].weight;
  }

  // 随机生成一个0到1之间的浮点数，作为随机数
  var randomNum = Math.random();

  // 遍历菜单列表，根据随机数和概率计算选中的菜单项
  var selectedMenuItem = null;
  var cumulativeProbability = 0;
  for (var i = 0; i < menuList.length; i++) {
    // 计算当前菜单项的概率和权重所占总概率和总权重的比例
    var itemProbability = menuList[i].weight / totalWeight;

    // 累加概率，当累加值大于等于随机数时，选中当前菜单项
    cumulativeProbability += itemProbability;
    if (randomNum < cumulativeProbability) {
      selectedMenuItem = menuList[i];
      break;
    }
  }

  // 将选中的菜单项信息显示在页面上
  if (selectedMenuItem) {
    randomResult.innerHTML =
      "<div>메뉴 : " +
      selectedMenuItem.name +
      "</div><div>가격 : " +
      selectedMenuItem.price +
      "</div><div>평점 : " +
      selectedMenuItem.rating +
      "</div>";
  } else {
    randomResult.innerHTML = "메뉴 먼저 추가 하세요";
  }
});
