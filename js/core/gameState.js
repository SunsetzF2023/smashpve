/**
 * 游戏状态模块
 * 管理游戏运行时状态
 */

// 运行时状态
let now = 0;
let lastTs = 0;
let gameEnded = false;
let pausedOverlay = false;

// 游戏核心状态
let day = 1;
let selectedCardId = null;
let mana = 0;
let maxMana = 10;
let manaRegen = 1.35; // per second

// 城墙和传送门状态
let wall = { hp: 52, maxHp: 52 };
let portal = { hp: 120, maxHp: 120 };

// 游戏法术使用次数限制
let gameSpellUses = {
  heal: 0,
};

// 实体数组
let roles = [];
let monsters = [];
let shots = [];
let effects = [];

// 修正器
let modifiers = {
  monsterSpeedMul: 1,
  roleCollisionMul: 1,
  portalMaxHpMul: 1,
  manaRegenMul: 1,
  wallMaxHpBonus: 0,
  maxManaBonus: 0,
};

// 全局修正器（用于抽奖奖励）
let globalModifiers = {
  attackBoost: 1, // 攻击力倍率
  hpBoost: 1, // 血量倍率
};

export function getGameState() {
  return {
    now,
    lastTs,
    gameEnded,
    pausedOverlay,
    day,
    selectedCardId,
    mana,
    maxMana,
    manaRegen,
    wall,
    portal,
    gameSpellUses,
    roles,
    monsters,
    shots,
    effects,
    modifiers,
    globalModifiers
  };
}

export function setGameState(state) {
  now = state.now;
  lastTs = state.lastTs;
  gameEnded = state.gameEnded;
  pausedOverlay = state.pausedOverlay;
  day = state.day;
  selectedCardId = state.selectedCardId;
  mana = state.mana;
  maxMana = state.maxMana;
  manaRegen = state.manaRegen;
  wall = state.wall;
  portal = state.portal;
  gameSpellUses = state.gameSpellUses;
  roles = state.roles;
  monsters = state.monsters;
  shots = state.shots;
  effects = state.effects;
  modifiers = state.modifiers;
  globalModifiers = state.globalModifiers;
}

// 重置游戏状态
export function resetGameState() {
  now = 0;
  lastTs = 0;
  gameEnded = false;
  pausedOverlay = false;
  day = 1;
  selectedCardId = null;
  mana = 0;
  maxMana = 10;
  manaRegen = 1.35;
  wall = { hp: 52, maxHp: 52 };
  portal = { hp: 120, maxHp: 120 };
  gameSpellUses = { heal: 0 };
  roles = [];
  monsters = [];
  shots = [];
  effects = [];
  modifiers = {
    monsterSpeedMul: 1,
    roleCollisionMul: 1,
    portalMaxHpMul: 1,
    manaRegenMul: 1,
    wallMaxHpBonus: 0,
    maxManaBonus: 0,
  };
  globalModifiers = {
    attackBoost: 1,
    hpBoost: 1,
  };
}

// 检查是否有boss在场
export function hasBossOnField() {
  return monsters.some(m => m.kind === "megaboss" && m.hp > 0);
}
