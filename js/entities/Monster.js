/**
 * 怪物实体类
 * 敌对单位
 * 
 * 注意：由于Monster类代码量很大（约800行），
 * 完整实现暂时保留在game.js中
 * 此文件仅作为模块化结构的占位符
 */

export class Monster {
  constructor(kind, x, y) {
    this.kind = kind;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.hp = 0;
    this.maxHp = 0;
    this.r = 0;
    this.baseSpeed = 0;
    this.color = "#888";
    this.slowTimer = 0;
    this.slowMul = 1;
    this.frozen = false;
    this.frozenTimer = 0;
    this.stopped = false;
    this.stoppedY = 0;
    this.shootCd = 0;
    this.dead = false;
    this._initKind(kind);
  }

  _initKind(kind) {
    // 根据怪物类型初始化属性
    // 完整实现在game.js中
  }

  update(dt) {
    // 占位符 - 实际实现在game.js
  }

  takeDamage(dmg) {
    // 占位符 - 实际实现在game.js
  }

  draw(g) {
    // 占位符 - 实际实现在game.js
  }
}
