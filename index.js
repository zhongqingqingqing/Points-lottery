/**
 * 1.初始化抽奖次数
 * 2.给开始抽奖添加点击事件
 * 2-1.给选中的列表添加选中样式
 * 2-2.删除以前渲染的选中样式
 * 2-3.循环列表
 * 2-4.添加定时器：定时循环
 * 2-5.制定随机数，保证随机停止计时器
 * 3.打开遮罩层
 * 3-1.给关闭按钮添加点击事件：关闭遮罩层
 * 3-2.给再来一次按钮添加点击事件：运行抽奖函数
 * 3-3.控制抽奖次数
 * 3-4.到达临界点后停止抽奖和再来一次
 * 3-5.获得获奖文案
 * 4.封装抽奖逻辑函数
 * 5.控制定时器不重开
 * 6.把整体放在一个立即执行函数中
 *
 *
 */

(function () {
  // 封装查找函数（单个元素的查找)
  function $(selector) {
    return document.querySelector(selector);
  }

  //定义变量
  var number = 4; //抽奖的次数
  var index = -1; //当前选中列表的下标
  var timerId; //定时器的标识
  var duration = 100; //间隔时间
  var randomNumber; //随机数

  // 获得需要操作的DOM
  var prizeTxt = $(".prize-Txt"); //抽奖次数
  var startDrawPrize = $(".controller-right"); //开始抽奖按钮部分
  var prizeLists = document.querySelectorAll(".prize-list"); //所有列表的集合
  var maskerDialog = $(".masker-dialog");
  var maskerTxt = $(".content-detail");
  var closeBtn = $(".close");
  var confirmBtn = $(".confirm-btn");
  // 入口函数
  function init() {
    //初始化抽奖次数
    prizeTxt.innerHTML = number;
    // 绑定注册事件
    initEvent();
  }

  // 注册事件的绑定
  function initEvent() {
    //给开始按钮绑定点击事件
    startDrawPrize.addEventListener("click", onStartClick);
    // 给关闭按钮绑定关闭事件
    closeBtn.addEventListener("click", function () {
      maskerDialog.style.display = "none";
    });
    // 给再来一次绑定点击事件
    confirmBtn.addEventListener("click", onConfirmBtnClick);
  }

  //开始抽奖的绑定事件
  function onStartClick() {
    // 没有抽奖机会时
    if (number === 0) {
      return;
    }

    runDrawPrize();
  }

  //再来一次的绑定事件
  function onConfirmBtnClick() {
    //运行抽奖函数
    runDrawPrize();
    //关闭遮罩层
    maskerDialog.style.display = "none";
    // 没有抽奖机会时
    if (number === 0) {
      confirmBtn.innerHTML = "确定";
      return;
    }
  }
  // 抽奖逻辑的封装函数
  function runDrawPrize() {
    // 有定时器时不重开
    if (timerId) {
      return;
    }

    // 没有抽奖机会时
    if (number === 0) {
      maskerDialog.style.display = "none";
      return;
    }
    //抽奖次数减一
    prizeTxt.innerHTML = --number;

    //控制一个随机数（3000-6000）
    randomNumber = 3000 + Math.floor(Math.random() * 3000);

    // 开定时器
    timerId = setInterval(function () {
      randomNumber -= 200;
      // 结束循环
      if (randomNumber <= 200) {
        //清除定时器
        clearInterval(timerId);
        timerId = null;
        //打开遮罩层
        openDialog();
        return;
      }

      // 控制选中列表的下标（0-7）
      index = ++index % prizeLists.length;

      // 删除之前渲染后的选中样式
      prizeLists.forEach(function (node) {
        node.classList.remove("active"); //有active就删除，没有就不管
      });

      //给列表项添加选中事件
      prizeLists[index].classList.add("active");
    }, duration);
  }

  // 打开遮罩层函数（弹出对话框）
  function openDialog() {
    //获得选中列表的获奖文案
    var spanTxt = $(".active span");
    //给弹出框文案赋值
    if (spanTxt.innerHTML === "谢谢参与") {
      maskerTxt.innerHTML = "加油！！！";
    } else {
      maskerTxt.innerHTML = "恭喜您获得了：" + spanTxt.innerHTML;
    }

    //遮罩层显示
    maskerDialog.style.display = "block";
  }
  // 一键启动
  init();
})();
