/**
 * 工具函数模块
 * 包含游戏中常用的辅助函数
 */

// 画布和视图引用
let canvas = null;
let ctx = null;
let view = { w: 0, h: 0, scale: 1, ox: 0, oy: 0 };
let WORLD = { w: 800, h: 1000 };

export function initHelpers(canvasRef, ctxRef, worldConfig) {
  canvas = canvasRef;
  ctx = ctxRef;
  WORLD = worldConfig;
}

export function getView() {
  return view;
}

// 窗口大小调整
export function resize() {
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const w = Math.floor(window.innerWidth);
  const h = Math.floor(window.innerHeight);
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  view.w = w;
  view.h = h;
  view.scale = Math.min(w / WORLD.w, h / WORLD.h);
  view.ox = (w - WORLD.w * view.scale) / 2;
  view.oy = (h - WORLD.h * view.scale) / 2;
}

// 屏幕坐标转世界坐标
export function screenToWorld(px, py) {
  return {
    x: (px - view.ox) / view.scale,
    y: (py - view.oy) / view.scale,
  };
}

// 数值限制
export function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

// 计算长度
export function len(x, y) {
  return Math.hypot(x, y);
}

// 归一化向量
export function norm(x, y) {
  const l = Math.hypot(x, y) || 1;
  return { x: x / l, y: y / l, l };
}

// 随机数
export function rand(a, b) {
  return a + Math.random() * (b - a);
}

// 随机选择数组元素
export function pick(arr) {
  return arr[(Math.random() * arr.length) | 0];
}

// 颜色处理
export function withAlpha(color, alpha) {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (color.startsWith('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
  }
  return color;
}

// 颜色变暗
export function shade(color, percent) {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    const adjust = (value) => {
      const adjusted = Math.round(value * (1 + percent / 100));
      return Math.max(0, Math.min(255, adjusted));
    };
    
    const newR = adjust(r);
    const newG = adjust(g);
    const newB = adjust(b);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
  return color;
}
