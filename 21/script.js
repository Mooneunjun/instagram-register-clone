// 获取页面元素
const balanceEl = document.getElementById("balance");
const rechargeBtn = document.getElementById("rechargeBtn");
const startBtn = document.getElementById("startBtn");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const betAmountEl = document.getElementById("betAmount");
const resultTitleEl = document.getElementById("resultTitle");
const playerChoiceEl = document.getElementById("playerChoice");
const computerChoiceEl = document.getElementById("computerChoice");
const resultEl = document.getElementById("result");
const modalEl = document.getElementById("myModal");
const modalContentEl = document.querySelector(".modal-content");
const modalCloseEl = document.querySelector(".close");

// 玩家选择
let playerChoice = "";
rockBtn.addEventListener("click", () => {
  selectChoice(rockBtn);
});

paperBtn.addEventListener("click", () => {
  selectChoice(paperBtn);
});

scissorsBtn.addEventListener("click", () => {
  selectChoice(scissorsBtn);
});

function selectChoice(btn) {
  rockBtn.classList.remove("selected");
  paperBtn.classList.remove("selected");
  scissorsBtn.classList.remove("selected");
  btn.classList.add("selected");
  playerChoice = btn.getAttribute("data-choice");
}

// 充值
rechargeBtn.addEventListener("click", () => {
  let amount = prompt("请输入充值金额：");
  if (amount !== null && amount !== "") {
    let balance = parseInt(localStorage.getItem("balance") || 0);
    balance += parseInt(amount);
    localStorage.setItem("balance", balance);
    balanceEl.textContent = `余额：${balance} 元`;
    alert(`充值成功，当前余额为 ${balance} 元。`);
  }
});

// 更新余额
function updateBalance() {
  let balance = parseInt(localStorage.getItem("balance") || 0);
  balanceEl.textContent = `余额：${balance} 元`;
}

updateBalance();

// 开始游戏
startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let betAmount = betAmountEl.value;
  if (betAmount <= 0) {
    alert("下注金额必须大于0。");
    return;
  }
  let balance = parseInt(localStorage.getItem("balance") || 0);
  if (betAmount > balance) {
    alert("余额不足，请先充值。");
    return;
  }
  // 检查用户是否选择了石头、剪刀或布
  if (playerChoice === "") {
    alert("请选择您要出的石头、剪刀或布。");
    return;
  }
  let computerChoice = getComputerChoice();
  playerChoiceEl.innerHTML = `
    <div class="player-choice ${playerChoice}">
      <i class="fas fa-hand-${playerChoice}">${playerChoice}</i>
    </div>
  `;
  computerChoiceEl.innerHTML = `
    <div class="computer-choice ${computerChoice}">
      <i class="fas fa-hand-${computerChoice}">${playerChoice}</i>
    </div>
  `;
  let result = getResult(playerChoice, computerChoice);
  let message = getMessage(result);
  let winAmount = betAmount * getWinAmount(result);
  resultEl.textContent = message;
  resultTitleEl.textContent = message;

  let playerChoices = "";
  if (playerChoice == "rock") {
    playerChoices = "✊🏻";
  } else if (playerChoice == "scissors") {
    playerChoices = "✌🏻";
  } else if (playerChoice == "paper") {
    playerChoices = "✋🏻";
  }

  let computerChoices = "";
  if (computerChoice == "rock") {
    computerChoices = "✊🏻";
  } else if (computerChoice == "scissors") {
    computerChoices = "✌🏻";
  } else if (computerrChoice == "paper") {
    computerChoices = "✋🏻";
  }
  modalContentEl.innerHTML = `
  <div class="modal-header">
  <h2 id="resultTitle">결과</h2>
  <span class="close">&times;</span>
</div>
<div class="modal-body">
<div class="player">
  <h3>你出的是</h3>
    <div class="player-choice ${playerChoice}">
      <i class="fas fa-hand-${playerChoice}">${playerChoices}</i>
    </div>
    </div>
    <div class="versus">
      VS
    </div>
    <div class="computer">
    <h3>电脑出的是</h3>
    <div class="computer-choice ${computerChoice}">
      <i class="fas fa-hand-${computerChoice}">${computerChoices}</i>
    </div>
    </div>
    <div class="modal-footer">
    <div class="result ${result}">
      ${message}
      <br>
      ${winAmount > 0 ? `赢得 ${winAmount} 元！` : ""}
      </div>
    </div>
  `;
  modalEl.style.display = "block";
  if (result === "win") {
    balance += betAmount * 2;
  } else if (result === "lose") {
    balance -= betAmount;
  }
  localStorage.setItem("balance", balance);
  updateBalance();
  rockBtn.classList.remove("selected");
  paperBtn.classList.remove("selected");
  scissorsBtn.classList.remove("selected");
});

// 获取电脑选择
function getComputerChoice() {
  let choices = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// 获取游戏结果
function getResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "draw";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    let betAmount = parseInt(betAmountEl.value);
    let winAmount = betAmount * 2;
    balance += winAmount;
    localStorage.setItem("balance", balance);
    updateBalance();
    return "win";
  } else {
    let betAmount = parseInt(betAmountEl.value);
    balance -= betAmount;
    localStorage.setItem("balance", balance);
    updateBalance();
    return "lose";
  }
}

// 获取游戏结果信息
function getMessage(result) {
  if (result === "draw") {
    return "平局";
  } else if (result === "win") {
    return "你赢了！";
  } else {
    return "你输了。";
  }
}

// 获取赢得金额倍数
function getWinAmount(result) {
  if (result === "win") {
    return 2;
  } else {
    return 0;
  }
}

// 关闭 modal
modalCloseEl.addEventListener("click", () => {
  console.log("Close button clicked!");
  modalEl.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    modalEl.style.display = "none";
  }
});
