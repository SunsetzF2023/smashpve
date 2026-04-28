/**
 * 怪物生成系统模块
 * 处理怪物的生成逻辑
 */

// 怪物生成状态
let spawn = {
  time: 0,
  nextAt: 0,
  remaining: 0,
  eliteRemaining: 0,
  bossRemaining: 0,
  megabossRemaining: 0,
  done: false,
};

export function getSpawnState() {
  return spawn;
}

export function setSpawnState(state) {
  spawn = state;
}

// 重置生成状态
export function resetSpawnState() {
  spawn = {
    time: 0,
    nextAt: 0,
    remaining: 0,
    eliteRemaining: 0,
    bossRemaining: 0,
    megabossRemaining: 0,
    done: false,
  };
}

// 完整的怪物生成逻辑在game.js中实现
// 此模块仅提供状态管理
