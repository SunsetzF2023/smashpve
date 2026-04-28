/**
 * 角色实体类
 * 玩家发射的卡牌单位
 * 
 * 注意：由于Role类代码量很大（约800行），
 * 完整实现暂时保留在game.js中
 * 此文件仅作为模块化结构的占位符
 */

export class Role {
  constructor(card, x, y, vx, vy) {
    this.card = card;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = card.radius;
    this.m = Math.max(0.55, card.weight);
    this.drag = card.drag ?? 2.35;
    this.bounce = 0.84;
    this.hp = 999;
    this.stopped = false;
    this.stopTimer = 0;
    this.effectCd = 0;
    this.lastColl = -999;
    this.rotation = 0;
    this.trail = [];
    this.lastTrailTime = 0;
    this.maxLife = card.life ?? 14;
    this.life = this.maxLife;
    this.dead = false;
    this.stopTriggers = 0;
    this.vampiricEndTime = 0;
    this.burnTarget = null;
    this.burnDamage = 0;
    this.burnStartTime = 0;
    this.lastBurnTarget = null;
    this.trackingCooldown = 0;
  }

  speed() {
    return Math.hypot(this.vx, this.vy);
  }

  // 完整的update和draw方法在game.js中实现
  update(dt) {
    // 占位符 - 实际实现在game.js
  }

  draw(g) {
    // 占位符 - 实际实现在game.js
  }
}
