/**
 * 用户认证系统模块
 * 处理用户注册、登录、登出等功能
 */

const USER_DB_KEY = 'slingshot_users';
const USER_PREFIX = 'user_';

let currentUser = null;
let isAuthenticated = false;

// DOM元素引用（需要在初始化时设置）
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

// 游戏进度引用（需要在初始化时设置）
let gameProgress = null;

// 初始化游戏回调
let initGameCallback = null;

export function initAuthSystem(elements, gameProgressRef, initGameFn) {
  authContainerEl = elements.authContainer;
  gameContainerEl = elements.gameContainer;
  loginFormEl = elements.loginForm;
  registerFormEl = elements.registerForm;
  loginEmailEl = elements.loginEmail;
  loginPasswordEl = elements.loginPassword;
  registerUsernameEl = elements.registerUsername;
  registerEmailEl = elements.registerEmail;
  registerPasswordEl = elements.registerPassword;
  confirmPasswordEl = elements.confirmPassword;
  currentUserNameEl = elements.currentUserName;
  currentUserEmailEl = elements.currentUserEmail;
  gameProgress = gameProgressRef;
  initGameCallback = initGameFn;
}

export function getCurrentUser() {
  return currentUser;
}

export function isUserAuthenticated() {
  return isAuthenticated;
}

export function getGameProgress() {
  return gameProgress;
}

export function setGameProgress(progress) {
  gameProgress = progress;
}

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
export function register(username, email, password) {
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
      cardCollection: {},
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
export function login(email, password) {
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
export function logout() {
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
  if (initGameCallback) {
    initGameCallback();
  }
}

// 检查自动登录
export function checkAutoLogin() {
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
export function saveLastLogin(email) {
  localStorage.setItem('slingshot_last_login', email);
}
