let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";

// 防止 `null` 变成 `"null"`
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

let clickCount = 0; // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
  "点错了？",
  "大胆！",
  "追不上吧",
];

// 生成随机位置，确保按钮在窗口内
function getRandomPosition(button) {
  const safeMargin = 10; // 安全边距
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  // 计算随机的 X 坐标，确保按钮不会超出屏幕左侧和右侧
  const randomX = Math.floor(Math.random() * (windowWidth - buttonWidth - 2 * safeMargin)) + safeMargin;
  // 计算随机的 Y 坐标，确保按钮不会超出屏幕顶部和底部
  const randomY = Math.floor(Math.random() * (windowHeight - buttonHeight - 2 * safeMargin)) + safeMargin;

  return { x: randomX, y: randomY };
}

// No 按钮点击事件
noButton.addEventListener("click", function () {
  clickCount++;

  // 确保按钮的位置是绝对定位
  noButton.style.position = 'absolute';

  // 获取随机位置
  const { x, y } = getRandomPosition(noButton);

  // 应用随机的位置
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;

  // 移除 transform 样式，避免样式冲突
  noButton.style.transform = 'none';

  // No 文案变化（前 3 次变化）
  if (clickCount <= 3) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化
  if (clickCount === 1) mainImage.src = "images/shocked.png"; // 震惊
  if (clickCount === 2) mainImage.src = "images/think.png"; // 思考
  if (clickCount >= 3) mainImage.src = "images/angry.png"; // 生气
});

// Yes 按钮点击后，进入表白成功页面
const loveTest = `嘻嘻嘻！乖狗狗 ( >᎑<)♡︎ᐝ  ${
  username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

yesButton.addEventListener("click", function () {
  // 先创建基础 HTML 结构
  document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text"></h1>
            <img src="images/hug.png" alt="拥抱" class="yes-image">
        </div>
    `;

  // 确保用户名安全地插入
  document.querySelector(".yes-text").innerText = loveTest;

  // 禁止滚动，保持页面美观
  document.body.style.overflow = "hidden";
});
