(() => {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d", { alpha: false });

  // 音效系统
  class SoundSystem {
    constructor() {
      this.audioContext = null;
      this.initialized = false;
      this.sounds = {};
    }
    
    init() {
      if (this.initialized) return;
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.initialized = true;
        this.createSounds();
      } catch (e) {
        console.log('Audio not supported:', e);
      }
    }
    
    createSounds() {
      // 创建不同类型的音效
      this.sounds.shoot = () => this.createShootSound();
      this.sounds.hit = () => this.createHitSound();
      this.sounds.explosion = () => this.createExplosionSound();
      this.sounds.frost = () => this.createFrostSound();
      this.sounds.lightning = () => this.createLightningSound();
      this.sounds.heal = () => this.createHealSound();
      this.sounds.portal = () => this.createPortalSound();
      this.sounds.wall = () => this.createWallSound();
      this.sounds.levelComplete = () => this.createLevelCompleteSound();
      this.sounds.gameOver = () => this.createGameOverSound();
    }
    
    createShootSound() {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    createHitSound() {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.05);
    }
    
    createExplosionSound() {
      const bufferSize = this.audioContext.sampleRate * 0.3;
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() - 0.5) * Math.exp(-i / (bufferSize * 0.1));
      }
      
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
      
      source.start(this.audioContext.currentTime);
    }
    
    createFrostSound() {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.2);
    }
    
    createLightningSound() {
      const bufferSize = this.audioContext.sampleRate * 0.1;
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() - 0.5) * 2 * Math.exp(-i / (bufferSize * 0.05));
      }
      
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      
      source.start(this.audioContext.currentTime);
    }
    
    createHealSound() {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    createPortalSound() {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(100, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.5);
    }
    
    createWallSound() {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.25, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    createLevelCompleteSound() {
      const notes = [523, 659, 784, 1047]; // C, E, G, High C
      notes.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);
          
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
          
          gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
          
          oscillator.start(this.audioContext.currentTime);
          oscillator.stop(this.audioContext.currentTime + 0.3);
        }, index * 100);
      });
    }
    
    createGameOverSound() {
      const notes = [400, 350, 300, 250]; // Descending
      notes.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);
          
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
          
          gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
          
          oscillator.start(this.audioContext.currentTime);
          oscillator.stop(this.audioContext.currentTime + 0.4);
        }, index * 150);
      });
    }
    
    play(soundName) {
      if (!this.initialized) {
        this.init();
      }
      
      if (this.sounds[soundName]) {
        try {
          this.sounds[soundName]();
        } catch (e) {
          console.log('Error playing sound:', soundName, e);
        }
      }
    }
  }
  
  const soundSystem = new SoundSystem();

  const hudDay = document.getElementById("hudDay");
  const hudMana = document.getElementById("hudMana");
  const hudPortal = document.getElementById("hudPortal");
  const hudWall = document.getElementById("hudWall");
  const hudHint = document.getElementById("hudHint");
  const cardsEl = document.getElementById("cards");
  const overlayEl = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayDesc = document.getElementById("overlayDesc");
  const overlayBtn = document.getElementById("overlayBtn");

  // 建设界面元素
  const buildOverlayEl = document.getElementById("buildOverlay");
  const buildCoinsEl = document.getElementById("buildCoins");
  const buildBestDayEl = document.getElementById("buildBestDay");
  const currentSaveNameEl = document.getElementById("currentSaveName");
  const backToGameBtn = document.getElementById("backToGameBtn");
  const createNewSaveBtn = document.getElementById("createNewSaveBtn");
  const newSaveNameEl = document.getElementById("newSaveName");
  const saveSlotsEl = document.getElementById("saveSlots");

  // 用户认证系统DOM元素
  const authContainerEl = document.getElementById("authContainer");
  const gameContainerEl = document.getElementById("gameContainer");
  const loginFormEl = document.getElementById("loginForm");
  const registerFormEl = document.getElementById("registerForm");
  const loginEmailEl = document.getElementById("loginEmail");
  const loginPasswordEl = document.getElementById("loginPassword");
  const registerUsernameEl = document.getElementById("registerUsername");
  const registerEmailEl = document.getElementById("registerEmail");
  const registerPasswordEl = document.getElementById("registerPassword");
  const confirmPasswordEl = document.getElementById("confirmPassword");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const showRegisterLink = document.getElementById("showRegister");
  const showLoginLink = document.getElementById("showLogin");
  const currentUserNameEl = document.getElementById("currentUserName");
  const currentUserEmailEl = document.getElementById("currentUserEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  // 加点系统元素
  const totalKillsEl = document.getElementById("totalKills");
  const totalCoinsEl = document.getElementById("totalCoins");
  const lotteryBtn = document.getElementById("lotteryBtn");
  const lotteryResultEl = document.getElementById("lotteryResult");

  // --------- World / Camera ----------
  const WORLD = { w: 720, h: 1280 };
  let view = { scale: 1, ox: 0, oy: 0, w: 0, h: 0 };

  function resize() {
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

  function screenToWorld(px, py) {
    return {
      x: (px - view.ox) / view.scale,
      y: (py - view.oy) / view.scale,
    };
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }
  function len(x, y) {
    return Math.hypot(x, y);
  }
  function norm(x, y) {
    const l = Math.hypot(x, y) || 1;
    return { x: x / l, y: y / l, l };
  }
  function rand(a, b) {
    return a + Math.random() * (b - a);
  }
  function pick(arr) {
    return arr[(Math.random() * arr.length) | 0];
  }

  // 检查是否有boss在场
  function hasBossOnField() {
    return monsters.some(m => m.kind === "megaboss" && m.hp > 0);
  }

  // --------- Game Config ----------
  const WALL_H = 150;
  const SLING = { x: WORLD.w / 2, y: WORLD.h - WALL_H - 20, r: 44 };
  const ARENA = {
    l: 46,
    r: WORLD.w - 46,
    t: 230,
    b: WORLD.h - WALL_H - 130,
  };
  const PORTAL = { x: WORLD.w / 2, y: ARENA.t - 68, r: 70 };

  // --------- Cards ----------
  /** @type {Array<any>} */
  const CARDS = [
    {
      id: "knight",
      type: "role",
      name: "棉花骑士",
      cost: 2,
      weight: 1.05,
      radius: 26,
      color: "#ff78b8",
      drag: 1.85, // 较慢减速，保持冲劲
      launchSpeedMul: 1.15, // 发射速度较快
      effect: "trail", // 粒子尾迹
      life: 16, // 从12增加到16
      desc: "停下后：冲击波，震开附近怪物。",
      // 只触发一次的驻场冲击波
      onStop: { kind: "shockwave", cd: 0.75, dmg: 10, radius: 130, knock: 210, maxTriggers: 1 },
    },
    {
      id: "archer",
      type: "role",
      name: "糖霜弓手",
      cost: 3,
      weight: 0.85,
      radius: 23,
      color: "#67d6ff",
      drag: 2.8,
      launchSpeedMul: 1.35,
      effect: "sparkles",
      life: 18,
      desc: "停下后：寒霜箭矢，减速敌人并造成持续伤害。",
      onStop: { kind: "frostArrows", cd: 0.5, dmg: 7, range: 420, slowDuration: 2.5, slowEffect: 0.6 },
    },
    {
      id: "mage",
      type: "role",
      name: "果冻法师",
      cost: 4,
      weight: 0.72,
      radius: 21,
      color: "#a67bff",
      drag: 2.2, // 中等减速
      launchSpeedMul: 0.95, // 发射速度较慢
      effect: "glow", // 光晕效果
      life: 17, // 从13增加到17
      desc: "停下后：法术射线，同时灼烧传送门。",
      onStop: { kind: "beam", cd: 0.8, dmg: 12, range: 520, portalDmg: 7 },
    },
    {
      id: "shield",
      type: "role",
      name: "软糖大盾",
      cost: 3,
      weight: 1.45,
      radius: 30,
      color: "#ffcc57",
      drag: 1.5, // 很慢减速，惯性大
      launchSpeedMul: 0.75, // 发射速度最慢
      effect: "spin", // 旋转效果
      life: 24, // 从20增加到24
      desc: "更重更大：碰撞伤害更高，停下后小范围嘲讽减速。死亡时爆炸造成范围伤害。",
      onStop: { kind: "auraSlow", cd: 0.55, dmg: 6, radius: 120, slow: 0.55 },
    },
    {
      id: "ice",
      type: "spell",
      name: "冰霜结界",
      cost: 4,
      color: "#79f2e1",
      desc: "放置在场地：减速范围内怪物一段时间。",
      spell: { kind: "fieldSlow", duration: 6.5, radius: 170, slow: 0.55 },
      target: "arena",
    },
    {
      id: "fire",
      type: "spell",
      name: "甜辣火球",
      cost: 3,
      color: "#ff8a5b",
      desc: "点选场地位置：爆炸伤害并击退。",
      spell: { kind: "burst", radius: 150, dmg: 18, knock: 240 },
      target: "arena",
    },
    {
      id: "heal",
      type: "spell",
      name: "城墙修补",
      cost: 2,
      color: "#7dff9a",
      desc: "立即回复城墙生命值。(整局游戏限3次)",
      spell: { kind: "healWall", heal: 14 },
      target: "instant",
    },
    {
      id: "charge",
      type: "spell",
      name: "小充能",
      cost: 1,
      color: "#4aa3ff",
      desc: "立即获得法术，并稍微提高当日回复速度。",
      spell: { kind: "chargeMana", gain: 2.5, regenBonus: 0.45, duration: 10 },
      target: "instant",
    },
    {
      id: "hellfire",
      type: "role",
      name: "烈焰法师",
      cost: 5,
      weight: 0.88,
      radius: 22,
      color: "#ff6b35",
      drag: 2.0,
      launchSpeedMul: 1.0,
      effect: "burn",
      life: 19, // 从15增加到19
      desc: "灼烧攻击：持续性射线，高频伤害数字，灼烧地狱火效果。",
      onStop: { kind: "hellfireBeam", cd: 0.1, baseDmg: 8, maxDmgMul: 3.0, rampTime: 4.0 },
    },
    // 新卡牌：抽奖系统获得
    {
      id: "angel",
      type: "role",
      name: "治愈天使",
      cost: 4,
      weight: 0.65,
      radius: 24,
      color: "#ffd700",
      drag: 1.8,
      launchSpeedMul: 0.9,
      effect: "heal",
      life: 20,
      desc: "停下后：治疗附近队友，若无队友则攻击敌人。",
      onStop: { kind: "angelHeal", cd: 0.6, heal: 3, dmg: 5, radius: 180 },
    },
    {
      id: "bomber",
      type: "role", 
      name: "炸弹人",
      cost: 3,
      weight: 0.95,
      radius: 22,
      color: "#ff4444",
      drag: 1.3,
      launchSpeedMul: 1.1,
      effect: "fuse",
      life: 18, // 从12提高到18，增加生存能力
      desc: "自动寻敌：接近敌人自爆造成高额范围伤害。",
      onStop: { kind: "bomberSeek", cd: 0.2, speed: 150, explodeRadius: 120, explodeDamage: 40 }, // 提高速度、半径和伤害
    },
    {
      id: "joker",
      type: "role",
      name: "疯狂小丑",
      cost: 3,
      weight: 0.45, // 很轻
      radius: 20,
      color: "#ff00ff",
      drag: 2.5,
      launchSpeedMul: 1.4, // 很快
      effect: "chaos",
      life: 14,
      desc: "混乱撞击：让敌人无差别攻击，停止后八方弹射。",
      onStop: { kind: "jokerChaos", cd: 0.8, chaosRadius: 150, bulletDamage: 4 },
    },
    {
      id: "thor",
      type: "role",
      name: "雷神之锤",
      cost: 5,
      weight: 1.15,
      radius: 26,
      color: "#4169e1",
      drag: 1.6,
      launchSpeedMul: 0.95,
      effect: "lightning",
      life: 18,
      desc: "连锁闪电：攻击可能伤害附近多个敌人。",
      onStop: { kind: "thorLightning", cd: 0.7, dmg: 15, chainRadius: 120, chainCount: 3 },
    },
    {
      id: "ninja",
      type: "role",
      name: "暗影忍者",
      cost: 3,
      weight: 0.55,
      radius: 21,
      color: "#2f4f4f",
      drag: 2.0,
      launchSpeedMul: 1.25,
      effect: "shadow",
      life: 16,
      desc: "瞬移打击：快速传送攻击多个目标。",
      onStop: { kind: "ninjaStrike", cd: 0.5, dmg: 8, strikeCount: 3 },
    },
    {
      id: "robot",
      type: "role",
      name: "机械守卫",
      cost: 4,
      weight: 1.35,
      radius: 28,
      color: "#708090",
      drag: 1.2,
      launchSpeedMul: 0.8,
      effect: "mech",
      life: 22,
      desc: "激光炮台：持续扫描攻击直线敌人。",
      onStop: { kind: "robotLaser", cd: 0.3, dmg: 6, laserLength: 400 },
    },
  ];

  // 用户认证系统
  let currentUser = null;
  let isAuthenticated = false;
  
  // 用户数据存储（使用localStorage模拟云端）
  const USER_DB_KEY = 'slingshot_users';
  const USER_PREFIX = 'user_';
  
  // 获取所有用户数据
  function getAllUsers() {
    const users = localStorage.getItem(USER_DB_KEY);
    return users ? JSON.parse(users) : {};
  }
  
  // 保存用户数据
  function saveUsers(users) {
    localStorage.setItem(USER_DB_KEY, JSON.stringify(users));
  }
  
  // 获取用户数据
  function getUserData(email) {
    const users = getAllUsers();
    const normalizedEmail = email.toLowerCase();
    return users[normalizedEmail] || null;
  }
  
  // 保存用户数据
  function saveUserData(email, userData) {
    const users = getAllUsers();
    const normalizedEmail = email.toLowerCase();
    users[normalizedEmail] = userData;
    saveUsers(users);
  }
  
  // 密码哈希（简单实现，实际应用中应使用更安全的方法）
  function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }
    return hash.toString(16);
  }
  
  // 验证邮箱格式
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // 显示认证消息
  function showAuthMessage(message, isError = false) {
    // 创建临时消息元素
    const messageEl = document.createElement('div');
    messageEl.className = isError ? 'auth-message error' : 'auth-message success';
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${isError ? '#e53e3e' : '#48bb78'};
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // 3秒后自动移除
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 3000);
  }
  
  // 用户注册
  function register(username, email, password) {
    // 验证输入
    if (!username || username.length < 2) {
      showAuthMessage('用户名至少需要2个字符', true);
      return false;
    }
    
    if (!validateEmail(email)) {
      showAuthMessage('请输入有效的邮箱地址', true);
      return false;
    }
    
    if (!password || password.length < 6) {
      showAuthMessage('密码至少需要6个字符', true);
      return false;
    }
    
    // 检查邮箱是否已存在
    const existingUser = getUserData(email);
    if (existingUser) {
      showAuthMessage('该邮箱已被注册', true);
      return false;
    }
    
    // 创建新用户
    const newUser = {
      username: username,
      email: email,
      password: hashPassword(password),
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      gameData: {
        coins: 0,
        totalKills: 0,
        bestDay: 1,
        cardCollection: {}, // 永久卡牌收藏
        cardLevels: {},
        currentDay: 1,
        saveName: '默认存档',
        saveTime: new Date().toISOString(),
        saveSlot: 1
      }
    };
    
    saveUserData(email, newUser);
    showAuthMessage('注册成功！正在登录...');
    
    // 自动登录
    setTimeout(() => {
      login(email, password);
    }, 1000);
    
    return true;
  }
  
  // 用户登录
  function login(email, password) {
    if (!validateEmail(email)) {
      showAuthMessage('请输入有效的邮箱地址', true);
      return false;
    }
    
    if (!password) {
      showAuthMessage('请输入密码', true);
      return false;
    }
    
    const userData = getUserData(email);
    if (!userData) {
      showAuthMessage('用户不存在', true);
      return false;
    }
    
    if (userData.password !== hashPassword(password)) {
      showAuthMessage('密码错误', true);
      return false;
    }
    
    // 登录成功
    currentUser = {
      username: userData.username,
      email: userData.email
    };
    isAuthenticated = true;
    
    // 更新最后登录时间
    userData.lastLogin = new Date().toISOString();
    saveUserData(email, userData);
    
    // 加载用户游戏数据
    gameProgress = userData.gameData;
    
    // 显示游戏界面
    showGameInterface();
    showAuthMessage(`欢迎回来，${userData.username}！`);
    
    return true;
  }
  
  // 用户登出
  function logout() {
    if (!isAuthenticated) return;
    
    // 保存当前游戏数据
    if (currentUser) {
      const userData = getUserData(currentUser.email);
      if (userData) {
        userData.gameData = gameProgress;
        saveUserData(currentUser.email, userData);
      }
    }
    
    // 清除认证状态
    currentUser = null;
    isAuthenticated = false;
    
    // 显示登录界面
    showAuthInterface();
    showAuthMessage('已安全登出');
  }
  
  // 显示认证界面
  function showAuthInterface() {
    authContainerEl.classList.remove('hidden');
    gameContainerEl.classList.add('hidden');
    
    // 清空表单
    loginEmailEl.value = '';
    loginPasswordEl.value = '';
    registerUsernameEl.value = '';
    registerEmailEl.value = '';
    registerPasswordEl.value = '';
    confirmPasswordEl.value = '';
    
    // 显示登录表单
    loginFormEl.classList.remove('hidden');
    registerFormEl.classList.add('hidden');
  }
  
  // 显示游戏界面
  function showGameInterface() {
    authContainerEl.classList.add('hidden');
    gameContainerEl.classList.remove('hidden');
    
    // 更新用户信息显示
    if (currentUser) {
      currentUserNameEl.textContent = currentUser.username;
      currentUserEmailEl.textContent = currentUser.email;
    }
    
    // 初始化游戏
    initGame();
  }
  
  // 检查自动登录
  function checkAutoLogin() {
    const savedEmail = localStorage.getItem('slingshot_last_login');
    if (savedEmail) {
      const userData = getUserData(savedEmail);
      if (userData) {
        currentUser = {
          username: userData.username,
          email: userData.email
        };
        isAuthenticated = true;
        gameProgress = userData.gameData;
        showGameInterface();
        return true;
      }
    }
    return false;
  }
  
  // 保存最后登录邮箱
  function saveLastLogin(email) {
    localStorage.setItem('slingshot_last_login', email);
  }

  function updateBuildUI() {
    buildCoinsEl.textContent = gameProgress.coins;
    buildBestDayEl.textContent = gameProgress.bestDay;
    currentSaveNameEl.textContent = gameProgress.saveName;
    renderSaveSlots();
  }

  function renderSaveSlots() {
    let html = '';
    for (let i = 1; i <= 3; i++) {
      const slot = saveSlots[i];
      const isActive = gameProgress.saveSlot === i;
      
      if (slot) {
        const date = new Date(slot.saveTime);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        html += `
          <div class="save-slot ${isActive ? 'active' : ''}" data-slot="${i}">
            <div class="save-name">${slot.saveName}</div>
            <div class="save-info">
              最高天数: ${slot.bestDay}<br>
              金币: ${slot.coins}<br>
              ${dateStr}
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="save-slot empty ${isActive ? 'active' : ''}" data-slot="${i}">
            <div class="save-name">空槽位 ${i}</div>
            <div class="save-info">点击新建存档</div>
          </div>
        `;
      }
    }
    saveSlotsEl.innerHTML = html;
    
    // 添加点击事件
    document.querySelectorAll('.save-slot').forEach(slotEl => {
      slotEl.addEventListener('click', (e) => {
        const slotNum = parseInt(e.currentTarget.dataset.slot);
        if (saveSlots[slotNum] || slotNum === gameProgress.saveSlot) {
          // 切换到已有存档
          if (slotNum !== gameProgress.saveSlot) {
            saveProgress(); // 保存当前存档
            loadProgress(slotNum); // 加载选中的存档
            updateBuildUI();
          }
        } else {
          // 空槽位，提示新建
          const name = prompt(`请输入存档 ${slotNum} 的名称：`, `存档${slotNum}`);
          if (name) {
            createNewSave(slotNum, name);
            updateBuildUI();
          }
        }
      });
    });
  }

  function showBuildOverlay() {
    updateBuildUI();
    buildOverlayEl.classList.remove('hidden');
  }

  function hideBuildOverlay() {
    buildOverlayEl.classList.add('hidden');
  }

  // --------- Runtime State ----------
  let now = 0;
  let lastTs = 0;
  let gameEnded = false; // 添加游戏结束标志
  let pausedOverlay = false; // 添加暂停覆盖层标志

  let day = 1;
  let selectedCardId = null;
  let mana = 0;
  let maxMana = 10;
  let manaRegen = 1.35; // per second

  let wall = { hp: 52, maxHp: 52 };
  let portal = { hp: 120, maxHp: 120 };

  // 游戏法术使用次数限制
  let gameSpellUses = {
    heal: 0, // 修补城墙使用次数
  };
  const MAX_GAME_SPELL_USES = {
    heal: 3, // 修补城墙整个游戏最多使用3次
  };

  
  // 货币和收藏系统
  let gameProgress = {
    coins: 0,
    bestDay: 1,
    totalKills: 0,
    cardCollection: {}, // 卡牌ID -> 数量
    cardLevels: {}, // 卡牌ID -> 进阶等级
    currentDay: 1,
    saveName: "默认存档",
    saveTime: null,
    saveSlot: 1 // 1-3 存档槽位
  };

  // 存档管理
  let saveSlots = {
    1: null,
    2: null, 
    3: null
  };

  function getSaveKey(slot) {
    return `slingshotProgress_slot${slot}`;
  }

  // 用户认证系统事件监听器
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
    }
  });
  
  registerBtn.addEventListener('click', () => {
    const username = registerUsernameEl.value.trim();
    const email = registerEmailEl.value.trim();
    const password = registerPasswordEl.value;
    const confirmPassword = confirmPasswordEl.value;
    
    if (password !== confirmPassword) {
      showAuthMessage('两次输入的密码不一致', true);
      return;
    }
    
    if (register(username, email, password)) {
      saveLastLogin(email);
    }
  });
  
  logoutBtn.addEventListener('click', () => {
    if (confirm('确定要退出登录吗？游戏进度会自动保存。')) {
      logout();
    }
  });
  
  // 修改存档系统为云端存储
  function saveProgress() {
    if (!isAuthenticated) {
      console.log('用户未登录，无法保存到云端');
      return;
    }
    
    // 保存到用户数据中
    const userData = getUserData(currentUser.email);
    if (userData) {
      userData.gameData = {
        ...gameProgress,
        currentDay: day, // 保存当前游戏天数
        saveTime: new Date().toISOString()
      };
      saveUserData(currentUser.email, userData);
      console.log(`云端保存成功: ${userData.username}`);
    }
  }
  
  function loadProgress(slot = null) {
    if (!isAuthenticated) {
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
    const userData = getUserData(currentUser.email);
    if (userData && userData.gameData) {
      gameProgress = userData.gameData;
      console.log(`云端加载成功: ${userData.username}`);
    }
  }
  
  // 修改抽奖系统，让新卡牌永久保留在用户收藏中
  function addCardToCollection(cardId) {
    if (!isAuthenticated) {
      console.log('用户未登录，卡牌不会永久保存');
      return false;
    }
    
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
  function getUserCards() {
    if (!isAuthenticated) {
      return ['knight', 'archer', 'mage', 'shield']; // 默认卡牌
    }
    
    const userData = getUserData(currentUser.email);
    if (userData && userData.gameData && userData.gameData.cardCollection) {
      return Object.keys(userData.gameData.cardCollection);
    }
    
    return ['knight', 'archer', 'mage', 'shield']; // 默认卡牌
  }

  function updateSaveSlots() {
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

  function createNewSave(slot, name, preserveProgress = false) {
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
    gameEnded = false; // 重置游戏结束标志
    pausedOverlay = false; // 重置暂停覆盖层标志
    setupDay(1);
  }

  // 计算游戏奖励
  function calculateGameRewards() {
    const baseCoins = 10;
    const dayBonus = day * 2;
    const killBonus = Math.floor(gameProgress.totalKills * 0.1);
    const speedBonus = day > 5 ? Math.floor((day - 5) * 3) : 0;
    
    return {
      coins: baseCoins + dayBonus + killBonus + speedBonus,
      kills: gameProgress.totalKills
    };
  }

  let modifiers = {
    monsterSpeedMul: 1,
    roleCollisionMul: 1,
    portalMaxHpMul: 1,
    manaRegenMul: 1,
    wallMaxHpBonus: 0,
    maxManaBonus: 0,
  };
  let pendingModifier = null;

  /** @type {Array<Role>} */
  let roles = [];
  /** @type {Array<Monster>} */
  let monsters = [];
  /** @type {Array<any>} */
  let shots = [];
  /** @type {Array<any>} */
  let effects = [];
  /** @type {Array<any>} */
  let particles = [];

  // 伤害数字显示系统
  let damageNumbers = [];
  let goldTexts = [];

  function showDamageNumber(x, y, damage, type = "normal") {
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

  function showGoldText(x, y, amount) {
    goldTexts.push({
      x: x,
      y: y,
      amount: amount,
      t: 0,
      dur: 2.0,
      vy: -50 // 向上飘的速度
    });
  }

  let spawn = {
    time: 0,
    nextAt: 0,
    remaining: 0,
    eliteRemaining: 0,
    bossRemaining: 0,
    megabossRemaining: 0,
    done: false,
  };

  // --------- Entities ----------
  class Role {
    constructor(card, x, y, vx, vy) {
      this.card = card;
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.r = card.radius;
      this.m = Math.max(0.55, card.weight);
      this.drag = card.drag ?? 2.35; // 使用卡牌的拖拽系数
      this.bounce = 0.84;
      this.hp = 999;
      this.stopped = false;
      this.stopTimer = 0;
      this.effectCd = 0;
      this.lastColl = -999;
      this.rotation = 0; // 用于旋转效果
      this.trail = []; // 尾迹点数组
      this.lastTrailTime = 0;
      // 生命/存在时间：缓慢消失
      this.maxLife = card.life ?? 14;
      this.life = this.maxLife;
      this.dead = false;
      this.stopTriggers = 0;
      // 吸血效果
      this.vampiricEndTime = 0; // 吸血效果结束时间
      // 灼烧机制：追踪当前目标和伤害累加
      this.burnTarget = null;
      this.burnDamage = 0;
      this.burnStartTime = 0;
      this.lastBurnTarget = null;
      // 棉花骑士追踪冷却时间
      this.trackingCooldown = 0;
    }

    speed() {
      return Math.hypot(this.vx, this.vy);
    }

    update(dt) {
      // 棉花骑士特殊追踪行为（优化：添加冷却时间）
      if (this.card.id === "knight" && !this.stopped && monsters.length > 0) {
        this.trackingCooldown -= dt;
        
        // 每0.1秒更新一次追踪目标，避免每帧计算
        if (this.trackingCooldown <= 0) {
          this.trackingCooldown = 0.1;
          
          // 找到最近的怪物
          let nearestMonster = null;
          let nearestDistance = Infinity;
          
          for (const monster of monsters) {
            if (monster.hp <= 0) continue;
            const distance = Math.hypot(monster.x - this.x, monster.y - this.y);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestMonster = monster;
            }
          }
          
          // 如果找到怪物且在一定范围内，向其移动
          if (nearestMonster && nearestDistance < 300) {
            const direction = norm(nearestMonster.x - this.x, nearestMonster.y - this.y);
            const trackingForce = 80; // 追踪力度
            this.vx += direction.x * trackingForce * dt;
            this.vy += direction.y * trackingForce * dt;
            
            // 限制最大速度
            const maxSpeed = 150;
            const currentSpeed = Math.hypot(this.vx, this.vy);
            if (currentSpeed > maxSpeed) {
              this.vx = (this.vx / currentSpeed) * maxSpeed;
              this.vy = (this.vy / currentSpeed) * maxSpeed;
            }
          }
        }
      }
      
      if (!this.stopped) {
        const drag = Math.exp(-this.drag * dt);
        this.vx *= drag;
        this.vy *= drag;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        
        // 碰撞检测
        this._collideArena();
        this._collidePortal();
        
        // 当速度足够低时，设置停止状态
        const speed = this.speed();
        const stopThreshold = this.card.id === "bomber" ? 25 : 15; // 炸弹人更容易停止
        
        if (speed < stopThreshold && !this.stopped) {
          this.stopped = true;
          this.effectCd = 0.1; // 给一个小的初始冷却时间
          
          // 炸弹人特殊处理：停止时立即激活寻敌模式
          if (this.card.id === "bomber") {
            console.log("炸弹人停止，激活寻敌模式");
          }
        }
        
        // 旋转效果（大盾）
        if (this.card.effect === "spin") {
          const sp = this.speed();
          this.rotation += sp * 0.08 * dt;
        }
        
        // 尾迹效果（骑士）
        if (this.card.effect === "trail") {
          this.lastTrailTime += dt;
          if (this.lastTrailTime >= 0.03) {
            this.trail.push({ x: this.x, y: this.y, t: 0, dur: 0.35 });
            this.lastTrailTime = 0;
            if (this.trail.length > 12) this.trail.shift();
          }
        }
        
        // 闪烁光点效果（弓手，优化：减少生成频率）
        if (this.card.effect === "sparkles" && Math.random() < 0.15) {
          particles.push({
            x: this.x + rand(-this.r * 0.6, this.r * 0.6),
            y: this.y + rand(-this.r * 0.6, this.r * 0.6),
            vx: rand(-40, 40),
            vy: rand(-40, 40),
            r: rand(2, 4),
            t: 0,
            dur: rand(0.2, 0.4),
            color: this.card.color,
          });
        }
        
        // 燃烧效果（烈焰法师，优化：减少生成频率）
        if (this.card.effect === "burn" && Math.random() < 0.2) {
          particles.push({
            x: this.x + rand(-this.r * 0.8, this.r * 0.8),
            y: this.y + rand(-this.r * 0.8, this.r * 0.8),
            vx: rand(-30, 30),
            vy: rand(-50, -10),
            r: rand(3, 5),
            t: 0,
            dur: rand(0.4, 0.7),
            color: "#ff6b35",
          });
        }
        
        // 吸血效果视觉效果
        if (this.vampiricEndTime > now) {
          if (Math.random() < 0.3) {
            particles.push({
              x: this.x + rand(-this.r, this.r),
              y: this.y + rand(-this.r, this.r),
              vx: rand(-20, 20),
              vy: rand(-30, -10),
              r: rand(2, 4),
              t: 0,
              dur: rand(0.3, 0.5),
              color: "#dc2626",
            });
          }
        }
        
        // 炸弹人引线特效
        if (this.card.id === "bomber" && this.isBomber && !this.dead) {
          if (Math.random() < 0.4) { // 40%概率生成火花
            particles.push({
              x: this.x + rand(-this.r * 0.8, this.r * 0.8),
              y: this.y - this.r, // 从顶部产生火花
              vx: rand(-15, 15),
              vy: rand(-40, -20),
              r: rand(2, 3),
              t: 0,
              dur: rand(0.2, 0.4),
              color: "#ff8800", // 橙色火花
            });
          }
        }
      }

      // 停止后的逻辑
      if (this.stopped) {
        this.stopTimer += dt;
        
        // 炸弹人特殊逻辑：即使停止了也要继续移动和爆炸
        if (this.isBomber) {
          this.bomberUpdateCd -= dt;
          if (this.bomberUpdateCd <= 0) {
            this.bomberUpdateCd = 0.1; // 每0.1秒更新一次
            
            // 寻找最近的怪物
            if (!this.targetMonster || this.targetMonster.hp <= 0) {
              let bestDistance = Infinity;
              this.targetMonster = null;
              for (const m of monsters) {
                if (m.hp <= 0) continue;
                const d = Math.hypot(m.x - this.x, m.y - this.y);
                if (d < bestDistance) {
                  bestDistance = d;
                  this.targetMonster = m;
                }
              }
            }
            
            if (this.targetMonster) {
              // 向目标移动
              const dir = norm(this.targetMonster.x - this.x, this.targetMonster.y - this.y);
              this.vx = dir.x * this.bomberSpeed;
              this.vy = dir.y * this.bomberSpeed;
              this.x += this.vx * dt;
              this.y += this.vy * dt;
              
              // 炸弹人移动时减少生命值消耗（生存机制）
              this.life = Math.max(this.life, 8); // 最低保持8点生命值
              
              // 检查是否足够近可以爆炸
              const d = Math.hypot(this.targetMonster.x - this.x, this.targetMonster.y - this.y);
              if (d < this.explodeRadius + this.targetMonster.r) {
                // 爆炸！
                this.bomberExplode();
                return; // 爆炸后直接返回
              }
            } else {
              // 没有目标时，炸弹人保持最低生命值
              this.life = Math.max(this.life, 10);
            }
          }
        }
        
        this.effectCd -= dt;
        if (this.effectCd <= 0) {
          const cfg = this.card.onStop;
          if (cfg) {
            // 性能优化：限制同时触发的技能数量
            const activeEffects = effects.filter(e => e.t < 0.1).length;
            if (activeEffects > 10) {
              this.effectCd = 0.5; // 延迟触发
              return;
            }
            
            // 有些驻场效果只发动一次
            if (cfg.maxTriggers && this.stopTriggers >= cfg.maxTriggers) {
              this.effectCd = 9999; // 基本不再触发
            } else {
              this._emitStoppedEffect();
              this.stopTriggers++;
              this.effectCd = cfg.cd ?? 999;
            }
          } else {
            this.effectCd = 999;
          }
        }
      }
      
      // 更新尾迹
      if (this.card.effect === "trail") {
        for (const p of this.trail) p.t += dt;
        this.trail = this.trail.filter((p) => p.t < p.dur);
      }

      // 随时间逐渐消失
      let lifeDecayRate = dt;
      // boss在场时，我方角色卡寿命提升15%（即寿命消耗减少15%）
      if (hasBossOnField()) {
        lifeDecayRate *= 0.85;
      }
      this.life -= lifeDecayRate;
      if (this.life <= 0) {
        // 软糖大盾死亡爆炸
        if (this.card.id === "shield") {
          this._shieldExplosion();
        }
        this.dead = true;
      }
    }

    _collideArena() {
      if (this.x - this.r < ARENA.l) {
        this.x = ARENA.l + this.r;
        this.vx = Math.abs(this.vx) * this.bounce;
        this._bump();
      } else if (this.x + this.r > ARENA.r) {
        this.x = ARENA.r - this.r;
        this.vx = -Math.abs(this.vx) * this.bounce;
        this._bump();
      }
      if (this.y - this.r < ARENA.t) {
        this.y = ARENA.t + this.r;
        this.vy = Math.abs(this.vy) * this.bounce;
        this._bump();
      } else if (this.y + this.r > ARENA.b) {
        this.y = ARENA.b - this.r;
        this.vy = -Math.abs(this.vy) * this.bounce;
        this._bump();
      }
    }

    _collidePortal() {
      const dx = this.x - PORTAL.x;
      const dy = this.y - PORTAL.y;
      const d = Math.hypot(dx, dy);
      const minD = this.r + PORTAL.r;
      if (d < minD) {
        const n = norm(dx, dy);
        const overlap = minD - d;
        this.x += n.x * overlap;
        this.y += n.y * overlap;
        // bounce out
        const vn = this.vx * n.x + this.vy * n.y;
        this.vx -= (1.8 * vn) * n.x;
        this.vy -= (1.8 * vn) * n.y;
        this.vx *= this.bounce;
        this.vy *= this.bounce;
        this._bump();

        // damage portal
        // 如果游戏已经结束，不再造成伤害
        if (!gameEnded) {
          const hitDmg = (this.m * 9 + Math.min(70, this.speed()) * 0.18) * modifiers.roleCollisionMul;
          dealPortal(hitDmg);
          sparkle(PORTAL.x, PORTAL.y + PORTAL.r * 0.15, "#ffd1ef", 14);
        }
      }
    }

    _bump() {
      this.lastColl = now;
      puff(this.x, this.y, "rgba(0,0,0,0.18)", 6);
    }

    _emitStoppedEffect() {
      // 如果游戏已经结束，不再触发效果
      if (gameEnded) return;
      
      const eff = this.card.onStop;
      if (!eff) return;
      
      if (eff.kind === "shockwave") {
        effects.push({
          kind: "ring",
          x: this.x,
          y: this.y,
          t: 0,
          dur: 0.25,
          color: this.card.color,
          r0: 10,
          r1: eff.radius,
        });
        hitMonstersInRadius(this.x, this.y, eff.radius, eff.dmg, eff.knock);
      } else if (eff.kind === "arrows") {
        const target = findBestMonsterTarget(this.x, this.y, eff.range);
        if (target) {
          effects.push({
            kind: "line",
            x0: this.x,
            y0: this.y,
            x1: target.x,
            y1: target.y,
            t: 0,
            dur: 0.12,
            color: "rgba(80,180,255,0.95)",
          });
          target.takeDamage(eff.dmg);
          showDamageNumber(target.x, target.y, eff.dmg, "normal");
          sparkle(target.x, target.y, "#b8f2ff", 8);
        } else {
          // 没有怪物时攻击传送门
          effects.push({
            kind: "line",
            x0: this.x,
            y0: this.y,
            x1: PORTAL.x,
            y1: PORTAL.y + PORTAL.r * 0.15,
            t: 0,
            dur: 0.12,
            color: "rgba(80,180,255,0.95)",
          });
          dealPortal(eff.dmg * 0.3);
          showDamageNumber(PORTAL.x, PORTAL.y + PORTAL.r * 0.15, eff.dmg * 0.3, "normal");
          console.log("No target, shooting portal");
        }
        sparkle(PORTAL.x, PORTAL.y + PORTAL.r * 0.15, "#b8f2ff", 8);
      } else if (eff.kind === "frostArrows") {
        const target = findBestMonsterTarget(this.x, this.y, eff.range);
        if (target) {
          effects.push({
            kind: "line",
            x0: this.x,
            y0: this.y,
            x1: target.x,
            y1: target.y,
            t: 0,
            dur: 0.12,
            color: "rgba(100,200,255,0.95)",
          });
          target.takeDamage(eff.dmg);
          showDamageNumber(target.x, target.y, eff.dmg, "normal");
          
          // 添加冷冻减速效果
          if (!target.frostEffect) {
            target.frostEffect = {
              endTime: 0,
              slowMultiplier: eff.slowEffect || 0.6
            };
          }
          target.frostEffect.endTime = now + (eff.slowDuration || 2.5);
          target.frostEffect.slowMultiplier = eff.slowEffect || 0.6;
          
          // 冰冻特效
          sparkle(target.x, target.y, "#b8f2ff", 12);
          soundSystem.play('frost');
          effects.push({
            kind: "frost",
            x: target.x,
            y: target.y,
            t: 0,
            dur: 0.5,
            color: "rgba(150,220,255,0.8)"
          });
        } else {
          // 没有怪物时攻击传送门
          effects.push({
            kind: "line",
            x0: this.x,
            y0: this.y,
            x1: PORTAL.x,
            y1: PORTAL.y + PORTAL.r * 0.15,
            t: 0,
            dur: 0.12,
            color: "rgba(100,200,255,0.95)",
          });
          dealPortal(eff.dmg * 0.3);
          showDamageNumber(PORTAL.x, PORTAL.y + PORTAL.r * 0.15, eff.dmg * 0.3, "normal");
          console.log("No target, shooting portal with frost arrow");
        }
        sparkle(PORTAL.x, PORTAL.y + PORTAL.r * 0.15, "#b8f2ff", 8);
      } else if (eff.kind === "beam") {
        const target = findBestMonsterTarget(this.x, this.y, eff.range);
        const tx = target ? target.x : PORTAL.x;
        const ty = target ? target.y : PORTAL.y + PORTAL.r * 0.15;
        effects.push({
          kind: "line",
          x0: this.x,
          y0: this.y,
          x1: tx,
          y1: ty,
          t: 0,
          dur: 0.14,
          color: "rgba(165,120,255,0.95)",
        });
        if (target) {
          target.takeDamage(eff.dmg);
          showDamageNumber(tx, ty, eff.dmg, "normal");
          sparkle(tx, ty, "#ead7ff", 10);
        } else {
          dealPortal(eff.portalDmg);
        }
      } else if (eff.kind === "hellfireBeam") {
        const target = findBestMonsterTarget(this.x, this.y, 520);
        
        if (target) {
          // 检查目标是否变化
          if (this.lastBurnTarget !== target) {
            // 目标变化，重置灼烧计数
            this.burnTarget = target;
            this.burnStartTime = now;
            this.burnDamage = 0;
            this.lastBurnTarget = target;
          }
          
          // 计算灼烧伤害倍数
          const burnTime = now - this.burnStartTime;
          const rampProgress = Math.min(burnTime / eff.rampTime, 1.0);
          const damageMul = 1.0 + (eff.maxDmgMul - 1.0) * rampProgress;
          
          // 持续性射线：每帧都造成少量伤害，增加高频伤害数字
          const tickDamage = (eff.baseDmg * damageMul) * 0.15; // 每帧造成15%的伤害
          target.takeDamage(tickDamage);
          showDamageNumber(target.x, target.y, tickDamage, "burn");
          
          // 特效：持续火焰射线
          effects.push({
            kind: "line",
            x0: this.x,
            y0: this.y,
            x1: target.x,
            y1: target.y,
            t: 0,
            dur: 0.08, // 更短的持续时间，创造流畅的射线效果
            color: `rgba(255, 107, 53, ${0.7 + rampProgress * 0.3})`,
          });
          
          // 增强的火花粒子效果
          if (Math.random() < 0.8) { // 80%概率生成粒子
            sparkle(target.x + rand(-15, 15), target.y + rand(-15, 15), "#ff6b35", 6);
          }
          
          // 高倍数时的额外特效
          if (damageMul > 1.5) {
            for (let i = 0; i < 2; i++) {
              particles.push({
                x: target.x + rand(-25, 25),
                y: target.y + rand(-25, 25),
                vx: rand(-80, 80),
                vy: rand(-100, -30),
                r: rand(2, 5),
                t: 0,
                dur: rand(0.2, 0.4),
                color: "#ff6b35",
              });
            }
          }
        } else {
          // 没有怪物时攻击传送门
          // 重置灼烧计数
          this.lastBurnTarget = null;
          this.burnDamage = 0;
          
          // 攻击传送门
          const tickDamage = eff.baseDmg * 0.15; // 基础伤害的15%
          dealPortal(tickDamage);
          showDamageNumber(PORTAL.x, PORTAL.y + PORTAL.r * 0.15, tickDamage, "burn");
          
          // 特效：持续火焰射线到传送门
          effects.push({
            kind: "line",
            x0: this.x,
            y0: this.y,
            x1: PORTAL.x,
            y1: PORTAL.y + PORTAL.r * 0.15,
            t: 0,
            dur: 0.08,
            color: "rgba(255, 107, 53, 0.7)",
          });
          
          // 火花粒子效果
          if (Math.random() < 0.8) {
            sparkle(PORTAL.x + rand(-15, 15), PORTAL.y + PORTAL.r * 0.15 + rand(-15, 15), "#ff6b35", 6);
          }
        }
      } else if (eff.kind === "auraSlow") {
        effects.push({
          kind: "pulse",
          x: this.x,
          y: this.y,
          t: 0,
          dur: 0.20,
          color: "rgba(255,210,90,0.95)",
          r: eff.radius,
        });
        for (const m of monsters) {
          const d = Math.hypot(m.x - this.x, m.y - this.y);
          if (d <= eff.radius + m.r) {
            m.takeDamage(eff.dmg);
            showDamageNumber(m.x, m.y, eff.dmg, "normal");
            m.slowTimer = Math.max(m.slowTimer, 0.55);
            m.slowMul = Math.min(m.slowMul, eff.slow);
          }
        }
      } else if (eff.kind === "bomberSeek") {
        // 炸弹人：自动寻敌并自爆
        this.isBomber = true;
        this.bomberSpeed = eff.speed;
        this.explodeRadius = eff.explodeRadius;
        this.explodeDamage = eff.explodeDamage;
        this.targetMonster = null;
        this.bomberUpdateCd = 0;
      } else if (eff.kind === "thorLightning") {
        // 雷神之锤：连锁闪电
        const target = findBestMonsterTarget(this.x, this.y, 420);
        if (target) {
          // 主目标
          effects.push({
            kind: "line",
            x0: this.x,
            y0: this.y,
            x1: target.x,
            y1: target.y,
            t: 0,
            dur: 0.15,
            color: "rgba(65, 105, 225, 0.9)",
          });
          target.takeDamage(eff.dmg);
          showDamageNumber(target.x, target.y, eff.dmg, "normal");
          sparkle(target.x, target.y, "#4169e1", 10);
          
          // 连锁闪电
          let chainedTargets = [target];
          let currentTarget = target;
          
          for (let i = 0; i < eff.chainCount - 1; i++) {
            let nextTarget = null;
            let bestDistance = Infinity;
            
            // 寻找最近的未连锁目标
            for (const m of monsters) {
              if (m.hp <= 0 || chainedTargets.includes(m)) continue;
              const d = Math.hypot(m.x - currentTarget.x, m.y - currentTarget.y);
              if (d < eff.chainRadius && d < bestDistance) {
                bestDistance = d;
                nextTarget = m;
              }
            }
            
            if (nextTarget) {
              // 连锁闪电效果
              effects.push({
                kind: "line",
                x0: currentTarget.x,
                y0: currentTarget.y,
                x1: nextTarget.x,
                y1: nextTarget.y,
                t: 0,
                dur: 0.12,
                color: "rgba(100, 149, 237, 0.8)",
              });
              nextTarget.takeDamage(eff.dmg * 0.7); // 连锁伤害递减
              showDamageNumber(nextTarget.x, nextTarget.y, Math.floor(eff.dmg * 0.7), "normal");
              sparkle(nextTarget.x, nextTarget.y, "#6495ed", 8);
              
              chainedTargets.push(nextTarget);
              currentTarget = nextTarget;
            } else {
              break; // 没有更多目标
            }
          }
        } else {
          // 没有怪物时攻击传送门
          effects.push({
            kind: "line",
            x0: this.x,
            y0: this.y,
            x1: PORTAL.x,
            y1: PORTAL.y + PORTAL.r * 0.15,
            t: 0,
            dur: 0.15,
            color: "rgba(65, 105, 225, 0.9)",
          });
          dealPortal(eff.dmg * 0.5);
          showDamageNumber(PORTAL.x, PORTAL.y + PORTAL.r * 0.15, Math.floor(eff.dmg * 0.5), "normal");
          sparkle(PORTAL.x, PORTAL.y + PORTAL.r * 0.15, "#4169e1", 10);
        }
      }
    }

    draw(g) {
      const c = this.card.color;
      g.save();
      g.translate(this.x, this.y);

      // 寿命可视化：越接近消失越暗淡
      const lifeP = clamp(this.life / Math.max(0.001, this.maxLife), 0, 1);
      const fade = lifeP < 0.25 ? (0.25 + lifeP * 3.0) : 1;
      g.globalAlpha = fade;
      
      // 旋转效果（大盾）
      if (this.card.effect === "spin" && !this.stopped) {
        g.rotate(this.rotation);
      }
      
      // 光晕效果（法师）
      if (this.card.effect === "glow") {
        const glowGrd = g.createRadialGradient(0, 0, 0, 0, 0, this.r * 1.8);
        glowGrd.addColorStop(0, withAlpha(c, 0.25));
        glowGrd.addColorStop(0.4, withAlpha(c, 0.12));
        glowGrd.addColorStop(1, withAlpha(c, 0));
        g.fillStyle = glowGrd;
        g.beginPath();
        g.arc(0, 0, this.r * 1.8, 0, Math.PI * 2);
        g.fill();
      }
      
      // 尾迹效果（骑士）- 在角色后面绘制
      if (this.card.effect === "trail" && this.trail.length > 0) {
        for (let i = 0; i < this.trail.length; i++) {
          const p = this.trail[i];
          const alpha = (1 - p.t / p.dur) * 0.4;
          const r = this.r * (0.3 + 0.7 * (1 - p.t / p.dur));
          g.fillStyle = withAlpha(c, alpha);
          g.beginPath();
          g.arc(p.x - this.x, p.y - this.y, r, 0, Math.PI * 2);
          g.fill();
        }
      }
      
      // cute shadow
      g.fillStyle = "rgba(0,0,0,0.12)";
      g.beginPath();
      g.ellipse(6, this.r * 0.62, this.r * 0.92, this.r * 0.42, 0, 0, Math.PI * 2);
      g.fill();
      
      // body
      const grd = g.createRadialGradient(-this.r * 0.35, -this.r * 0.35, 6, 0, 0, this.r);
      grd.addColorStop(0, "#cdd6f4");
      grd.addColorStop(0.2, c);
      grd.addColorStop(1, shade(c, -18));
      g.fillStyle = grd;
      g.strokeStyle = "rgba(0,0,0,0.12)";
      g.lineWidth = 3;
      g.beginPath();
      g.arc(0, 0, this.r, 0, Math.PI * 2);
      g.fill();
      g.stroke();
      
      // 特殊装饰（根据卡牌类型）
      if (this.card.id === "knight") {
        // 骑士：小星星装饰
        g.fillStyle = "rgba(255,255,255,0.85)";
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI * 2) / 4 + now * 0.8;
          const dist = this.r * 0.75;
          g.beginPath();
          g.arc(Math.cos(angle) * dist, Math.sin(angle) * dist, 2.5, 0, Math.PI * 2);
          g.fill();
        }
      } else if (this.card.id === "archer") {
        // 弓手：小箭头装饰
        g.strokeStyle = "rgba(255,255,255,0.9)";
        g.lineWidth = 2.5;
        g.lineCap = "round";
        g.beginPath();
        g.moveTo(-this.r * 0.5, 0);
        g.lineTo(this.r * 0.5, 0);
        g.moveTo(this.r * 0.35, -this.r * 0.15);
        g.lineTo(this.r * 0.5, 0);
        g.lineTo(this.r * 0.35, this.r * 0.15);
        g.stroke();
      } else if (this.card.id === "mage") {
        // 法师：魔法阵装饰
        g.strokeStyle = withAlpha(c, 0.5);
        g.lineWidth = 2;
        g.beginPath();
        g.arc(0, 0, this.r * 0.6, 0, Math.PI * 2);
        g.stroke();
        g.beginPath();
        g.moveTo(-this.r * 0.42, -this.r * 0.42);
        g.lineTo(this.r * 0.42, this.r * 0.42);
        g.moveTo(this.r * 0.42, -this.r * 0.42);
        g.lineTo(-this.r * 0.42, this.r * 0.42);
        g.stroke();
      } else if (this.card.id === "shield") {
        // 大盾：盾牌装饰
        g.fillStyle = "rgba(255,255,255,0.7)";
        g.beginPath();
        g.roundRect(-this.r * 0.4, -this.r * 0.6, this.r * 0.8, this.r * 1.2, 8);
        g.fill();
        g.strokeStyle = "rgba(0,0,0,0.2)";
        g.lineWidth = 2;
        g.stroke();
      }
      
      // face
      g.fillStyle = "rgba(0,0,0,0.55)";
      g.beginPath();
      g.arc(-this.r * 0.24, -this.r * 0.10, 3.3, 0, Math.PI * 2);
      g.arc(this.r * 0.16, -this.r * 0.08, 3.3, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "rgba(255,70,140,0.55)";
      g.beginPath();
      g.arc(-this.r * 0.33, this.r * 0.10, 4, 0, Math.PI * 2);
      g.arc(this.r * 0.30, this.r * 0.12, 4, 0, Math.PI * 2);
      g.fill();

      // 寿命环：一圈进度条（快没时变红+闪烁）
      const ringR = this.r + 8;
      const blink = lifeP < 0.20 ? (0.55 + 0.45 * Math.sin(now * 18)) : 1;
      g.globalAlpha = Math.min(1, fade + 0.15) * blink;
      g.strokeStyle = "rgba(0,0,0,0.14)";
      g.lineWidth = 5;
      g.beginPath();
      g.arc(0, 0, ringR, 0, Math.PI * 2);
      g.stroke();
      g.strokeStyle = lifeP > 0.5 ? "rgba(70,210,130,0.95)" : lifeP > 0.2 ? "rgba(255,196,80,0.95)" : "rgba(255,90,90,0.95)";
      g.lineWidth = 5;
      g.beginPath();
      g.arc(0, 0, ringR, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * lifeP);
      g.stroke();

      g.restore();
    }

    _shieldExplosion() {
      // 软糖大盾死亡爆炸：对周围怪物造成范围伤害，对友方无效
      const explosionRadius = 120;
      const explosionDamage = 25;
      
      // 爆炸视觉效果
      effects.push({
        kind: "ring",
        x: this.x,
        y: this.y,
        t: 0,
        dur: 0.4,
        color: this.card.color,
        r0: this.r,
        r1: explosionRadius,
      });
      
      // 爆炸粒子效果
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: this.x,
          y: this.y,
          vx: rand(-200, 200),
          vy: rand(-200, 200),
          r: rand(3, 8),
          t: 0,
          dur: rand(0.3, 0.6),
          color: this.card.color,
        });
      }
      
      // 对范围内怪物造成伤害
      for (const monster of monsters) {
        if (monster.hp <= 0) continue;
        const distance = Math.hypot(monster.x - this.x, monster.y - this.y);
        if (distance <= explosionRadius + monster.r) {
          monster.takeDamage(explosionDamage);
          showDamageNumber(monster.x, monster.y, explosionDamage, "crit");
          
          // 击退效果
          const direction = norm(monster.x - this.x, monster.y - this.y);
          const knockbackForce = 150;
          monster.vx += direction.x * knockbackForce;
          monster.vy += direction.y * knockbackForce;
        }
      }
      
      // 闪光效果
      sparkle(this.x, this.y, this.card.color, 30);
    }

    takeDamage(dmg) {
      this.life -= dmg; // 角色使用生命值而不是HP
      if (this.life <= 0) {
        this.life = 0;
        this.dead = true;
        // 软糖大盾死亡爆炸
        if (this.card.id === "shield") {
          this._shieldExplosion();
        }
      }
    }

    bomberExplode() {
      // 炸弹人爆炸效果
      effects.push({
        kind: "ring",
        x: this.x,
        y: this.y,
        t: 0,
        dur: 0.4,
        color: "#ff4444",
        r0: this.r,
        r1: this.explodeRadius,
      });
      
      // 大量爆炸粒子
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: this.x,
          y: this.y,
          vx: rand(-250, 250),
          vy: rand(-250, 250),
          r: rand(3, 8),
          t: 0,
          dur: rand(0.3, 0.6),
          color: "#ff4444",
        });
      }
      
      // 对范围内怪物造成伤害
      for (const monster of monsters) {
        if (monster.hp <= 0) continue;
        const distance = Math.hypot(monster.x - this.x, monster.y - this.y);
        if (distance <= this.explodeRadius + monster.r) {
          monster.takeDamage(this.explodeDamage);
          showDamageNumber(monster.x, monster.y, this.explodeDamage, "crit");
          
          // 击退效果
          const direction = norm(monster.x - this.x, monster.y - this.y);
          const knockbackForce = 200;
          monster.vx += direction.x * knockbackForce;
          monster.vy += direction.y * knockbackForce;
        }
      }
      
      // 闪光效果
      sparkle(this.x, this.y, "#ff4444", 40);
      
      // 炸弹人牺牲
      this.dead = true;
    }
  }

  class Monster {
    constructor(kind, x, y, dayMul) {
      this.kind = kind; // minion / elite / boss / ghost / hunter / shooter

      // 不同怪物类型的基础属性
      let baseHp = 22;
      let hpMul = 1;
      let radius = 16;
      let baseSpeed = 65; // 从86降低到65
      let color = "#7be27a";

      if (kind === "boss") {
        baseHp = 180;
        hpMul = 1.8;
        radius = 34;
        baseSpeed = 55; // 从72降低到55
        color = "#ff4b4b";
      } else if (kind === "elite") {
        baseHp = 55;
        hpMul = 1.15;
        radius = 22;
        baseSpeed = 60; // 从78降低到60
        color = "#ff9a3c";
      } else if (kind === "ghost") {
        // 旋转光刃怪：血量略高，移速降低，会旋转发射扩散光刃
        baseHp = 32;
        hpMul = 1.2;
        radius = 24;
        baseSpeed = 35; // 从45进一步降低到35
        color = "#9d4edd";
      } else if (kind === "hunter") {
        // 斩杀怪：优先追击我方角色
        baseHp = 40;
        hpMul = 1.1;
        radius = 20;
        baseSpeed = 75; // 从95降低到75
        color = "#ffb447";
      } else if (kind === "shooter") {
        // 远程怪：走到中线附近后停下射击
        baseHp = 35;
        hpMul = 1.0;
        radius = 18;
        baseSpeed = 55; // 从70降低到55
        color = "#7fd5ff";
      } else if (kind === "bat") {
        // 蝙蝠怪：攻击角色卡，优先攻击寿命最高的
        baseHp = 28;
        hpMul = 1.0;
        radius = 16;
        baseSpeed = 60; // 中等速度
        color = "#2c2c2c"; // 黑色
      } else if (kind === "turret") {
        // 紫色炮台怪：入场到场地中央释放弹药
        baseHp = 45;
        hpMul = 1.1;
        radius = 26;
        baseSpeed = 40; // 移动到场地中央后停下
        color = "#8b5cf6"; // 紫色
      } else if (kind === "vampire") {
        // 吸血怪物：击杀后角色卡获得吸血效果
        baseHp = 38;
        hpMul = 1.0;
        radius = 18;
        baseSpeed = 70; // 中等速度
        color = "#dc2626"; // 深红色
      } else if (kind === "megaboss") {
        // 超大Boss：第5天和第10天出现
        baseHp = 800 + day * 100;
        hpMul = 2.5;
        radius = 60;
        baseSpeed = 30; // 从40降低到30
        color = "#8b0000"; // 深红色
      }

      this.maxHp = Math.round(baseHp * (1 + dayMul * 0.10) * hpMul);
      this.hp = this.maxHp;
      this.r = radius;
      this.x = x;
      this.y = y;
      this.vx = rand(-22, 22);
      this.vy = 0;
      this.baseSpeed = baseSpeed * (1 + dayMul * 0.03);
      this.color = color;
      this.slowTimer = 0;
      this.slowMul = 1;
      this.frozen = false;
      this.frozenTimer = 0;
      // 所有怪物都可以远程攻击
      this.stopped = false; // 是否已停在场地内
      this.shootCd = rand(1.5, 2.5); // 统一射击冷却时间
      this.stoppedY = 0; // 停下的目标Y位置（场地中下部）
      
      // 蝙蝠特有的目标更新
      if (kind === "bat") {
        this.currentTarget = null;
        this.targetUpdateCd = 0;
      }
    }

    update(dt) {
      // 冻结状态检查
      if (this.frozen) {
        this.frozenTimer -= dt;
        if (this.frozenTimer <= 0) {
          this.frozen = false;
        } else {
          // 冻结时不移动，但显示冰冻效果
          return;
        }
      }
      
      // 冷冻减速效果检查
      if (this.frostEffect && this.frostEffect.endTime > now) {
        if (!this.originalSpeed) {
          this.originalSpeed = this.speed;
        }
        this.speed = this.originalSpeed * this.frostEffect.slowMultiplier;
      } else if (this.frostEffect && this.frostEffect.endTime <= now) {
        // 冷冻效果结束，恢复原速度
        if (this.originalSpeed) {
          this.speed = this.originalSpeed;
          this.originalSpeed = null;
        }
        this.frostEffect = null;
      }
      
      // 旋转光刃怪也受减速场影响
      const fieldMul = getSlowFieldMul(this.x, this.y);
      if (this.slowTimer > 0) {
        this.slowTimer -= dt;
        if (this.slowTimer <= 0) this.slowMul = 1;
      }
      const mul = Math.min(this.slowMul, fieldMul);

      if (this.kind === "ghost") {
        // 旋转光刃怪：像其他怪物一样移动，停下后旋转发射扩散光刃
        if (!this.stopped) {
          // 确定停下的目标位置（场地中下部）
          if (this.stoppedY === 0) {
            this.stoppedY = ARENA.b - rand(70, 130);
          }
          
          // 朝目标位置移动
          const dy = this.stoppedY - this.y;
          if (Math.abs(dy) > 8) {
            const sp = this.baseSpeed * modifiers.monsterSpeedMul * mul;
            this.vy = Math.sign(dy) * Math.min(sp, Math.abs(dy) * 3);
            this.y += this.vy * dt;
          } else {
            // 到达目标位置，停下
            this.stopped = true;
            this.vy = 0;
            this.vx = rand(-18, 18);
          }
          
          // 移动时轻微左右飘动
          this.vx += rand(-10, 10) * dt;
          this.vx = clamp(this.vx, -35, 35);
          this.x += this.vx * dt;
        } else {
          // 已停下：旋转发射扩散光刃
          this.vx *= 0.95; // 水平速度衰减
          this.x += this.vx * dt;
          
          this.shootCd -= dt;
          if (this.shootCd <= 0) {
            // 发射8个方向的扩散光刃
            const bladeCount = 8;
            const bladeRange = 300;
            const bladeDmg = 2;
            
            for (let i = 0; i < bladeCount; i++) {
              const angle = (i / bladeCount) * Math.PI * 2 + now * 0.5; // 旋转效果
              const targetX = this.x + Math.cos(angle) * bladeRange;
              const targetY = this.y + Math.sin(angle) * bladeRange;
              
              // 创建光刃射击
              spawnShot(this.x, this.y, targetX, targetY, "blade", "any", bladeDmg);
              
              // 光刃特效
              effects.push({
                kind: "line",
                x0: this.x,
                y0: this.y,
                x1: targetX,
                y1: targetY,
                t: 0,
                dur: 0.3,
                color: "rgba(157, 78, 221, 0.8)",
              });
            }
            
            // 旋转特效
            effects.push({
              kind: "ring",
              x: this.x,
              y: this.y,
              t: 0,
              dur: 0.4,
              color: "rgba(157, 78, 221, 0.6)",
              r0: this.r,
              r1: this.r + 20,
            });
            
            this.shootCd = rand(2.0, 3.0);
          }
        }
      } else if (this.kind === "hunter" && roles.length > 0) {
        // 斩杀怪：朝最近的角色冲过去
        let target = roles[0];
        let bestD = Infinity;
        for (const r of roles) {
          const d = Math.hypot(r.x - this.x, r.y - this.y);
          if (d < bestD) {
            bestD = d;
            target = r;
          }
        }
        const dir = norm(target.x - this.x, target.y - this.y);
        const sp = this.baseSpeed * modifiers.monsterSpeedMul * mul;
        this.vx = dir.x * sp;
        this.vy = dir.y * sp;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
      } else if (this.kind === "bat" && roles.length > 0) {
        // 蝙蝠怪：优先攻击寿命最高的角色卡
        if (!this.targetUpdateCd || this.targetUpdateCd <= 0) {
          // 每隔一段时间更新目标，而不是每帧都更新
          let target = roles[0];
          let bestLife = -1;
          for (const r of roles) {
            if (r.life > bestLife) {
              bestLife = r.life;
              target = r;
            }
          }
          this.currentTarget = target;
          this.targetUpdateCd = 0.5; // 每0.5秒更新一次目标
        } else {
          this.targetUpdateCd -= dt;
        }
        
        if (!this.stopped) {
          // 朝目标角色移动
          const dir = norm(this.currentTarget.x - this.x, this.currentTarget.y - this.y);
          const sp = this.baseSpeed * modifiers.monsterSpeedMul * mul;
          this.vx = dir.x * sp;
          this.vy = dir.y * sp;
          this.x += this.vx * dt;
          this.y += this.vy * dt;
          
          // 接近目标时停下并开始攻击
          const d = Math.hypot(this.currentTarget.x - this.x, this.currentTarget.y - this.y);
          if (d < 200) {
            this.stopped = true;
            this.vx = 0;
            this.vy = 0;
          }
        } else {
          // 已停下：发射攻击，类似糖霜弓手
          this.shootCd -= dt;
          if (this.shootCd <= 0) {
            // 安全检查：确保目标仍然有效
            if (!this.currentTarget || this.currentTarget.dead) {
              // 重新寻找目标
              this.targetUpdateCd = 0;
              this.shootCd = 0.5;
              return;
            }
            
            const d = Math.hypot(this.currentTarget.x - this.x, this.currentTarget.y - this.y);
            if (d < 350) { // 射程范围
              effects.push({
                kind: "line",
                x0: this.x,
                y0: this.y,
                x1: this.currentTarget.x,
                y1: this.currentTarget.y,
                t: 0,
                dur: 0.12,
                color: "rgba(60, 60, 60, 0.95)", // 黑色弹道
              });
              this.currentTarget.takeDamage(9); // 与糖霜弓手相同的伤害
              showDamageNumber(this.currentTarget.x, this.currentTarget.y, 9, "normal");
              sparkle(this.currentTarget.x, this.currentTarget.y, "#666666", 8);
            }
            
            this.shootCd = rand(1.2, 2.0); // 攻击频率
          }
        }
      } else if (this.kind === "turret") {
        // 紫色炮台怪：移动到场地中央后释放弹药
        if (!this.stopped) {
          // 朝场地中央移动
          const centerX = (ARENA.l + ARENA.r) / 2;
          const centerY = (ARENA.t + ARENA.b) / 2;
          const dir = norm(centerX - this.x, centerY - this.y);
          const sp = this.baseSpeed * modifiers.monsterSpeedMul * mul;
          this.vx = dir.x * sp;
          this.vy = dir.y * sp;
          this.x += this.vx * dt;
          this.y += this.vy * dt;
          
          // 接近场地中央时停下
          const d = Math.hypot(centerX - this.x, centerY - this.y);
          if (d < 50) {
            this.stopped = true;
            this.vx = 0;
            this.vy = 0;
          }
        } else {
          // 已停下：向四周释放弹药
          this.shootCd -= dt;
          if (this.shootCd <= 0) {
            // 向8个方向发射弹药
            for (let i = 0; i < 8; i++) {
              const angle = (Math.PI * 2 * i) / 8;
              const targetX = this.x + Math.cos(angle) * 100;
              const targetY = this.y + Math.sin(angle) * 100;
              
              // 创建弹药投射物
              shots.push({
                kind: "spike",
                target: "wall",
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * 300,
                vy: Math.sin(angle) * 300,
                r: 6,
                t: 0,
                dmgLife: 3,
                dmgWall: 2,
                dmgPortal: 1,
                dead: false,
              });
            }
            
            // 视觉效果
            sparkle(this.x, this.y, "#8b5cf6", 12);
            this.shootCd = rand(2.5, 3.5); // 发射频率
          }
        }
      } else if (this.kind === "vampire") {
        // 吸血怪物：普通移动行为，类似minion
        const dir = norm(WORLD.w / 2 - this.x, (ARENA.t + ARENA.b) / 2 - this.y);
        const sp = this.baseSpeed * modifiers.monsterSpeedMul * mul;
        this.vx = dir.x * sp;
        this.vy = dir.y * sp;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
      } else {
        // 其他怪物（minion/elite/boss/shooter）：走到场地中下部后停下，远程攻击城墙
        // 超大Boss特殊处理：可以被阻挡，优先攻击角色卡
        if (this.kind === "megaboss") {
          // 超大Boss：可以被阻挡，优先攻击角色卡
          if (!this.stopped) {
            // 确定停下的目标位置（场地中下部）
            if (this.stoppedY === 0) {
              this.stoppedY = ARENA.b - rand(80, 140);
            }
            
            // 朝目标位置移动
            const dy = this.stoppedY - this.y;
            if (Math.abs(dy) > 8) {
              const sp = this.baseSpeed * modifiers.monsterSpeedMul * mul * 0.6; // 更慢的速度
              this.vy = Math.sign(dy) * Math.min(sp, Math.abs(dy) * 3);
              this.y += this.vy * dt;
            } else {
              // 到达目标位置，停下
              this.stopped = true;
              this.vy = 0;
              this.vx = rand(-15, 15);
            }
            
            // 移动时轻微左右飘动
            this.vx += rand(-10, 10) * dt;
            this.vx = clamp(this.vx, -30, 30);
            this.x += this.vx * dt;
          } else {
            // 已停下：优先攻击角色卡
            this.vx *= 0.95; // 水平速度衰减
            this.x += this.vx * dt;
            
            this.shootCd -= dt;
            if (this.shootCd <= 0) {
              // 优先攻击角色卡
              if (roles.length > 0 && Math.random() < 0.8) {
                let targetRole = null;
                let bestD = Infinity;
                for (const r of roles) {
                  const d = Math.hypot(r.x - this.x, r.y - this.y);
                  if (d < bestD && d < 400) {
                    bestD = d;
                    targetRole = r;
                  }
                }
                if (targetRole) {
                  const dmg = 3; // 降低伤害
                  spawnShot(this.x, this.y, targetRole.x, targetRole.y, "spike", "role", dmg);
                }
              } else {
                // 攻击城墙
                const wallY = WORLD.h - WALL_H;
                const dmg = 2; // 大幅降低城墙伤害
                spawnShot(this.x, this.y, this.x, wallY, "spike", "wall", dmg);
              }
              
              this.shootCd = rand(1.5, 2.8);
            }
          }
        } else if (!this.stopped) {
          // 确定停下的目标位置（场地中下部，靠近城墙）
          if (this.stoppedY === 0) {
            this.stoppedY = ARENA.b - rand(60, 120);
          }
          
          // 朝目标位置移动
          const dy = this.stoppedY - this.y;
          if (Math.abs(dy) > 8) {
            const sp = this.baseSpeed * modifiers.monsterSpeedMul * mul;
            this.vy = Math.sign(dy) * Math.min(sp, Math.abs(dy) * 3);
            this.y += this.vy * dt;
          } else {
            // 到达目标位置，停下
            this.stopped = true;
            this.vy = 0;
            this.vx = rand(-20, 20);
          }
          
          // 移动时轻微左右飘动
          this.vx += rand(-12, 12) * dt;
          this.vx = clamp(this.vx, -40, 40);
          this.x += this.vx * dt;
        } else {
          // 已停下：远程攻击城墙
          this.vx *= 0.95; // 水平速度衰减
          this.x += this.vx * dt;
          
          this.shootCd -= dt;
          if (this.shootCd <= 0) {
            // 攻击城墙
            const wallY = WORLD.h - WALL_H;
            const dmg = this.kind === "boss" ? 4 : this.kind === "elite" ? 2 : 1;
            spawnShot(this.x, this.y, this.x, wallY, this.kind === "boss" ? "spike" : "bubble", "wall", dmg);
            this.shootCd = rand(1.2, 2.5);
            
            // 偶尔也打一下角色（如果很近）
            if (Math.random() < 0.15 && roles.length > 0) {
              let targetRole = null;
              let bestD = Infinity;
              for (const r of roles) {
                const d = Math.hypot(r.x - this.x, r.y - this.y);
                if (d < bestD && d < 200) {
                  bestD = d;
                  targetRole = r;
                }
              }
              if (targetRole) {
                spawnShot(this.x, this.y, targetRole.x, targetRole.y, "bubble", "role");
              }
            }
          }
        }
      }

      // soft bounds（限制在场地内）
      if (this.x - this.r < ARENA.l) {
        this.x = ARENA.l + this.r;
        this.vx = Math.abs(this.vx) * 0.8;
      } else if (this.x + this.r > ARENA.r) {
        this.x = ARENA.r - this.r;
        this.vx = -Math.abs(this.vx) * 0.8;
      }
    }

    takeDamage(dmg) {
      this.hp -= dmg;
      
      // 添加受伤音效
      if (dmg > 0) {
        soundSystem.play('hit');
      }
      
      if (this.hp <= 0) {
        this.hp = 0;
        
        // 增加累计击杀数
        gameProgress.totalKills++;
        
        // 根据怪物类型给予金币奖励
        let coinReward = Math.floor(rand(10, 21));
        if (this.kind === "elite") coinReward = 100;
        else if (this.kind === "boss") coinReward = 50;
        else if (this.kind === "megaboss") coinReward = 200;

        gameProgress.coins += coinReward;
        updateUpgradePanel();

        // 显示金币浮动文字
        showGoldText(this.x, this.y, coinReward);
        
        // 如果是吸血怪物，给所有角色卡添加吸血效果
        if (this.kind === "vampire") {
          for (const role of roles) {
            if (!role.dead) {
              role.vampiricEndTime = now + 3.0; // 3秒吸血效果
              sparkle(role.x, role.y, "#dc2626", 8);
            }
          }
        }
        // 死亡特效
        this._deathEffect();
      }
    }

    _deathEffect() {
      // 怪物死亡特效
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: this.x,
          y: this.y,
          vx: rand(-120, 120),
          vy: rand(-120, 120),
          r: rand(2, 5),
          t: 0,
          dur: rand(0.2, 0.4),
          color: this.color,
        });
      }
      sparkle(this.x, this.y, this.color, 12);
    }

    draw(g) {
      const c = this.color;
      g.save();
      g.translate(this.x, this.y);
      
      // 特殊处理超大Boss
      const isMegaboss = this.kind === "megaboss";
      
      if (isMegaboss) {
        // Boss阴影
        g.fillStyle = "rgba(0,0,0,0.3)";
        g.beginPath();
        g.ellipse(8, this.r * 0.7, this.r * 1.1, this.r * 0.5, 0, 0, Math.PI * 2);
        g.fill();
        
        // Boss主体 - 铠甲外观
        const armorGrd = g.createRadialGradient(-this.r * 0.3, -this.r * 0.4, 10, 0, 0, this.r);
        armorGrd.addColorStop(0, "#ff4444");
        armorGrd.addColorStop(0.3, "#8b0000");
        armorGrd.addColorStop(0.7, "#4b0000");
        armorGrd.addColorStop(1, "#2b0000");
        
        g.fillStyle = armorGrd;
        g.strokeStyle = "#000000";
        g.lineWidth = 4;
        g.beginPath();
        g.arc(0, 0, this.r, 0, Math.PI * 2);
        g.fill();
        g.stroke();
        
        // 铠甲装饰 - 尖刺
        g.fillStyle = "#666666";
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 * i) / 8;
          const spikeX = Math.cos(angle) * (this.r - 10);
          const spikeY = Math.sin(angle) * (this.r - 10);
          
          g.beginPath();
          g.moveTo(spikeX, spikeY);
          g.lineTo(Math.cos(angle) * this.r, Math.sin(angle) * this.r);
          g.lineTo(Math.cos(angle + 0.2) * (this.r - 8), Math.sin(angle + 0.2) * (this.r - 8));
          g.closePath();
          g.fill();
        }
        
        // Boss眼睛 - 发光效果
        const eyeGlow = g.createRadialGradient(-this.r * 0.3, -this.r * 0.2, 2, -this.r * 0.3, -this.r * 0.2, 8);
        eyeGlow.addColorStop(0, "#ffff00");
        eyeGlow.addColorStop(0.5, "#ff8800");
        eyeGlow.addColorStop(1, "rgba(255, 136, 0, 0)");
        
        g.fillStyle = eyeGlow;
        g.beginPath();
        g.arc(-this.r * 0.3, -this.r * 0.2, 12, 0, Math.PI * 2);
        g.fill();
        
        g.beginPath();
        g.arc(this.r * 0.3, -this.r * 0.2, 12, 0, Math.PI * 2);
        g.fill();
        
        // 怪物嘴巴
        g.fillStyle = "#000000";
        g.beginPath();
        g.arc(0, this.r * 0.1, this.r * 0.3, 0, Math.PI);
        g.fill();
        
        // Boss血条 - 更大更醒目
        const barW = this.r * 2.5;
        const barH = 12;
        const barY = -this.r - 25;
        const hpP = this.hp / this.maxHp;
        
        g.fillStyle = "rgba(0,0,0,0.5)";
        g.fillRect(-barW/2, barY, barW, barH);
        
        const bossBarColor = hpP > 0.6 ? "#ff3333" : hpP > 0.3 ? "#ff8800" : "#ff0000";
        g.fillStyle = bossBarColor;
        g.fillRect(-barW/2, barY, barW * hpP, barH);
        
        g.strokeStyle = "#cdd6f4";
        g.lineWidth = 2;
        g.strokeRect(-barW/2, barY, barW, barH);
        
        // Boss名称
        g.fillStyle = "#cdd6f4";
        g.font = "bold 14px sans-serif";
        g.textAlign = "center";
        g.fillText("MEGA BOSS", 0, barY - 5);
        
      } else {
        // 普通怪物绘制逻辑
        const isGhost = this.kind === "ghost";
        const isHunter = this.kind === "hunter";
        const isShooter = this.kind === "shooter";
        const isBat = this.kind === "bat";

        // shadow (ghost lighter)
        g.fillStyle = isGhost ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.11)";
        g.beginPath();
        g.ellipse(4, this.r * 0.62, this.r * 0.95, this.r * 0.45, 0, 0, Math.PI * 2);
        g.fill();

        // ghost aura
        if (isGhost) {
          g.globalAlpha = 0.85;
          const aura = g.createRadialGradient(0, 0, this.r * 0.25, 0, 0, this.r * 1.8);
          aura.addColorStop(0, withAlpha(c, 0.22));
          aura.addColorStop(1, withAlpha(c, 0));
          g.fillStyle = aura;
          g.beginPath();
          g.arc(0, 0, this.r * 1.8, 0, Math.PI * 2);
          g.fill();
          g.globalAlpha = 0.75;
        } else {
          g.globalAlpha = 1;
        }

        // body
        const grd = g.createRadialGradient(-this.r * 0.25, -this.r * 0.35, 6, 0, 0, this.r);
        grd.addColorStop(0, "#cdd6f4");
        grd.addColorStop(0.4, c);
        grd.addColorStop(1, shade(c, -25));
        g.fillStyle = grd;
        g.strokeStyle = "rgba(0,0,0,0.12)";
        g.lineWidth = 3;
        g.beginPath();
        g.arc(0, 0, this.r, 0, Math.PI * 2);
        g.fill();
        g.stroke();

        // 冻结效果
        if (this.frozen) {
          g.fillStyle = "rgba(135, 206, 250, 0.6)";
          g.strokeStyle = "rgba(100, 149, 237, 0.8)";
          g.lineWidth = 2;
          g.beginPath();
          g.arc(0, 0, this.r + 3, 0, Math.PI * 2);
          g.fill();
          g.stroke();
          
          // 冰晶效果
          g.strokeStyle = "rgba(255, 255, 255, 0.8)";
          g.lineWidth = 1;
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 * i) / 6;
            const x1 = Math.cos(angle) * (this.r - 5);
            const y1 = Math.sin(angle) * (this.r - 5);
            const x2 = Math.cos(angle) * (this.r + 8);
            const y2 = Math.sin(angle) * (this.r + 8);
            g.beginPath();
            g.moveTo(x1, y1);
            g.lineTo(x2, y2);
            g.stroke();
          }
        }

        // ghost tail (wavy bottom)
        if (isGhost) {
          g.fillStyle = withAlpha("#cdd6f4", 0.55);
          g.beginPath();
          const yy = this.r * 0.55;
          g.moveTo(-this.r * 0.7, yy);
          for (let i = 0; i <= 5; i++) {
            const x = -this.r * 0.7 + (this.r * 1.4 * i) / 5;
            const wave = Math.sin(now * 6 + i * 1.7) * 4;
            g.quadraticCurveTo(x, yy + 14 + wave, x + (this.r * 1.4) / 10, yy);
          }
          g.closePath();
          g.fill();
        }

        // horns / ears / turret
        if (!isGhost && !isShooter) {
          // default horns
          g.fillStyle = "rgba(255,255,255,0.9)";
          g.beginPath();
          g.roundRect(-this.r * 0.65, -this.r * 0.95, this.r * 0.35, this.r * 0.35, 6);
          g.fill();
          g.beginPath();
          g.roundRect(this.r * 0.30, -this.r * 0.95, this.r * 0.35, this.r * 0.35, 6);
          g.fill();
        }
        if (isHunter) {
          // hunter spikes/ears
          g.fillStyle = "rgba(255,255,255,0.9)";
          g.beginPath();
          g.moveTo(-this.r * 0.55, -this.r * 0.55);
          g.lineTo(-this.r * 0.85, -this.r * 0.95);
          g.lineTo(-this.r * 0.30, -this.r * 0.78);
          g.closePath();
          g.fill();
          g.beginPath();
          g.moveTo(this.r * 0.55, -this.r * 0.55);
          g.lineTo(this.r * 0.85, -this.r * 0.95);
          g.lineTo(this.r * 0.30, -this.r * 0.78);
          g.closePath();
          g.fill();
        }
        if (isShooter) {
          // turret top + barrel
          g.fillStyle = "rgba(255,255,255,0.88)";
          g.beginPath();
          g.roundRect(-this.r * 0.45, -this.r * 1.05, this.r * 0.9, this.r * 0.55, 8);
          g.fill();
          g.strokeStyle = "rgba(0,0,0,0.10)";
          g.lineWidth = 2;
          g.stroke();
          g.strokeStyle = "rgba(255,255,255,0.95)";
          g.lineWidth = 5;
          g.lineCap = "round";
          g.beginPath();
          g.moveTo(0, -this.r * 0.82);
          g.lineTo(0, -this.r * 1.35);
          g.stroke();
        }
        if (isBat) {
          // 蝙蝠翅膀 - 动态扇动效果（优化：减少计算频率）
          g.fillStyle = "rgba(40, 40, 40, 0.8)";
          const wingFlap = Math.sin(now * 8) * 0.3 + 0.7; // 翅膀扇动动画
          
          // 左翅膀
          g.beginPath();
          g.moveTo(-this.r * 0.3, -this.r * 0.2);
          g.quadraticCurveTo(
            -this.r * 1.2, -this.r * 0.4, 
            -this.r * 1.5 * wingFlap, this.r * 0.1
          );
          g.quadraticCurveTo(
            -this.r * 1.2, this.r * 0.3,
            -this.r * 0.3, this.r * 0.1
          );
          g.closePath();
          g.fill();
          
          // 右翅膀
          g.beginPath();
          g.moveTo(this.r * 0.3, -this.r * 0.2);
          g.quadraticCurveTo(
            this.r * 1.2, -this.r * 0.4,
            this.r * 1.5 * wingFlap, this.r * 0.1
          );
          g.quadraticCurveTo(
            this.r * 1.2, this.r * 0.3,
            this.r * 0.3, this.r * 0.1
          );
          g.closePath();
          g.fill();
          
          // 蝙蝠耳朵
          g.fillStyle = "rgba(60, 60, 60, 0.9)";
          g.beginPath();
          g.moveTo(-this.r * 0.4, -this.r * 0.6);
          g.lineTo(-this.r * 0.6, -this.r * 1.0);
          g.lineTo(-this.r * 0.2, -this.r * 0.8);
          g.closePath();
          g.fill();
          g.beginPath();
          g.moveTo(this.r * 0.4, -this.r * 0.6);
          g.lineTo(this.r * 0.6, -this.r * 1.0);
          g.lineTo(this.r * 0.2, -this.r * 0.8);
          g.closePath();
          g.fill();
        }

        // face (ghost uses softer face)
        g.fillStyle = isGhost ? "rgba(0,0,0,0.40)" : "rgba(0,0,0,0.55)";
        g.beginPath();
        g.arc(-this.r * 0.22, -this.r * 0.08, 3, 0, Math.PI * 2);
        g.arc(this.r * 0.18, -this.r * 0.06, 3, 0, Math.PI * 2);
        g.fill();
        if (isHunter) {
          // fangs
          g.fillStyle = "rgba(255,255,255,0.85)";
          g.beginPath();
          g.moveTo(-this.r * 0.12, this.r * 0.12);
          g.lineTo(-this.r * 0.04, this.r * 0.34);
          g.lineTo(this.r * 0.04, this.r * 0.12);
          g.closePath();
          g.fill();
          g.beginPath();
          g.moveTo(this.r * 0.12, this.r * 0.12);
          g.lineTo(this.r * 0.04, this.r * 0.34);
          g.lineTo(-this.r * 0.04, this.r * 0.12);
          g.closePath();
          g.fill();
        }

        // hp bar
        const w = this.r * 1.4;
        const h = 6;
        const p = this.hp / this.maxHp;
        g.fillStyle = "rgba(0,0,0,0.16)";
        g.fillRect(-w / 2, -this.r - 14, w, h);
        g.fillStyle = p > 0.5 ? "rgba(60,210,120,0.95)" : p > 0.2 ? "rgba(255,196,80,0.95)" : "rgba(255,90,90,0.95)";
        g.fillRect(-w / 2, -this.r - 14, w * p, h);
      }
      
      g.restore();
    }
  }

  // --------- Effects / Particles ----------
  function puff(x, y, color, count) {
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
  function sparkle(x, y, color, count) {
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
  function updateParticles(dt) {
    // 限制最大粒子数量，避免性能问题
    const MAX_PARTICLES = 100; // 从200减少到100
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

  function updateDamageNumbers(dt) {
    // 限制最大伤害数字数量
    const MAX_DAMAGE_NUMBERS = 50;
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

  function drawParticles(g) {
    for (const p of particles) {
      const a = 1 - p.t / p.dur;
      g.fillStyle = withAlpha(p.color, a);
      g.beginPath();
      g.arc(p.x, p.y, p.r * (0.8 + 0.3 * a), 0, Math.PI * 2);
      g.fill();
    }
  }

  function drawDamageNumbers(g) {
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

  function updateGoldTexts(dt) {
    for (const gt of goldTexts) {
      gt.t += dt;
      gt.y += gt.vy * dt;
    }
    goldTexts = goldTexts.filter((gt) => gt.t < gt.dur);
  }

  function drawGoldTexts(g) {
    for (const gt of goldTexts) {
      const a = 1 - gt.t / gt.dur;
      const scale = 1.0 + (1 - a) * 0.3;

      g.save();
      g.translate(gt.x, gt.y);
      g.scale(scale, scale);

      // 描边
      g.strokeStyle = "rgba(0, 0, 0, 0.8)";
      g.lineWidth = 3;
      g.font = "bold 18px sans-serif";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.strokeText(`+${gt.amount} Gold`, 0, 0);

      // 填充
      g.fillStyle = withAlpha("#ffd700", a);
      g.fillText(`+${gt.amount} Gold`, 0, 0);

      g.restore();
    }
  }

  // --------- Helpers ----------
  function withAlpha(color, alpha) {
    if (color.startsWith("rgba")) return color.replace(/rgba\((.+?),\s*([0-9.]+)\)/, `rgba($1, ${alpha})`);
    if (color.startsWith("rgb(")) return color.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
    // hex to rgba
    if (color.startsWith("#")) {
      const h = color.replace("#", "");
      if (h.length === 6) {
        const r = parseInt(h.slice(0, 2), 16);
        const g = parseInt(h.slice(2, 4), 16);
        const b = parseInt(h.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
    }
    return color;
  }

  function shade(hex, amt) {
    // quick hex shade, expects #rrggbb
    const h = hex.replace("#", "");
    if (h.length !== 6) return hex;
    const r = clamp(parseInt(h.slice(0, 2), 16) + amt, 0, 255);
    const g = clamp(parseInt(h.slice(2, 4), 16) + amt, 0, 255);
    const b = clamp(parseInt(h.slice(4, 6), 16) + amt, 0, 255);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  function pointInCircle(px, py, cx, cy, r) {
    return (px - cx) ** 2 + (py - cy) ** 2 <= r ** 2;
  }

  function inArena(x, y) {
    return x >= ARENA.l && x <= ARENA.r && y >= ARENA.t && y <= ARENA.b;
  }

  function findBestMonsterTarget(x, y, range) {
    /** @type {Monster|null} */
    let best = null;
    let bestScore = -Infinity;
    for (const m of monsters) {
      if (m.hp <= 0) continue;
      const d = Math.hypot(m.x - x, m.y - y);
      if (d > range) continue;
      const kindScore = m.kind === "boss" ? 50 : m.kind === "elite" ? 15 : 0;
      const score = kindScore - d * 0.04 + (1 - m.hp / m.maxHp) * 2.0;
      if (score > bestScore) {
        bestScore = score;
        best = m;
      }
    }
    return best;
  }

  function hitMonstersInRadius(x, y, radius, dmg, knock) {
    for (const m of monsters) {
      if (m.hp <= 0) continue;
      const dx = m.x - x;
      const dy = m.y - y;
      const d = Math.hypot(dx, dy);
      if (d <= radius + m.r) {
        const falloff = 0.55 + 0.45 * (1 - clamp(d / (radius + m.r), 0, 1));
        m.takeDamage(dmg * falloff);
        const n = norm(dx, dy);
        m.x += n.x * knock * 0.03;
        m.y += n.y * knock * 0.03;
        m.vx += n.x * knock * 0.22;
        // little stagger
        m.slowTimer = Math.max(m.slowTimer, 0.25);
        m.slowMul = Math.min(m.slowMul, 0.85);
      }
    }
  }

  function getSlowFieldMul(x, y) {
    let mul = 1;
    for (const e of effects) {
      if (e.kind === "fieldSlow") {
        const d = Math.hypot(x - e.x, y - e.y);
        if (d <= e.radius) mul = Math.min(mul, e.slow);
      }
    }
    return mul;
  }

  // 传送门防御机制
  let portalDefense = {
    lastHitTime: 0,
    hitCount: 0,
    defenseCooldown: 0,
    spawnQueue: []
  };

  function dealPortal(dmg) {
    // 如果游戏已经结束，不再处理传送门伤害
    if (gameEnded) return;
    
    portal.hp = Math.max(0, portal.hp - dmg);
    
    // 记录受到攻击的时间
    const currentTime = now;
    if (currentTime - portalDefense.lastHitTime < 2.0) {
      portalDefense.hitCount++;
    } else {
      portalDefense.hitCount = 1;
    }
    portalDefense.lastHitTime = currentTime;
    
    // 当连续受到攻击或累计伤害达到阈值时，生成防御小怪
    if (portalDefense.hitCount >= 3 && portalDefense.defenseCooldown <= 0) {
      spawnPortalDefenders();
      portalDefense.defenseCooldown = 8.0; // 8秒冷却
      portalDefense.hitCount = 0;
    }
    
    if (portal.hp <= 0) {
      portal.hp = 0;
      gameEnded = true; // 设置游戏结束标志
      onDayClear(); // 传送门被摧毁时算作当天胜利
    }
  }

  function spawnPortalDefenders() {
    const defenderCount = Math.floor(2 + Math.random() * 3); // 2-4只防御小怪
    for (let i = 0; i < defenderCount; i++) {
      setTimeout(() => {
        const angle = (Math.PI * 2 * i) / defenderCount;
        const spawnRadius = PORTAL.r + 30;
        const x = PORTAL.x + Math.cos(angle) * spawnRadius;
        const y = PORTAL.y + Math.sin(angle) * spawnRadius;
        
        // 生成防御型小怪（优先选择近战类型）
        const defenderType = Math.random() < 0.7 ? "hunter" : "minion";
        monsters.push(new Monster(defenderType, x, y, day));
        puff(x, y, "rgba(255,100,100,0.8)", 8);
      }, i * 200); // 依次生成，间隔200ms
    }
    
    // 视觉效果：传送门发出红光
    sparkle(PORTAL.x, PORTAL.y, "#ff6b6b", 20);
  }

  function spawnShot(x0, y0, x1, y1, kind, target, dmgOverride = null) {
    const dir = norm(x1 - x0, y1 - y0);
    const sp = kind === "bubble" ? 520 : 460;
    // 根据目标类型设置伤害
    let dmgPortal = 1;
    if (target === "portal" && dmgOverride !== null) {
      dmgPortal = dmgOverride;
    } else if (target === "portal") {
      dmgPortal = kind === "spike" ? 2 : 1;
    }
    shots.push({
      kind, // bubble / spike
      target, // role / wall / portal
      x: x0,
      y: y0,
      vx: dir.x * sp,
      vy: dir.y * sp,
      r: kind === "bubble" ? 8 : 7,
      t: 0,
      dmgLife: kind === "bubble" ? 4 : 6,
      dmgWall: kind === "bubble" ? 1 : 2,
      dmgPortal, // 攻击传送门的伤害
      dead: false,
    });
    // muzzle flash
    sparkle(x0, y0, kind === "bubble" ? "#d9f2ff" : "#ffe2da", 6);
  }

  // --------- Spawning / Day Loop ----------
  function setupDay(d) {
    day = d;
    gameEnded = false; // 重置游戏结束标志
    pausedOverlay = false; // 重置暂停覆盖层标志
    // apply pending modifier into modifiers for this day only
    if (pendingModifier) {
      applyModifier(pendingModifier);
      pendingModifier = null;
    } else {
      resetModifiers();
    }

    maxMana = 10 + modifiers.maxManaBonus;
    manaRegen = 1.0 * modifiers.manaRegenMul; // 从1.35降低到1.0
    mana = Math.min(mana, maxMana);

    wall.maxHp = 52 + modifiers.wallMaxHpBonus;
    wall.hp = wall.maxHp; // 重置城墙血量为满血

    portal.maxHp = Math.round((120 + day * 18) * modifiers.portalMaxHpMul);
    portal.hp = portal.maxHp;

    // clear objects
    roles = [];
    monsters = [];
    effects = [];
    particles = [];
    spawn.time = 0;
    spawn.done = false;

    // 重置游戏法术使用次数（不重置，整个游戏累计）
    // gameSpellUses 不在这里重置，保持整个游戏的累计使用次数

    // 根据天数循环的怪物配置（无尽模式）
    const dayInCycle = ((day - 1) % 5) + 1; // 1-5循环
    const cycleNumber = Math.floor((day - 1) / 5) + 1; // 第几个循环
    
    let total, elite, boss, specialMonsters = [];
    
    switch(dayInCycle) {
      case 1: // 第1天：只有普通怪物
        total = 5 + Math.floor(cycleNumber * 2);
        elite = 0;
        boss = 0;
        break;
      case 2: // 第2天：普通 + 少量精英
        total = 6 + Math.floor(cycleNumber * 2);
        elite = 1 + Math.floor(cycleNumber / 2);
        boss = 0;
        break;
      case 3: // 第3天：普通 + 精英 + 特殊怪物
        total = 7 + Math.floor(cycleNumber * 2);
        elite = 2 + Math.floor(cycleNumber / 2);
        boss = 0;
        specialMonsters = ['ghost']; // 旋转光刃怪
        break;
      case 4: // 第4天：普通 + 精英 + 更多特殊怪物
        total = 8 + Math.floor(cycleNumber * 2);
        elite = 3 + Math.floor(cycleNumber / 2);
        boss = 0;
        specialMonsters = ['ghost', 'hunter']; // 旋转光刃怪 + 斩杀怪
        break;
      case 5: // 第5天：Boss战
        total = 4 + Math.floor(cycleNumber * 1);
        elite = 2 + Math.floor(cycleNumber / 2);
        boss = 1;
        specialMonsters = ['ghost', 'hunter', 'shooter']; // 所有特殊怪物
        break;
    }
    
    // 每个循环增加难度
    const difficultyMultiplier = 1 + (cycleNumber - 1) * 0.2;
    total = Math.floor(total * difficultyMultiplier);
    elite = Math.floor(elite * difficultyMultiplier);
    
    // 超大Boss（每10天）
    const megaboss = (day % 10 === 0) ? 1 : 0;
    
    spawn.remaining = total;
    spawn.eliteRemaining = elite;
    spawn.bossRemaining = boss;
    spawn.megabossRemaining = megaboss;
    spawn.specialMonsters = specialMonsters;
    spawn.nextAt = 0.5;

    setHint();
    renderCards();
    hideOverlay();
  }

  function resetModifiers() {
    modifiers = {
      monsterSpeedMul: 1,
      roleCollisionMul: 1,
      portalMaxHpMul: 1,
      manaRegenMul: 1,
      wallMaxHpBonus: 0,
      maxManaBonus: 0,
    };
  }

  function applyModifier(mod) {
    resetModifiers();
    switch (mod.kind) {
      case "manaRegenUp":
        modifiers.manaRegenMul = 1.25;
        break;
      case "monsterSpeedUp":
        modifiers.monsterSpeedMul = 1.2;
        break;
      case "wallUp":
        modifiers.wallMaxHpBonus = 12;
        break;
      case "portalArmor":
        modifiers.portalMaxHpMul = 1.15;
        break;
      case "roleCollisionUp":
        modifiers.roleCollisionMul = 1.15;
        break;
      case "maxManaUp":
        modifiers.maxManaBonus = 2;
        break;
      default:
        break;
    }
  }

  function rollNextDayModifier() {
    const pool = [
      { kind: "manaRegenUp", text: "Buff：法术回复 +25%" },
      { kind: "wallUp", text: "Buff：城墙最大生命 +12" },
      { kind: "roleCollisionUp", text: "Buff：角色碰撞伤害 +15%" },
      { kind: "maxManaUp", text: "Buff：法术上限 +2" },
      { kind: "portalArmor", text: "Debuff：传送门生命 +15%" },
      { kind: "monsterSpeedUp", text: "Debuff：怪物速度 +20%" },
    ];
    return pick(pool);
  }

  function spawnOne(kind) {
    // kind 是"minion / elite / boss"这类层级，再细分出具体行为型怪物
    let actualKind = kind;
    
    if (kind === "minion") {
      // 根据当前天数的特殊怪物配置来决定
      if (spawn.specialMonsters && spawn.specialMonsters.length > 0) {
        // 有特殊怪物配置，优先生成特殊怪物
        const r = Math.random();
        if (r < 0.3) {
          // 30%概率生成特殊怪物
          actualKind = pick(spawn.specialMonsters);
        } else {
          actualKind = "minion"; // 普通怪物
        }
      } else {
        // 没有特殊怪物配置，使用原来的随机逻辑
        const r = Math.random();
        if (r < 0.12) actualKind = "ghost";
        else if (r < 0.22) actualKind = "bat";
        else if (r < 0.28) actualKind = "turret";
        else if (r < 0.33) actualKind = "vampire";
        else if (r < 0.48) actualKind = "hunter";
        else if (r < 0.63) actualKind = "shooter";
      }
    } else if (kind === "elite") {
      // 精英怪物也考虑特殊配置
      if (spawn.specialMonsters && spawn.specialMonsters.length > 0) {
        const r = Math.random();
        if (r < 0.4) {
          // 40%概率生成特殊精英怪物
          actualKind = pick(spawn.specialMonsters);
        } else {
          actualKind = "elite";
        }
      } else {
        const r = Math.random();
        if (r < 0.18) actualKind = "bat";
        else if (r < 0.25) actualKind = "turret";
        else if (r < 0.30) actualKind = "vampire";
        else if (r < 0.50) actualKind = "hunter";
        else if (r < 0.70) actualKind = "shooter";
      }
    }

    const x = PORTAL.x + rand(-PORTAL.r * 0.55, PORTAL.r * 0.55);
    const y = PORTAL.y + PORTAL.r * 0.35 + rand(-6, 10);
    monsters.push(new Monster(actualKind, x, y, day));
    puff(x, y, "rgba(255,255,255,0.65)", 6);
  }

  function updateSpawns(dt) {
    if (spawn.done) return;
    spawn.time += dt;
    if (spawn.time < spawn.nextAt) return;

    // 控制刷怪节奏：一次只刷1只，间隔更长，避免一次性全出来
    let spawned = false;
    if (spawn.megabossRemaining > 0) {
      spawnOne("megaboss");
      spawn.megabossRemaining--;
      spawned = true;
      console.log("Spawned megaboss");
    } else if (spawn.bossRemaining > 0) {
      spawnOne("boss");
      spawn.bossRemaining--;
      spawned = true;
      console.log("Spawned boss");
    } else if (spawn.eliteRemaining > 0 && Math.random() < 0.45) {
      spawnOne("elite");
      spawn.eliteRemaining--;
      spawned = true;
      console.log("Spawned elite");
    } else if (spawn.remaining > 0) {
      spawnOne("minion");
      spawn.remaining--;
      spawned = true;
    }

    if (spawn.remaining <= 0 && spawn.eliteRemaining <= 0 && spawn.bossRemaining <= 0 && spawn.megabossRemaining <= 0) {
      spawn.done = true;
      return;
    }
    
    // 根据剩余数量调整间隔：剩余越多，间隔越长（避免一次性涌出）
    const totalRemaining = spawn.remaining + spawn.eliteRemaining + spawn.bossRemaining + spawn.megabossRemaining;
    const baseInterval = 1.2; // 基础间隔
    const maxInterval = 2.5; // 最大间隔
    const interval = baseInterval + (maxInterval - baseInterval) * Math.min(1, totalRemaining / 15);
    spawn.nextAt = spawn.time + rand(interval * 0.8, interval * 1.2);
  }

  // --------- Collisions ----------
  function resolveRoleRole(r1, r2) {
    const dx = r2.x - r1.x;
    const dy = r2.y - r1.y;
    const d = Math.hypot(dx, dy);
    const minD = r1.r + r2.r;
    if (d >= minD || d <= 0.0001) return;
    
    const n = { x: dx / d, y: dy / d };
    const overlap = minD - d;
    
    // separate: 按质量比例分离
    const totalM = r1.m + r2.m;
    r1.x -= n.x * overlap * (r2.m / totalM);
    r1.y -= n.y * overlap * (r2.m / totalM);
    r2.x += n.x * overlap * (r1.m / totalM);
    r2.y += n.y * overlap * (r1.m / totalM);

    // relative velocity along normal
    const rvx = r2.vx - r1.vx;
    const rvy = r2.vy - r1.vy;
    const vn = rvx * n.x + rvy * n.y;
    if (vn > 0) return; // 分离中，不需要处理

    // 弹性碰撞：交换动量
    const e = 0.75; // 稍微弹性一点，更有弹跳感
    const j = (-(1 + e) * vn) / (1 / r1.m + 1 / r2.m);
    
    r1.vx -= (j / r1.m) * n.x;
    r1.vy -= (j / r1.m) * n.y;
    r2.vx += (j / r2.m) * n.x;
    r2.vy += (j / r2.m) * n.y;

    // 轻微阻尼
    r1.vx *= 0.97;
    r1.vy *= 0.97;
    r2.vx *= 0.97;
    r2.vy *= 0.97;

    r1.lastColl = now;
    r2.lastColl = now;

    // 视觉效果：碰撞粒子
    const sp1 = r1.speed();
    const sp2 = r2.speed();
    const avgSp = (sp1 + sp2) * 0.5;
    const midX = (r1.x + r2.x) * 0.5;
    const midY = (r1.y + r2.y) * 0.5;
    
    // 混合两种角色的颜色（简单混合）
    puff(midX, midY, r1.card.color, Math.min(8, Math.floor(avgSp * 0.06)));
    puff(midX, midY, r2.card.color, Math.min(8, Math.floor(avgSp * 0.06)));
    sparkle(midX, midY, "#cdd6f4", Math.min(6, Math.floor(avgSp * 0.04)));

    // 高速碰撞时，会互相加速消耗寿命（模拟"碰撞磨损"）
    if (avgSp > 180) {
      const wear = Math.min(avgSp * 0.012, 3.5);
      r1.life -= wear;
      r2.life -= wear;
      if (r1.life <= 0) r1.dead = true;
      if (r2.life <= 0) r2.dead = true;
    }
  }

  function resolveRoleMonster(role, m) {
    // 所有怪物都会被角色阻挡
    const dx = m.x - role.x;
    const dy = m.y - role.y;
    const d = Math.hypot(dx, dy);
    const minD = role.r + m.r;
    if (d >= minD || d <= 0.0001) return;
    const n = { x: dx / d, y: dy / d };
    const overlap = minD - d;
    // separate
    const totalM = role.m + 1.0;
    role.x -= n.x * overlap * (1.0 / totalM);
    role.y -= n.y * overlap * (1.0 / totalM);
    m.x += n.x * overlap * (role.m / totalM);
    m.y += n.y * overlap * (role.m / totalM);

    // relative velocity along normal
    const rvx = m.vx - role.vx;
    const rvy = m.vy - role.vy;
    const vn = rvx * n.x + rvy * n.y;
    if (vn > 0) return;

    const e = 0.72; // restitution
    const j = (-(1 + e) * vn) / (1 / role.m + 1 / 1.0);
    role.vx -= (j / role.m) * n.x;
    role.vy -= (j / role.m) * n.y;
    m.vx += (j / 1.0) * n.x;
    // m.vy is driven by AI; only a tiny push is ok

    role.vx *= 0.96;
    role.vy *= 0.96;

    role.lastColl = now;

    // collision damage (always some)
    const sp = Math.min(260, role.speed());
    const base = 7 + role.m * 5;
    const dmg = (base + sp * 0.05) * modifiers.roleCollisionMul;
    
    m.takeDamage(dmg);
    showDamageNumber((role.x + m.x) / 2, (role.y + m.y) / 2, dmg, "normal");
    puff((role.x + m.x) / 2, (role.y + m.y) / 2, "rgba(255,255,255,0.55)", 8);

    // 吸血效果：将造成伤害的45%转化为角色寿命
    if (role.vampiricEndTime > now) {
      const lifeGain = dmg * 0.45;
      role.life = Math.min(role.life + lifeGain, role.maxLife);
      showDamageNumber(role.x, role.y, lifeGain, "heal");
      sparkle(role.x, role.y, "#dc2626", 6);
    }

    // 斩杀怪：顺便大量削减角色生命，优先清理角色
    if (m.kind === "hunter") {
      role.life -= 6;
      if (role.life <= 0) {
        role.dead = true;
        sparkle(role.x, role.y, role.card.color, 10);
      }
    }
  }

  // --------- Spells ----------
  function castSpell(card, at) {
    const spell = card.spell;
    if (!spell) return;
    
    // 检查每日使用次数限制
    if (spell.kind === "healWall") {
              if (gameSpellUses.heal >= MAX_GAME_SPELL_USES.heal) {
                showOverlay("使用次数限制", `城墙修补整个游戏已使用${gameSpellUses.heal}/${MAX_GAME_SPELL_USES.heal}次`, "确定");
                return;
              }
              gameSpellUses.heal++;
            }
    if (spell.kind === "fieldSlow") {
      effects.push({
        kind: "fieldSlow",
        x: at.x,
        y: at.y,
        t: 0,
        dur: spell.duration,
        radius: spell.radius,
        slow: spell.slow,
        color: "rgba(110,240,225,0.45)",
      });
      sparkle(at.x, at.y, "#c8fff8", 18);
    } else if (spell.kind === "burst") {
      effects.push({
        kind: "burst",
        x: at.x,
        y: at.y,
        t: 0,
        dur: 0.22,
        radius: spell.radius,
        color: "rgba(255,140,100,0.55)",
      });
      hitMonstersInRadius(at.x, at.y, spell.radius, spell.dmg, spell.knock);
      sparkle(at.x, at.y, "#ffd8c8", 22);
    } else if (spell.kind === "healWall") {
      wall.hp = clamp(wall.hp + spell.heal, 0, wall.maxHp);
      showDamageNumber(SLING.x, SLING.y, spell.heal, "heal");
      sparkle(SLING.x, SLING.y + 18, "#c9ffd9", 18);
      effects.push({ kind: "text", x: SLING.x, y: SLING.y - 20, t: 0, dur: 0.8, text: `+${spell.heal}`, color: "#25b45b" });
    } else if (spell.kind === "chargeMana") {
      mana = clamp(mana + spell.gain, 0, maxMana);
      effects.push({ kind: "buff", t: 0, dur: spell.duration, regenBonus: spell.regenBonus });
      sparkle(SLING.x, SLING.y - 20, "#cfe6ff", 18);
    }
  }

  function bonusManaRegen() {
    let bonus = 0;
    for (const e of effects) {
      if (e.kind === "buff") bonus += e.regenBonus;
    }
    return bonus;
  }

  function updateEffects(dt) {
    for (const e of effects) e.t += dt;
    effects = effects.filter((e) => e.t < (e.dur ?? 0.2));
  }

  function renderCards() {
    cardsEl.innerHTML = "";
    
    // 获取当前可用的8张卡牌
    const availableCards = getAvailableCards();
    
    // 按每行2张卡牌排列
    const cardsPerRow = 2;
    const rows = [];
    
    for (let i = 0; i < availableCards.length; i += cardsPerRow) {
      rows.push(availableCards.slice(i, i + cardsPerRow));
    }
    
    rows.forEach((row) => {
      const rowEl = document.createElement("div");
      rowEl.className = "card-row";
      
      row.forEach((card) => {
        const el = document.createElement("div");
        el.className = "card";
        el.dataset.cardId = card.id;
        el.classList.toggle("selected", card.id === selectedCardId);
        el.classList.toggle("disabled", card.cost > mana);
        
        const isSpell = card.type === "spell";
        const color = isSpell ? card.color : card.color;
        
        el.innerHTML = `
          <div class="topline">
            <div class="type">${isSpell ? "法术" : "角色"}</div>
            <div class="cost">${card.cost}</div>
          </div>
          <div class="name">${card.name}</div>
          <div class="desc">${card.desc}</div>
        `;
        
        el.style.borderColor = withAlpha(color, 0.6);
        el.addEventListener("click", () => {
          if (pausedOverlay) return;
          if (card.cost > mana) {
            flashHint("法术不够噢～先等等回复。");
            return;
          }
          selectedCardId = selectedCardId === card.id ? null : card.id;
          setHint();
          syncCardStyles();
        });
        rowEl.appendChild(el);
      });
      
      cardsEl.appendChild(rowEl);
    });
  }

  function getAvailableCards() {
    // 固定8张卡牌池，根据天数轮换
    const baseCards = [
      CARDS[0], // knight
      CARDS[1], // archer  
      CARDS[2], // mage
      CARDS[3], // shield
      CARDS[4], // ice
      CARDS[5], // fire
      CARDS[6], // heal
      CARDS[7]  // charge
    ];
    
    // 根据天数添加新卡牌
    if (day >= 2) {
      baseCards.push(CARDS[8]); // hellfire
    }
    
    // 如果超过8张，移除最早的
    if (baseCards.length > 8) {
      baseCards.splice(0, baseCards.length - 8);
    }
    
    return baseCards;
  }

  function syncCardStyles() {
    for (const el of cardsEl.querySelectorAll(".card")) {
      const id = el.dataset.cardId;
      const card = CARDS.find((c) => c.id === id);
      el.classList.toggle("selected", id === selectedCardId);
      el.classList.toggle("disabled", !!card && card.cost > mana);
    }
  }

  let hintFlash = 0;
  function flashHint(text) {
    hudHint.textContent = text;
    hintFlash = 1.2;
  }

  function setHint() {
    const card = CARDS.find((c) => c.id === selectedCardId);
    if (!card) {
      hudHint.textContent = "选择卡牌：角色卡在弹弓发射；法术卡点击场地施放。";
      return;
    }
    if (card.type === "role") {
      hudHint.textContent = `已选择【${card.name}】— 在弹弓上拖拽并松手发射（耗 ${card.cost}）。`;
    } else if (card.target === "arena") {
      hudHint.textContent = `已选择【${card.name}】— 点击场地任意位置施放（耗 ${card.cost}）。`;
    } else {
      hudHint.textContent = `已选择【${card.name}】— 点击卡牌立刻释放（耗 ${card.cost}）。`;
    }
  }

  // --------- Overlay ----------
  function showOverlay(title, desc, btnText) {
    console.log("showOverlay called:", title, desc, btnText);
    pausedOverlay = true;
    overlayTitle.textContent = title;
    overlayDesc.textContent = desc;
    overlayBtn.textContent = btnText;
    overlayEl.classList.remove("hidden");
    console.log("Overlay should be visible now");
  }
  function hideOverlay() {
    pausedOverlay = false;
    overlayEl.classList.add("hidden");
  }

  function onDayClear() {
    if (pausedOverlay) return;
    
    // 播放胜利音效
    soundSystem.play('levelComplete');
    
    // 保存当前进度
    gameProgress.currentDay = day + 1;
    gameProgress.saveTime = new Date().toISOString();
    saveProgress();
    
    if (day > gameProgress.bestDay) {
      gameProgress.bestDay = day;
    }
    
    // 第4天胜利后直接进入第5天boss战
    if (day === 4) {
      setupDay(5);
      return;
    }
    
    // 其他天数正常显示胜利界面
    pendingModifier = rollNextDayModifier();
    showOverlay(
      `第 ${day} 天胜利！`,
      `传送门已清空。\n\n下一天随机效果：\n- ${pendingModifier.text}\n\n提示：怪物碰到城墙会扣血，城墙清零则失败。`,
      "进入下一天"
    );
  }

  
  function onGameOver() {
    if (pausedOverlay) return;
    
    // 播放失败音效
    soundSystem.play('gameOver');
    
    // 保存当前进度
    saveProgress();
    
    // 计算游戏奖励
    const rewards = calculateGameRewards();
    gameProgress.coins += rewards.coins;
    
    // 更新最高天数
    if (day > gameProgress.bestDay) {
      gameProgress.bestDay = day;
    }
    
    saveProgress();
    
    showOverlay(
      "城墙被突破了…",
      `你坚持到了第 ${day} 天。\n\n获得奖励：${rewards.coins} 金币\n总击杀：${rewards.kills}\n\n点按钮重新开始（从第 1 天）。`,
      "重新开始"
    );
  }

  overlayBtn.addEventListener("click", () => {
    // 防止在非正常状态下点击
    if (!pausedOverlay) return;
    
    if (overlayTitle.textContent.includes("重新开始") || overlayTitle.textContent.includes("突破")) {
      // 重新开始：保留金币和累计击杀，只重置游戏进度
      const name = prompt("请输入新存档的名称：", `${gameProgress.saveName}_重试`);
      if (name) {
        // 找空槽位或覆盖当前槽位
        let targetSlot = gameProgress.saveSlot;
        for (let i = 1; i <= 3; i++) {
          if (!saveSlots[i]) {
            targetSlot = i;
            break;
          }
        }
        createNewSave(targetSlot, name, true); // 保留进度
      }
      return;
    }
    
    // 正常进入下一天
    hideOverlay();
    setupDay(day + 1);
  });

  // 建设界面事件监听器
  backToGameBtn.addEventListener("click", hideBuildOverlay);
  createNewSaveBtn.addEventListener("click", () => {
    const name = newSaveNameEl.value.trim();
    if (name) {
      // 找一个空槽位
      for (let i = 1; i <= 3; i++) {
        if (!saveSlots[i]) {
          createNewSave(i, name);
          updateBuildUI();
          newSaveNameEl.value = '';
          return;
        }
      }
      alert('没有空槽位了！请先删除一个存档。');
    } else {
      alert('请输入存档名称！');
    }
  });

  // 加点系统事件监听器
  lotteryBtn.addEventListener("click", () => {
    showLotteryOverlay();
  });

  const lotteryOverlay = document.getElementById("lotteryOverlay");
  const lotteryStrip = document.getElementById("lotteryStrip");
  const lotteryResult = document.getElementById("lotteryResult");
  const closeLotteryBtn = document.getElementById("closeLotteryBtn");

  // 奖池配置
  const lotteryPrizes = [
    { type: "boost", name: "全军强化", icon: "⚔️", weight: 25, effect: "attack" },
    { type: "defense", name: "坚实后盾", icon: "🛡️", weight: 25, effect: "defense" },
    { type: "clear", name: "清场法术", icon: "💥", weight: 15, effect: "clear" },
    { type: "thanks", name: "谢谢惠顾", icon: "💰", weight: 35, effect: "refund" }
  ];

  let isRolling = false;

  function showLotteryOverlay() {
    if (gameProgress.coins < 100) {
      showLotteryResult('金币不足！需要100金币才能抽奖。', 'error');
      return;
    }

    // 扣除金币
    gameProgress.coins -= 100;
    updateUpgradePanel();

    // 清空结果
    lotteryResult.textContent = "";
    lotteryResult.className = "lottery-result";

    // 生成奖池条
    generateLotteryStrip();

    // 显示弹窗
    lotteryOverlay.classList.remove("hidden");

    // 开始滚动
    startLotteryRoll();
  }

  function generateLotteryStrip() {
    lotteryStrip.innerHTML = "";
    // 生成大量奖品用于滚动
    for (let i = 0; i < 50; i++) {
      const prize = selectPrize();
      const item = document.createElement("div");
      item.className = `lottery-item ${prize.type}`;
      item.innerHTML = `
        <div class="lottery-item-icon">${prize.icon}</div>
        <div>${prize.name}</div>
      `;
      lotteryStrip.appendChild(item);
    }
  }

  function selectPrize() {
    const totalWeight = lotteryPrizes.reduce((sum, p) => sum + p.weight, 0);
    let random = Math.random() * totalWeight;
    for (const prize of lotteryPrizes) {
      random -= prize.weight;
      if (random <= 0) return prize;
    }
    return lotteryPrizes[0];
  }

  function startLotteryRoll() {
    if (isRolling) return;
    isRolling = true;

    const items = lotteryStrip.children;
    const itemWidth = 110; // 100px width + 10px margin
    const totalWidth = items.length * itemWidth;
    const windowWidth = lotteryStrip.parentElement.offsetWidth;
    const centerOffset = windowWidth / 2 - itemWidth / 2;

    // 随机选择中奖位置（在中间区域）
    const targetIndex = Math.floor(Math.random() * 10) + 20; // 在中间10个奖品中随机
    const targetPosition = targetIndex * itemWidth;

    let currentPosition = 0;
    let velocity = 50; // 初始速度
    let acceleration = 0.98; // 减速系数
    let animationId;

    function animate() {
      velocity *= acceleration;
      currentPosition += velocity;

      // 当速度足够慢且接近目标位置时停止
      if (velocity < 0.5 && Math.abs(currentPosition - targetPosition) < 5) {
        currentPosition = targetPosition;
        lotteryStrip.style.transform = `translateX(-${currentPosition - centerOffset}px)`;
        isRolling = false;
        applyPrize(items[targetIndex]);
        return;
      }

      // 循环滚动
      if (currentPosition >= totalWidth - windowWidth) {
        currentPosition = 0;
      }

      lotteryStrip.style.transform = `translateX(-${currentPosition - centerOffset}px)`;
      animationId = requestAnimationFrame(animate);
    }

    animate();
  }

  function applyPrize(itemElement) {
    const prizeType = itemElement.classList[1]; // 获取第二个class（boost, defense等）
    const prize = lotteryPrizes.find(p => p.type === prizeType);

    let message = "";
    let resultClass = "success";

    switch (prize.effect) {
      case "attack":
        // 全军强化：增加所有已上场卡牌10%攻击力
        roles.forEach(role => {
          if (!role.dead) {
            role.card.damage = (role.card.damage || 1) * 1.1;
          }
        });
        message = "全军强化！所有卡牌攻击力提升10%";
        break;
      case "defense":
        // 坚实后盾：城墙恢复30%生命值
        const maxWallHp = 100;
        const healAmount = Math.floor(maxWallHp * 0.3);
        wall.hp = Math.min(wall.hp + healAmount, maxWallHp);
        message = `坚实后盾！城墙恢复${healAmount}点生命值`;
        break;
      case "clear":
        // 清场法术：消灭所有普通怪物
        let clearedCount = 0;
        monsters = monsters.filter(m => {
          if (m.kind === "elite" || m.kind === "boss" || m.kind === "megaboss") {
            return true; // 保留精英和boss
          }
          clearedCount++;
          return false; // 移除普通怪物
        });
        message = `清场法术！消灭了${clearedCount}只普通怪物`;
        break;
      case "refund":
        // 谢谢惠顾：返还20金币
        gameProgress.coins += 20;
        updateUpgradePanel();
        message = "谢谢惠顾！返还20金币";
        resultClass = "error";
        break;
    }

    lotteryResult.textContent = message;
    lotteryResult.className = `lottery-result ${resultClass}`;
  }

  closeLotteryBtn.addEventListener("click", () => {
    lotteryOverlay.classList.add("hidden");
  });

  // 抽奖功能（保留原函数用于兼容）
  function performLottery() {
    showLotteryOverlay();
  }

  function updateUpgradePanel() {
    totalKillsEl.textContent = gameProgress.totalKills;
    totalCoinsEl.textContent = gameProgress.coins;
    
    // 更新抽奖按钮状态
    lotteryBtn.disabled = gameProgress.coins < 100;
    lotteryBtn.textContent = gameProgress.coins >= 100 ? 
      `抽奖 (100金币)` : `抽奖 (还差${100 - gameProgress.coins}金币)`;
  }

  // 添加键盘快捷键支持
  document.addEventListener("keydown", (e) => {
    if (e.key === "b" || e.key === "B") {
      if (!overlayEl.classList.contains("hidden")) return;
      if (buildOverlayEl.classList.contains("hidden")) {
        showBuildOverlay();
      } else {
        hideBuildOverlay();
      }
    } else if (e.key === " " || e.key === "p" || e.key === "P") {
      // 空格键或P键暂停游戏
      e.preventDefault(); // 防止空格键滚动页面
      if (!overlayEl.classList.contains("hidden")) return; // 有overlay时不暂停
      
      if (gameEnded) return; // 游戏结束时不暂停
      
      if (!pausedOverlay) {
        // 暂停游戏
        pausedOverlay = true;
        showOverlay(
          "游戏暂停",
          "按空格键或P键继续游戏\n\n提示：按B键打开建设界面",
          "继续游戏"
        );
      } else {
        // 继续游戏
        hideOverlay();
        pausedOverlay = false;
      }
    }
  });

  // 初始化游戏 - 最简单直接的方法
  function initGame() {
    // 1. 强制隐藏所有overlay
    overlayEl.classList.add("hidden");
    buildOverlayEl.classList.add("hidden");
    
    // 2. 清空overlay内容
    overlayTitle.textContent = "";
    overlayDesc.textContent = "";
    overlayBtn.textContent = "";
    
    // 3. 重置所有游戏状态
    gameEnded = false;
    pausedOverlay = false;
    day = 1;
    
    // 4. 加载存档（如果有）
    updateSaveSlots();
    loadProgress();
    
    // 5. 设置正确的天数
    const savedDay = gameProgress.currentDay;
    if (savedDay && savedDay > 0) {
      day = savedDay;
    } else {
      day = 1;
      gameProgress.currentDay = 1;
    }
    
    // 6. 初始化游戏
    setupDay(day);
    
    // 7. 更新加点系统显示
    updateUpgradePanel();
  }
  
  // 启动应用 - 检查自动登录
  function startApp() {
    // 检查是否有保存的登录信息
    if (checkAutoLogin()) {
      console.log('自动登录成功');
    } else {
      console.log('显示登录界面');
      showAuthInterface();
    }
  }
  
  // 启动应用
  startApp();

  // --------- Input ----------
  let aiming = {
    active: false,
    start: { x: 0, y: 0 },
    pos: { x: 0, y: 0 },
  };

  function tryConsumeMana(cost) {
    if (mana + 1e-6 < cost) return false;
    mana -= cost;
    return true;
  }

  canvas.addEventListener("pointerdown", (ev) => {
    if (pausedOverlay) return;
    canvas.setPointerCapture(ev.pointerId);
    const p = screenToWorld(ev.clientX, ev.clientY);
    const card = CARDS.find((c) => c.id === selectedCardId);
    if (!card) return;

    if (card.type === "role") {
      if (pointInCircle(p.x, p.y, SLING.x, SLING.y, SLING.r + 26)) {
        aiming.active = true;
        aiming.start = { x: SLING.x, y: SLING.y };
        aiming.pos = { x: p.x, y: p.y };
      } else {
        flashHint("要在弹弓附近开始拖拽发射噢。");
      }
    } else if (card.type === "spell") {
      if (card.target === "instant") {
        if (!tryConsumeMana(card.cost)) return;
        castSpell(card, { x: WORLD.w / 2, y: WORLD.h / 2 });
        selectedCardId = null;
        setHint();
        syncCardStyles();
      } else if (card.target === "arena") {
        if (!inArena(p.x, p.y)) {
          flashHint("这个法术需要点在场地矩形里。");
          return;
        }
        if (!tryConsumeMana(card.cost)) return;
        castSpell(card, p);
        selectedCardId = null;
        setHint();
        syncCardStyles();
      }
    }
  });

  canvas.addEventListener("pointermove", (ev) => {
    if (!aiming.active) return;
    const p = screenToWorld(ev.clientX, ev.clientY);
    aiming.pos = { x: p.x, y: p.y };
  });

  canvas.addEventListener("pointerup", (ev) => {
    if (!aiming.active) return;
    aiming.active = false;
    const card = CARDS.find((c) => c.id === selectedCardId);
    if (!card) return;
    if (!tryConsumeMana(card.cost)) {
      flashHint("法术不够噢～");
      return;
    }
    const pull = { x: aiming.start.x - aiming.pos.x, y: aiming.start.y - aiming.pos.y };
    const n = norm(pull.x, pull.y);
    const power = clamp(n.l, 0, 140);
    const baseSpeed = 6.4 * power + 220;
    const speed = baseSpeed * (card.launchSpeedMul ?? 1.0); // 使用卡牌的发射速度系数
    const vx = n.x * speed;
    const vy = n.y * speed;
    const x = clamp(SLING.x + n.x * 12, ARENA.l + card.radius, ARENA.r - card.radius);
    const y = clamp(SLING.y + n.y * 12, ARENA.t + card.radius, ARENA.b - card.radius);
    roles.push(new Role(card, x, y, vx, vy));
    sparkle(SLING.x, SLING.y, "#cdd6f4", 10);
    soundSystem.play('shoot');
    selectedCardId = null;
    setHint();
    syncCardStyles();
  });

  // --------- Update / Draw ----------
  function update(dt) {
    // mana
    mana = clamp(mana + (manaRegen + bonusManaRegen()) * dt, 0, maxMana);

    // 更新传送门防御冷却
    if (portalDefense.defenseCooldown > 0) {
      portalDefense.defenseCooldown -= dt;
    }

    // spawns
    updateSpawns(dt);

    // roles
    for (const r of roles) r.update(dt);
    roles = roles.filter((r) => !r.dead);

    // monsters
    for (const m of monsters) m.update(dt);

    // shots (projectiles)
    for (const s of shots) {
      s.t += dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      // small trail
      if (Math.random() < 0.35) {
        particles.push({
          x: s.x,
          y: s.y,
          vx: rand(-30, 30),
          vy: rand(-30, 30),
          r: rand(1.5, 3.2),
          t: 0,
          dur: rand(0.18, 0.35),
          color: s.kind === "bubble" ? "rgba(140,220,255,0.85)" : "rgba(255,160,130,0.85)",
        });
      }

      // hit roles
      if (s.target === "role") {
        for (const r of roles) {
          const d = Math.hypot(r.x - s.x, r.y - s.y);
          if (d <= r.r + s.r) {
            r.life -= s.dmgLife;
            if (r.life <= 0) r.dead = true;
            sparkle(r.x, r.y, "#e1f5ff", 8);
            s.dead = true;
            break;
          }
        }
      } else if (s.target === "wall") {
        const wallY = WORLD.h - WALL_H + 10;
        if (s.y >= wallY) {
          wall.hp = Math.max(0, wall.hp - s.dmgWall);
          sparkle(s.x, wallY - 8, "#ffe3e3", 8);
          s.dead = true;
        }
      } else if (s.target === "portal") {
        // 攻击传送门
        const dx = s.x - PORTAL.x;
        const dy = s.y - PORTAL.y;
        const d = Math.hypot(dx, dy);
        if (d <= PORTAL.r + s.r) {
          // 如果游戏已经结束，不再造成伤害
          if (!gameEnded) {
            dealPortal(s.dmgPortal);
            sparkle(PORTAL.x, PORTAL.y + PORTAL.r * 0.15, "#ffd1ef", 10);
          }
          s.dead = true;
        }
      }

      // timeout / out of bounds
      if (s.t > 3.0 || s.x < ARENA.l - 80 || s.x > ARENA.r + 80 || s.y < ARENA.t - 160 || s.y > WORLD.h + 80) {
        s.dead = true;
      }
    }
    shots = shots.filter((s) => !s.dead);

    // collisions role<->role (角色之间碰撞)
    for (let i = 0; i < roles.length; i++) {
      for (let j = i + 1; j < roles.length; j++) {
        resolveRoleRole(roles[i], roles[j]);
      }
    }

    // collisions role<->monster
    for (const r of roles) {
      if (r.stopped && r.stopTimer > 18) continue; // very old role, ignore
      for (const m of monsters) {
        if (m.hp <= 0) continue;
        resolveRoleMonster(r, m);
      }
    }

    // monsters reaching wall (没有怪物会直接撞城墙)
    const wallY = WORLD.h - WALL_H + 18;
    
    monsters = monsters.filter((m) => m.hp > 0);

    // fail
    if (wall.hp <= 0) onGameOver();

    updateEffects(dt);
    updateParticles(dt);
    updateDamageNumbers(dt);
    updateGoldTexts(dt);

    // hint flash decay
    if (hintFlash > 0) {
      hintFlash -= dt;
      if (hintFlash <= 0) setHint();
    }
  }

  function draw() {
    // clear full screen
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, view.w, view.h);

    ctx.save();
    ctx.translate(view.ox, view.oy);
    ctx.scale(view.scale, view.scale);

    drawBackground(ctx);
    drawArena(ctx);
    drawPortal(ctx);
    drawWallAndSlingshot(ctx);

    // effects under entities
    drawEffects(ctx);

    drawShots(ctx);

    for (const m of monsters) m.draw(ctx);
    for (const r of roles) r.draw(ctx);

    drawParticles(ctx);
    drawDamageNumbers(ctx);
    drawGoldTexts(ctx);
    drawAim(ctx);
    drawTopFog(ctx);

    ctx.restore();
  }

  function drawShots(g) {
    for (const s of shots) {
      g.save();
      g.translate(s.x, s.y);
      const a = 1 - clamp(s.t / 1.6, 0, 1) * 0.15;
      g.globalAlpha = a;

      if (s.kind === "bubble") {
        // 蓝色泡泡弹：圆 + 高光
        const grd = g.createRadialGradient(-s.r * 0.35, -s.r * 0.35, 1, 0, 0, s.r);
        grd.addColorStop(0, "rgba(255,255,255,0.95)");
        grd.addColorStop(0.25, "rgba(140,220,255,0.95)");
        grd.addColorStop(1, "rgba(70,160,255,0.85)");
        g.fillStyle = grd;
        g.strokeStyle = "rgba(0,0,0,0.10)";
        g.lineWidth = 2;
        g.beginPath();
        g.arc(0, 0, s.r, 0, Math.PI * 2);
        g.fill();
        g.stroke();
        g.fillStyle = "rgba(255,255,255,0.85)";
        g.beginPath();
        g.arc(-s.r * 0.25, -s.r * 0.25, s.r * 0.32, 0, Math.PI * 2);
        g.fill();
      } else {
        // 红色刺弹：小胶囊 + 两个尖角
        g.fillStyle = "rgba(255,150,130,0.95)";
        g.strokeStyle = "rgba(0,0,0,0.12)";
        g.lineWidth = 2;
        g.beginPath();
        g.roundRect(-s.r * 1.1, -s.r * 0.7, s.r * 2.2, s.r * 1.4, 6);
        g.fill();
        g.stroke();
        g.fillStyle = "rgba(255,90,90,0.85)";
        g.beginPath();
        g.moveTo(-s.r * 1.05, 0);
        g.lineTo(-s.r * 1.55, -s.r * 0.25);
        g.lineTo(-s.r * 1.55, s.r * 0.25);
        g.closePath();
        g.fill();
        g.beginPath();
        g.moveTo(s.r * 1.05, 0);
        g.lineTo(s.r * 1.55, -s.r * 0.25);
        g.lineTo(s.r * 1.55, s.r * 0.25);
        g.closePath();
        g.fill();
      }

      g.restore();
    }
  }

  function drawBackground(g) {
    // Removed candy clouds for dark theme
  }

  function drawArena(g) {
    // outer glow
    g.fillStyle = "rgba(255,120,184,0.08)";
    g.fillRect(ARENA.l - 10, ARENA.t - 10, (ARENA.r - ARENA.l) + 20, (ARENA.b - ARENA.t) + 20);

    // arena base with radial gradient for smoother edge blending
    const centerX = (ARENA.l + ARENA.r) / 2;
    const centerY = (ARENA.t + ARENA.b) / 2;
    const radius = Math.max(ARENA.r - ARENA.l, ARENA.b - ARENA.t) / 2;
    const grd = g.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    grd.addColorStop(0, "rgba(255,255,255,0.75)");
    grd.addColorStop(0.6, "rgba(255,255,255,0.55)");
    grd.addColorStop(1, "rgba(255,255,255,0.35)");
    g.fillStyle = grd;
    g.strokeStyle = "rgba(0,0,0,0.10)";
    g.lineWidth = 4;
    g.beginPath();
    g.roundRect(ARENA.l, ARENA.t, ARENA.r - ARENA.l, ARENA.b - ARENA.t, 22);
    g.fill();
    g.stroke();
  }

  function drawPortal(g) {
    // portal body
    const glow = g.createRadialGradient(PORTAL.x, PORTAL.y, 10, PORTAL.x, PORTAL.y, PORTAL.r * 1.4);
    glow.addColorStop(0, "rgba(255,90,165,0.22)");
    glow.addColorStop(1, "rgba(255,90,165,0)");
    g.fillStyle = glow;
    g.beginPath();
    g.arc(PORTAL.x, PORTAL.y, PORTAL.r * 1.4, 0, Math.PI * 2);
    g.fill();

    const ring = g.createRadialGradient(PORTAL.x - 18, PORTAL.y - 18, 6, PORTAL.x, PORTAL.y, PORTAL.r);
    ring.addColorStop(0, "#cdd6f4");
    ring.addColorStop(0.2, "#ff76b6");
    ring.addColorStop(1, "#b347ff");
    g.fillStyle = ring;
    g.strokeStyle = "rgba(0,0,0,0.12)";
    g.lineWidth = 5;
    g.beginPath();
    g.arc(PORTAL.x, PORTAL.y, PORTAL.r, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    // portal mouth
    g.fillStyle = "rgba(20,10,35,0.75)";
    g.beginPath();
    g.ellipse(PORTAL.x, PORTAL.y + 10, PORTAL.r * 0.55, PORTAL.r * 0.40, 0, 0, Math.PI * 2);
    g.fill();

    // hp bar
    const w = 220;
    const h = 10;
    const p = portal.hp / portal.maxHp;
    g.fillStyle = "rgba(0,0,0,0.14)";
    g.fillRect(PORTAL.x - w / 2, ARENA.t - 24, w, h);
    g.fillStyle = "rgba(255,90,165,0.90)";
    g.fillRect(PORTAL.x - w / 2, ARENA.t - 24, w * p, h);
  }

  function drawWallAndSlingshot(g) {
    const y = WORLD.h - WALL_H;
    // wall
    const grd = g.createLinearGradient(0, y, 0, y + WALL_H);
    grd.addColorStop(0, "rgba(255,220,245,0.92)");
    grd.addColorStop(1, "rgba(255,255,255,0.92)");
    g.fillStyle = grd;
    g.strokeStyle = "rgba(0,0,0,0.10)";
    g.lineWidth = 5;
    g.beginPath();
    g.roundRect(20, y, WORLD.w - 40, WALL_H + 18, 26);
    g.fill();
    g.stroke();

    // wall hp bar
    const w = 250;
    const h = 10;
    const p = wall.hp / wall.maxHp;
    g.fillStyle = "rgba(0,0,0,0.12)";
    g.fillRect(WORLD.w / 2 - w / 2, y + 18, w, h);
    g.fillStyle = "rgba(70,210,130,0.90)";
    g.fillRect(WORLD.w / 2 - w / 2, y + 18, w * p, h);

    // slingshot
    const baseY = SLING.y + 18;
    g.fillStyle = "rgba(0,0,0,0.10)";
    g.beginPath();
    g.ellipse(SLING.x + 5, baseY + 10, 48, 18, 0, 0, Math.PI * 2);
    g.fill();

    g.strokeStyle = "rgba(0,0,0,0.14)";
    g.lineWidth = 6;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(SLING.x - 26, baseY);
    g.quadraticCurveTo(SLING.x - 34, SLING.y - 20, SLING.x - 12, SLING.y - 46);
    g.moveTo(SLING.x + 26, baseY);
    g.quadraticCurveTo(SLING.x + 34, SLING.y - 20, SLING.x + 12, SLING.y - 46);
    g.stroke();

    // sling band
    g.strokeStyle = "rgba(255,90,165,0.45)";
    g.lineWidth = 5;
    g.beginPath();
    g.moveTo(SLING.x - 12, SLING.y - 46);
    g.lineTo(SLING.x + 12, SLING.y - 46);
    g.stroke();

    // interactive ring
    g.strokeStyle = "rgba(255,90,165,0.22)";
    g.lineWidth = 6;
    g.beginPath();
    g.arc(SLING.x, SLING.y, SLING.r, 0, Math.PI * 2);
    g.stroke();
  }

  function drawAim(g) {
    if (!aiming.active) return;
    const card = CARDS.find((c) => c.id === selectedCardId);
    const dx = aiming.pos.x - aiming.start.x;
    const dy = aiming.pos.y - aiming.start.y;
    const pull = clamp(Math.hypot(dx, dy), 0, 140);
    const t = pull / 140;
    const end = { x: aiming.pos.x, y: aiming.pos.y };
    const bandA = { x: SLING.x - 12, y: SLING.y - 46 };
    const bandB = { x: SLING.x + 12, y: SLING.y - 46 };

    g.strokeStyle = `rgba(255,90,165,${0.25 + 0.55 * t})`;
    g.lineWidth = 6;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(bandA.x, bandA.y);
    g.lineTo(end.x, end.y);
    g.lineTo(bandB.x, bandB.y);
    g.stroke();

    // predicted tiny dots - 使用卡牌的物理参数
    const n = norm(aiming.start.x - aiming.pos.x, aiming.start.y - aiming.pos.y);
    const baseSpeed = 6.4 * pull + 220;
    const speed = baseSpeed * (card?.launchSpeedMul ?? 1.0);
    const drag = card?.drag ?? 2.35;
    let x = SLING.x + n.x * 12;
    let y = SLING.y + n.y * 12;
    let vx = n.x * speed;
    let vy = n.y * speed;
    g.fillStyle = "rgba(80,80,90,0.20)";
    for (let i = 0; i < 14; i++) {
      const dt = 0.06;
      const dragFactor = Math.exp(-drag * dt);
      vx *= dragFactor;
      vy *= dragFactor;
      x += vx * dt;
      y += vy * dt;
      // bounce preview
      if (x < ARENA.l + 10 || x > ARENA.r - 10) vx *= -0.84;
      if (y < ARENA.t + 10 || y > ARENA.b - 10) vy *= -0.84;
      g.beginPath();
      g.arc(x, y, 4 - i * 0.12, 0, Math.PI * 2);
      g.fill();
    }
  }

  function drawEffects(g) {
    for (const e of effects) {
      if (e.kind === "ring") {
        const p = clamp(e.t / e.dur, 0, 1);
        const r = e.r0 + (e.r1 - e.r0) * p;
        g.strokeStyle = withAlpha(e.color, 0.55 * (1 - p));
        g.lineWidth = 10 * (1 - p);
        g.beginPath();
        g.arc(e.x, e.y, r, 0, Math.PI * 2);
        g.stroke();
      } else if (e.kind === "pulse") {
        const p = clamp(e.t / e.dur, 0, 1);
        g.strokeStyle = withAlpha(e.color, 0.55 * (1 - p));
        g.lineWidth = 8 * (1 - p);
        g.beginPath();
        g.arc(e.x, e.y, e.r * (0.55 + 0.45 * p), 0, Math.PI * 2);
        g.stroke();
      } else if (e.kind === "line") {
        const p = clamp(e.t / e.dur, 0, 1);
        g.strokeStyle = withAlpha(e.color, 0.85 * (1 - p));
        g.lineWidth = 6;
        g.lineCap = "round";
        g.beginPath();
        g.moveTo(e.x0, e.y0);
        g.lineTo(e.x1, e.y1);
        g.stroke();
      } else if (e.kind === "fieldSlow") {
        const p = clamp(e.t / e.dur, 0, 1);
        const a = 0.38 * (1 - p * 0.25);
        g.fillStyle = withAlpha(e.color, a);
        g.beginPath();
        g.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        g.fill();
        g.strokeStyle = withAlpha("#49f2df", 0.35);
        g.lineWidth = 4;
        g.beginPath();
        g.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        g.stroke();
      } else if (e.kind === "burst") {
        const p = clamp(e.t / e.dur, 0, 1);
        g.fillStyle = withAlpha(e.color, 0.55 * (1 - p));
        g.beginPath();
        g.arc(e.x, e.y, e.radius * p, 0, Math.PI * 2);
        g.fill();
      } else if (e.kind === "text") {
        const p = clamp(e.t / e.dur, 0, 1);
        g.fillStyle = withAlpha(e.color, 1 - p);
        g.font = "900 18px ui-sans-serif, system-ui, sans-serif";
        g.textAlign = "center";
        g.fillText(e.text, e.x, e.y - p * 26);
      } else if (e.kind === "frost") {
        const p = clamp(e.t / e.dur, 0, 1);
        // 绘制冰晶效果
        g.fillStyle = withAlpha(e.color, 0.6 * (1 - p));
        g.beginPath();
        g.arc(e.x, e.y, 15 * (1 + p), 0, Math.PI * 2);
        g.fill();
        
        // 绘制冰晶碎片
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI * 2 / 6) * i;
          const dist = 10 + p * 8;
          const x = e.x + Math.cos(angle) * dist;
          const y = e.y + Math.sin(angle) * dist;
          
          g.fillStyle = withAlpha("#b8f2ff", 0.8 * (1 - p));
          g.beginPath();
          g.arc(x, y, 3 * (1 - p * 0.5), 0, Math.PI * 2);
          g.fill();
        }
      }
    }
  }

  function drawTopFog(g) {
    // slight vignette
    const grd = g.createRadialGradient(WORLD.w / 2, WORLD.h / 2, 200, WORLD.w / 2, WORLD.h / 2, 900);
    grd.addColorStop(0, "rgba(255,255,255,0)");
    grd.addColorStop(1, "rgba(255,90,165,0.08)");
    g.fillStyle = grd;
    g.fillRect(0, 0, WORLD.w, WORLD.h);
  }

  function updateHud() {
    hudDay.textContent = `Day ${day}`;
    hudMana.textContent = `Mana ${Math.floor(mana * 10) / 10}/${maxMana}`;
    hudPortal.textContent = `Portal ${Math.ceil(portal.hp)}/${portal.maxHp}`;
    hudWall.textContent = `Wall ${Math.ceil(wall.hp)}/${wall.maxHp}`;
    syncCardStyles();
  }

  function loop(ts) {
    try {
      requestAnimationFrame(loop);
      const t = ts / 1000;
      const dt = clamp(t - lastTs, 0, 1 / 20);
      lastTs = t;
      now = t;
      if (!pausedOverlay) update(dt);
      draw();
      updateHud();
    } catch (error) {
      console.error("Game loop error:", error);
      // 防止无限循环，暂停游戏
      pausedOverlay = true;
      console.log("Game paused due to error");
    }
  }

  // ---- Startup ----
  window.addEventListener("resize", resize);
  resize();

  // polyfill for roundRect in older browsers
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
      const rr = Array.isArray(r) ? r : [r, r, r, r];
      const [r1, r2, r3, r4] = rr.map((v) => Math.min(v, Math.min(w, h) / 2));
      this.moveTo(x + r1, y);
      this.arcTo(x + w, y, x + w, y + h, r2);
      this.arcTo(x + w, y + h, x, y + h, r3);
      this.arcTo(x, y + h, x, y, r4);
      this.arcTo(x, y, x + w, y, r1);
      this.closePath();
      return this;
    };
  }

  requestAnimationFrame(loop);
})();

