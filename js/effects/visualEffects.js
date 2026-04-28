/**
 * 视觉效果系统模块
 * 处理粒子效果、闪光效果等视觉特效
 */

import { rand, withAlpha } from '../core/helpers.js';

const MAX_PARTICLES = 100;

let particles = [];

export function getParticles() {
  return particles;
}

export function setParticles(p) {
  particles = p;
}

// 创建烟雾效果
export function puff(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      vx: rand(-120, 120),
      vy: rand(-160, 40),
      r: rand(2, 6),
      t: 0,
      dur: rand(0.25, 0.55),
      color,
    });
  }
}

// 创建闪光效果
export function sparkle(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      vx: rand(-180, 180),
      vy: rand(-180, 180),
      r: rand(2, 7),
      t: 0,
      dur: rand(0.35, 0.75),
      color,
    });
  }
}

// 更新粒子
export function updateParticles(dt) {
  // 限制最大粒子数量，避免性能问题
  if (particles.length > MAX_PARTICLES) {
    particles = particles.slice(-MAX_PARTICLES);
  }
  
  for (const p of particles) {
    p.t += dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 200 * dt; // gravity
  }
  particles = particles.filter((p) => p.t < p.dur);
}

// 渲染粒子
export function drawParticles(g) {
  for (const p of particles) {
    const a = 1 - p.t / p.dur;
    g.fillStyle = withAlpha(p.color, a);
    g.beginPath();
    g.arc(p.x, p.y, p.r * (0.8 + 0.3 * a), 0, Math.PI * 2);
    g.fill();
  }
}

// 清空粒子
export function clearParticles() {
  particles = [];
}
