/**
 * Smash Defender - 主入口文件
 * 协调所有游戏模块
 */

import { WORLD, ARENA, PORTAL, WALL_H, SLING, MAX_GAME_SPELL_USES, DEFAULT_MODIFIERS, PERFORMANCE_CONFIG, DEFAULT_CARDS } from './config/gameConfig.js';
import { CARDS, CARD_RARITY, RARITY_WEIGHTS } from './config/cardConfig.js';
import { SoundSystem } from './systems/soundSystem.js';
import { initAuthSystem, register, login, logout, checkAutoLogin, saveLastLogin, getCurrentUser, isUserAuthenticated, getGameProgress, setGameProgress } from './systems/authSystem.js';
import { initSaveSystem, saveProgress, loadProgress, addCardToCollection, getUserCards, updateSaveSlots, createNewSave, calculateGameRewards, getSaveSlots, setSaveSlots } from './systems/saveSystem.js';
import { initHelpers, resize, screenToWorld, clamp, len, norm, rand, pick, withAlpha, shade, getView } from './core/helpers.js';
import { getGameState, setGameState, resetGameState, hasBossOnField } from './core/gameState.js';
import { showDamageNumber, updateDamageNumbers, drawDamageNumbers, getDamageNumbers, setDamageNumbers, clearDamageNumbers } from './effects/damageNumbers.js';
import { puff, sparkle, updateParticles, drawParticles, getParticles, setParticles, clearParticles } from './effects/visualEffects.js';
import { initGameLoop, startGameLoop, stopGameLoop, isRunning } from './core/gameLoop.js';
import { getSpawnState, setSpawnState, resetSpawnState } from './systems/spawnSystem.js';
import { Role } from './entities/Role.js';
import { Monster } from './entities/Monster.js';

// 全局变量
let canvas = null;
let ctx = null;
let soundSystem = null;
let view = { w: 0, h: 0, scale: 1, ox: 0, oy: 0 };

// 游戏进度
let gameProgress = {
  coins: 0,
  bestDay: 1,
  totalKills: 0,
  cardCollection: {},
  cardLevels: {},
  currentDay: 1,
  saveName: "默认存档",
  saveTime: null,
  saveSlot: 1
};

// DOM元素引用
let authContainerEl = null;
let gameContainerEl = null;
let loginFormEl = null;
let registerFormEl = null;
let loginEmailEl = null;
let loginPasswordEl = null;
let registerUsernameEl = null;
let registerEmailEl = null;
let registerPasswordEl = null;
let confirmPasswordEl = null;
let currentUserNameEl = null;
let currentUserEmailEl = null;
let showRegisterLink = null;
let showLoginLink = null;
let loginBtn = null;
let registerBtn = null;
let logoutBtn = null;

/**
 * 初始化游戏
 */
function initGame() {
  // 获取画布
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d", { alpha: false });

  // 初始化声音系统
  soundSystem = new SoundSystem();

  // 初始化工具函数
  initHelpers(canvas, ctx, WORLD);

  // 初始化游戏状态
  resetGameState();

  // 初始化生成系统
  resetSpawnState();

  // 初始化存档系统
  initSaveSystem(gameProgress, getGameState(), setupDay);

  // 初始化认证系统
  initAuthSystem(
    {
      authContainer: authContainerEl,
      gameContainer: gameContainerEl,
      loginForm: loginFormEl,
      registerForm: registerFormEl,
      loginEmail: loginEmailEl,
      loginPassword: loginPasswordEl,
      registerUsername: registerUsernameEl,
      registerEmail: registerEmailEl,
      registerPassword: registerPasswordEl,
      confirmPassword: confirmPasswordEl,
      currentUserName: currentUserNameEl,
      currentUserEmail: currentUserEmailEl
    },
    gameProgress,
    initGame
  );

  // 初始化游戏循环
  initGameLoop(canvas, ctx, gameUpdate, gameRender);

  // 设置窗口大小调整
  window.addEventListener('resize', () => {
    resize();
  });

  // 初始调整大小
  resize();

  // 设置事件监听器
  setupEventListeners();

  // 检查自动登录
  if (!checkAutoLogin()) {
    // 如果没有自动登录，显示认证界面
    showAuthInterface();
  } else {
    // 自动登录成功，开始游戏
    startGameLoop();
  }
}

/**
 * 设置事件监听器
 */
function setupEventListeners() {
  // 认证相关事件
  showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormEl.classList.add('hidden');
    registerFormEl.classList.remove('hidden');
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerFormEl.classList.add('hidden');
    loginFormEl.classList.remove('hidden');
  });

  loginBtn.addEventListener('click', () => {
    const email = loginEmailEl.value.trim();
    const password = loginPasswordEl.value;
    if (login(email, password)) {
      saveLastLogin(email);
      startGameLoop();
    }
  });

  registerBtn.addEventListener('click', () => {
    const username = registerUsernameEl.value.trim();
    const email = registerEmailEl.value.trim();
    const password = registerPasswordEl.value;
    const confirmPassword = confirmPasswordEl.value;

    if (password !== confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }

    if (register(username, email, password)) {
      saveLastLogin(email);
      startGameLoop();
    }
  });

  logoutBtn.addEventListener('click', () => {
    logout();
    stopGameLoop();
  });
}

/**
 * 显示认证界面
 */
function showAuthInterface() {
  authContainerEl.classList.remove('hidden');
  gameContainerEl.classList.add('hidden');

  loginEmailEl.value = '';
  loginPasswordEl.value = '';
  registerUsernameEl.value = '';
  registerEmailEl.value = '';
  registerPasswordEl.value = '';
  confirmPasswordEl.value = '';

  loginFormEl.classList.remove('hidden');
  registerFormEl.classList.add('hidden');
}

/**
 * 设置关卡
 */
function setupDay(dayNum) {
  // 关卡设置逻辑
  // 完整实现在原game.js中
  console.log(`Setting up day ${dayNum}`);
}

/**
 * 游戏更新逻辑
 */
function gameUpdate(dt) {
  // 更新游戏状态
  const state = getGameState();
  state.now += dt;

  // 更新法力值
  const manaBonus = isUserAuthenticated() ? getGameProgress().maxManaBonus || 0 : 0;
  state.maxMana = 10 + manaBonus;
  state.mana = Math.min(state.maxMana, state.mana + state.manaRegen * dt);

  // 更新伤害数字
  updateDamageNumbers(dt);

  // 更新粒子
  updateParticles(dt);

  // 更新实体
  // 完整实现在原game.js中

  setGameState(state);
}

/**
 * 游戏渲染逻辑
 */
function gameRender(g) {
  // 清空画布
  g.fillStyle = "#fff7fb";
  g.fillRect(0, 0, canvas.width, canvas.height);

  // 应用视图变换
  const v = getView();
  g.save();
  g.translate(v.ox, v.oy);
  g.scale(v.scale, v.scale);

  // 渲染游戏世界
  // 完整实现在原game.js中

  // 渲染粒子
  drawParticles(g);

  // 渲染伤害数字
  drawDamageNumbers(g);

  g.restore();
}

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', () => {
  // 获取DOM元素
  authContainerEl = document.getElementById('authContainer');
  gameContainerEl = document.getElementById('gameContainer');
  loginFormEl = document.getElementById('loginForm');
  registerFormEl = document.getElementById('registerForm');
  loginEmailEl = document.getElementById('loginEmail');
  loginPasswordEl = document.getElementById('loginPassword');
  registerUsernameEl = document.getElementById('registerUsername');
  registerEmailEl = document.getElementById('registerEmail');
  registerPasswordEl = document.getElementById('registerPassword');
  confirmPasswordEl = document.getElementById('confirmPassword');
  currentUserNameEl = document.getElementById('currentUserName');
  currentUserEmailEl = document.getElementById('currentUserEmail');
  showRegisterLink = document.getElementById('showRegisterLink');
  showLoginLink = document.getElementById('showLoginLink');
  loginBtn = document.getElementById('loginBtn');
  registerBtn = document.getElementById('registerBtn');
  logoutBtn = document.getElementById('logoutBtn');

  // 初始化游戏
  initGame();
});

// 导出全局变量供其他模块使用
window.gameModules = {
  CARDS,
  WORLD,
  ARENA,
  PORTAL,
  WALL_H,
  SLING,
  soundSystem,
  gameProgress,
  getGameState,
  setGameState,
  showDamageNumber,
  puff,
  sparkle,
  rand,
  norm,
  clamp,
  len,
  pick
};
