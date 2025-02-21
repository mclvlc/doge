let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

// 为按钮父容器添加样式，确保有足够宽度且不换行
document.body.style.whiteSpace = 'nowrap';
document.body.style.width = '100%';
document.body.style.display = 'flex';
document.body.style.flexWrap = 'nowrap';
document.body.style.alignItems = 'center';
document.body.style.justifyContent = 'center';

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

// 检测用户是否为电脑设备
function isDesktop() {
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 生成随机位置，确保按钮在窗口内
function getRandomPosition(button) {
  const safeMargin = 10; // 安全边距
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  // 计算随机的 X 坐标，确保按钮不会超出屏幕左侧和右侧
  let randomX = Math.floor(Math.random() * (windowWidth - buttonWidth - 2 * safeMargin)) + safeMargin;
  // 计算随机的 Y 坐标，确保按钮不会超出屏幕顶部和底部
  let randomY = Math.floor(Math.random() * (windowHeight - buttonHeight - 2 * safeMargin)) + safeMargin;

  // 如果是电脑设备，将坐标减半
  if (isDesktop()) {
    randomX = randomX / 2;
    randomY = randomY / 2;
  }

  return { x: randomX, y: randomY };
}

// 为 No 按钮添加过渡效果，将时间改为 0.15s
noButton.style.transition = 'left 0.15s ease, top 0.15s ease';

// No 按钮点击事件
noButton.addEventListener("click", function () {
  clickCount++;

  // No 文案变化（前 3 次变化）
  if (clickCount <= 3) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化
  if (clickCount === 1) mainImage.src = "images/shocked.png"; // 震惊
  if (clickCount === 2) mainImage.src = "images/think.png"; // 思考
  if (clickCount >= 3) mainImage.src = "images/angry.png"; // 生气

  // 第一次和第二次点击后切换按钮位置
  if (clickCount === 1 || clickCount === 2) {
    const tempLeft = yesButton.style.left;
    const tempTop = yesButton.style.top;
    yesButton.style.left = noButton.style.left;
    yesButton.style.top = noButton.style.top;
    noButton.style.left = tempLeft;
    noButton.style.top = tempTop;
  }

  // 前两次点击不移动，第三次点击开始移动
  if (clickCount >= 3) {
    // 确保按钮的位置是绝对定位
    if (clickCount === 3) {
      // 在第三次点击时，先设置初始位置样式，让浏览器渲染一次
      requestAnimationFrame(() => {
        noButton.style.position = 'absolute';
        const { x, y } = getRandomPosition(noButton);
        // 移除 transform 样式，避免样式冲突
        noButton.style.transform = 'none';
        // 应用随机的位置
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
      });
    } else {
      // 第三次之后的点击，正常移动
      noButton.style.position = 'absolute';
      const { x, y } = getRandomPosition(noButton);
      // 移除 transform 样式，避免样式冲突
      noButton.style.transform = 'none';
      // 应用随机的位置
      noButton.style.left = `${x}px`;
      noButton.style.top = `${y}px`;
    }

    // 第三次点击后循环 16 次随机移动
    if (clickCount >= 3) {
      let loopCount = 0;
      const intervalId = setInterval(() => {
        if (loopCount >= 16) {
          clearInterval(intervalId);
          return;
        }
        const { x, y } = getRandomPosition(noButton);
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
        loopCount++;
      }, 150); // 这里的 150 是移动间隔时间，和过渡时间对应，可以根据需要调整
    }
  }
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
