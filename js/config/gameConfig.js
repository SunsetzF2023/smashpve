/**
 * 游戏配置模块
 * 包含游戏世界、场地、传送门、城墙等基础配置常量
 */

// 游戏世界尺寸
export const WORLD = {
  w: 800,
  h: 1000
};

// 游戏场地边界
export const ARENA = {
  l: 60,   // 左边界
  r: 740,  // 右边界
  t: 200,  // 上边界
  b: 920   // 下边界
};

// 传送门配置
export const PORTAL = {
  x: 400,
  y: 140,
  r: 50
};

// 城墙高度
export const WALL_H = 80;

// 弹弓配置
export const SLING = {
  x: 400,
  y: 950,
  r: 40
};

// 游戏法术使用次数限制
export const MAX_GAME_SPELL_USES = {
  heal: 3  // 修补城墙整个游戏最多使用3次
};

// 游戏修正器默认值
export const DEFAULT_MODIFIERS = {
  monsterSpeedMul: 1,
  roleCollisionMul: 1,
  portalMaxHpMul: 1,
  manaRegenMul: 1,
  wallMaxHpBonus: 0,
  maxManaBonus: 0
};

// 性能配置
export const PERFORMANCE_CONFIG = {
  MAX_PARTICLES: 100,
  MAX_DAMAGE_NUMBERS: 50,
  MAX_ACTIVE_EFFECTS: 10
};

// 默认卡牌（未登录时使用）
export const DEFAULT_CARDS = ['knight', 'archer', 'mage', 'shield'];
