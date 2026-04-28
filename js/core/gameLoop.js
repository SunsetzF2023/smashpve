/**
 * 游戏循环模块
 * 处理游戏主循环、更新和渲染
 */

// 画布和上下文引用
let canvas = null;
let ctx = null;

// 游戏循环状态
let animationId = null;
let lastTime = 0;

// 回调函数
let updateCallback = null;
let renderCallback = null;

export function initGameLoop(canvasRef, ctxRef, updateFn, renderFn) {
  canvas = canvasRef;
  ctx = ctxRef;
  updateCallback = updateFn;
  renderCallback = renderFn;
}

export function startGameLoop() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  lastTime = performance.now();
  loop();
}

export function stopGameLoop() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function loop(currentTime = performance.now()) {
  const dt = Math.min((currentTime - lastTime) / 1000, 0.1); // 限制最大dt为0.1秒
  lastTime = currentTime;

  if (updateCallback) {
    updateCallback(dt);
  }

  if (renderCallback) {
    renderCallback(ctx);
  }

  animationId = requestAnimationFrame(loop);
}

export function isRunning() {
  return animationId !== null;
}
