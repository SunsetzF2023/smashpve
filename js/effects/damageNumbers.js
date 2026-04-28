/**
 * 伤害数字显示系统模块
 * 处理伤害数字的显示、更新和渲染
 */

import { withAlpha } from '../core/helpers.js';

const MAX_DAMAGE_NUMBERS = 50;

let damageNumbers = [];

export function getDamageNumbers() {
  return damageNumbers;
}

export function setDamageNumbers(nums) {
  damageNumbers = nums;
}

// 显示伤害数字
export function showDamageNumber(x, y, damage, type = "normal") {
  const colors = {
    normal: "#ff4444",
    crit: "#ff8800",
    heal: "#44ff44",
    burn: "#ff6b35"
  };
  
  damageNumbers.push({
    x: x,
    y: y,
    damage: Math.round(damage),
    color: colors[type] || colors.normal,
    t: 0,
    dur: 1.5,
    vy: -60 // 向上飘的速度
  });
}

// 更新伤害数字
export function updateDamageNumbers(dt) {
  // 限制最大伤害数字数量
  if (damageNumbers.length > MAX_DAMAGE_NUMBERS) {
    damageNumbers = damageNumbers.slice(-MAX_DAMAGE_NUMBERS);
  }
  
  for (const dn of damageNumbers) {
    dn.t += dt;
    dn.y += dn.vy * dt;
    dn.vy += 150 * dt; // 重力效果，让数字下落
  }
  damageNumbers = damageNumbers.filter((dn) => dn.t < dn.dur);
}

// 渲染伤害数字
export function drawDamageNumbers(g) {
  for (const dn of damageNumbers) {
    const a = 1 - dn.t / dn.dur;
    const scale = 1.0 + (1 - a) * 0.5; // 开始时稍大，逐渐缩小
    
    g.save();
    g.translate(dn.x, dn.y);
    g.scale(scale, scale);
    
    // 描边
    g.strokeStyle = "rgba(0, 0, 0, 0.8)";
    g.lineWidth = 3;
    g.font = "bold 16px sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.strokeText(dn.damage.toString(), 0, 0);
    
    // 填充
    g.fillStyle = withAlpha(dn.color, a);
    g.fillText(dn.damage.toString(), 0, 0);
    
    g.restore();
  }
}

// 清空伤害数字
export function clearDamageNumbers() {
  damageNumbers = [];
}
