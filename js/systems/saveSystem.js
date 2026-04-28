/**
 * 存档系统模块
 * 处理游戏进度保存、加载、存档槽位管理
 */

import { getUserData, saveUserData, isUserAuthenticated } from './authSystem.js';

// 存档槽位
let saveSlots = {
  1: null,
  2: null,
  3: null
};

// 游戏进度引用（需要在初始化时设置）
let gameProgress = null;
let day = null;
let gameEnded = null;
let pausedOverlay = null;

// 设置游戏回调
let setupDayCallback = null;

export function initSaveSystem(gameProgressRef, gameStateRef, setupDayFn) {
  gameProgress = gameProgressRef;
  day = gameStateRef.day;
  gameEnded = gameStateRef.gameEnded;
  pausedOverlay = gameStateRef.pausedOverlay;
  setupDayCallback = setupDayFn;
}

export function getSaveSlots() {
  return saveSlots;
}

export function setSaveSlots(slots) {
  saveSlots = slots;
}

function getSaveKey(slot) {
  return `slingshotProgress_slot${slot}`;
}

// 保存游戏进度
export function saveProgress() {
  if (!isUserAuthenticated()) {
    console.log('用户未登录，无法保存到云端');
    return;
  }
  
  const currentUser = getUserData();
  if (!currentUser) return;
  
  // 保存到用户数据中
  const userData = getUserData(currentUser.email);
  if (userData) {
    userData.gameData = {
      ...gameProgress,
      currentDay: day,
      saveTime: new Date().toISOString()
    };
    saveUserData(currentUser.email, userData);
    console.log(`云端保存成功: ${userData.username}`);
  }
}

// 加载游戏进度
export function loadProgress(slot = null) {
  if (!isUserAuthenticated()) {
    console.log('用户未登录，使用本地存档');
    // 回退到本地存档系统
    const loadSlot = slot || gameProgress.saveSlot;
    const saveKey = getSaveKey(loadSlot);
    const saved = localStorage.getItem(saveKey);
    
    if (saved) {
      try {
        const data = JSON.parse(saved);
        gameProgress = { ...gameProgress, ...data };
        gameProgress.saveSlot = loadSlot;
        console.log(`Loaded local save from slot ${loadSlot}: ${gameProgress.saveName}`);
      } catch (e) {
        console.log('Failed to load local progress, using default');
      }
    }
    return;
  }
  
  // 从云端加载用户数据
  const currentUser = getUserData();
  if (currentUser) {
    const userData = getUserData(currentUser.email);
    if (userData && userData.gameData) {
      gameProgress = userData.gameData;
      console.log(`云端加载成功: ${userData.username}`);
    }
  }
}

// 添加卡牌到收藏
export function addCardToCollection(cardId) {
  if (!isUserAuthenticated()) {
    console.log('用户未登录，卡牌不会永久保存');
    return false;
  }
  
  const currentUser = getUserData();
  if (!currentUser) return false;
  
  const userData = getUserData(currentUser.email);
  if (userData) {
    if (!userData.gameData.cardCollection) {
      userData.gameData.cardCollection = {};
    }
    
    // 增加卡牌数量
    userData.gameData.cardCollection[cardId] = (userData.gameData.cardCollection[cardId] || 0) + 1;
    
    // 保存到云端
    saveUserData(currentUser.email, userData);
    
    // 同步到当前游戏数据
    gameProgress.cardCollection = userData.gameData.cardCollection;
    
    console.log(`卡牌 ${cardId} 已添加到收藏，当前数量: ${userData.gameData.cardCollection[cardId]}`);
    return true;
  }
  
  return false;
}

// 获取用户拥有的所有卡牌
export function getUserCards() {
  if (!isUserAuthenticated()) {
    return ['knight', 'archer', 'mage', 'shield']; // 默认卡牌
  }
  
  const currentUser = getUserData();
  if (!currentUser) return ['knight', 'archer', 'mage', 'shield'];
  
  const userData = getUserData(currentUser.email);
  if (userData && userData.gameData && userData.gameData.cardCollection) {
    return Object.keys(userData.gameData.cardCollection);
  }
  
  return ['knight', 'archer', 'mage', 'shield']; // 默认卡牌
}

// 更新存档槽位
export function updateSaveSlots() {
  for (let i = 1; i <= 3; i++) {
    const saveKey = getSaveKey(i);
    const saved = localStorage.getItem(saveKey);
    if (saved) {
      try {
        saveSlots[i] = JSON.parse(saved);
      } catch (e) {
        saveSlots[i] = null;
      }
    } else {
      saveSlots[i] = null;
    }
  }
}

// 创建新存档
export function createNewSave(slot, name, preserveProgress = false) {
  // 如果需要保留进度，只重置游戏相关数据
  if (preserveProgress) {
    // 保留金币和累计击杀，只重置游戏进度
    gameProgress.currentDay = 1;
    gameProgress.bestDay = Math.max(gameProgress.bestDay, 1);
    gameProgress.saveName = name || `存档${slot}`;
    gameProgress.saveTime = new Date().toISOString();
    gameProgress.saveSlot = slot;
  } else {
    // 完全新建存档，重置所有数据
    gameProgress = {
      coins: 0,
      bestDay: 1,
      totalKills: 0,
      cardCollection: {},
      cardLevels: {},
      currentDay: 1,
      saveName: name || `存档${slot}`,
      saveTime: new Date().toISOString(),
      saveSlot: slot
    };
  }
  
  saveProgress();
  day = 1;
  gameEnded = false;
  pausedOverlay = false;
  
  if (setupDayCallback) {
    setupDayCallback(1);
  }
}

// 计算游戏奖励
export function calculateGameRewards() {
  const baseCoins = 10;
  const dayBonus = day * 2;
  const killBonus = Math.floor(gameProgress.totalKills * 0.1);
  const speedBonus = day > 5 ? Math.floor((day - 5) * 3) : 0;
  
  return {
    coins: baseCoins + dayBonus + killBonus + speedBonus,
    kills: gameProgress.totalKills
  };
}
