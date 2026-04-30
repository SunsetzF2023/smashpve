# Smash Defender

A tower defense strategy game built with HTML5 Canvas. Defend the portal by launching card units and defeat the monster army.

## 🎮 Game Features

- **Card System**: 11 role cards + 4 spell cards
- **User System**: Registration, login, cloud save, cross-device sync
- **Gacha System**: Collect rare cards, permanent collection
- **Upgrade System**: Unlock abilities through cumulative kills
- **Particle Effects**: Rich visual feedback and damage numbers
- **Sound System**: Dynamically generated game sound effects

## 🚀 Quick Start

### Play Online

Visit the GitHub Pages deployment URL (after configuration)

### Local Development

1. Clone the repository
```bash
git clone https://github.com/SunsetzF2023/smashpve.git
cd smashpve
```

2. Run with any static server
```bash
# Using Python
python -m http.server 8000

# Using Node.js (requires http-server)
npx http-server

# Or open index.html directly in browser
```

## 🎴 Card Introduction

### Role Cards

| Card | Cost | Description |
|------|------|-------------|
| Cotton Knight | 2 | Shockwave on stop, knocks back nearby monsters |
| Frost Archer | 3 | Frost arrows on stop, slows enemies and deals DoT |
| Jelly Mage | 4 | Magic beam on stop, also burns the portal |
| Soft Shield | 3 | Heavier and larger, higher collision damage, explodes on death |
| Hellfire Mage | 5 | Burning attack, continuous beam, high-frequency damage numbers |
| Healing Angel | 4 | Heals nearby allies on stop, attacks enemies if no allies |
| Bomber | 3 | Auto-seeks enemies, explodes for high AoE damage |
| Crazy Joker | 3 | Chaos impact, makes enemies attack indiscriminately |
| Thor's Hammer | 5 | Chain lightning, can damage multiple nearby enemies |
| Shadow Ninja | 3 | Teleport strike, fast teleport to attack multiple targets |
| Mech Guard | 4 | Laser turret, continuously scans and attacks in a line |

### Spell Cards

| Card | Cost | Description |
|------|------|-------------|
| Frost Field | 4 | Place on arena: slows monsters in range for a duration |
| Sweet Fireball | 3 | Click arena location: explosion damage and knockback |
| Wall Repair | 2 | Instantly restore wall HP (limited to 3 uses per game) |
| Small Charge | 1 | Instantly gain mana and slightly increase regeneration rate |

## 🛠️ Tech Stack

- **HTML5 Canvas** - Game rendering
- **JavaScript (ES6)** - Game logic
- **CSS3** - UI styling
- **Web Audio API** - Sound system
- **LocalStorage** - Data persistence

## 📁 Project Structure

```
smashpve/
├── index.html          # Main page
├── style.css           # Stylesheet
├── game.js             # Core game logic
├── js/                 # Modular code (for development)
│   ├── config/         # Configuration modules
│   ├── core/           # Core modules
│   ├── systems/        # System modules
│   ├── effects/        # Visual effects
│   └── entities/       # Entity classes
└── README.md           # Documentation
```

## 🎯 Gameplay

1. **Select Card**: Choose a role card from the bottom card bar
2. **Drag & Launch**: Drag on the slingshot and release to launch the card
3. **Defend Portal**: Prevent monsters from reaching the portal
4. **Use Spells**: Strategically use spell cards to assist in battle
5. **Upgrade**: Earn coins by killing monsters to draw new cards

## 💾 Save System

- **Cloud Save**: Logged-in user data automatically saved to cloud
- **Local Save**: Non-logged-in users use local save
- **Multiple Save Slots**: Supports 3 save slots
- **Cross-Device Sync**: Continue game on different devices after login

## 🔧 Development Notes

The game has been refactored with modular structure. Core logic is in `game.js`, while modular code in `js/` directory is for reference.

### Modular Structure

- `config/` - Game configuration, card data
- `core/` - Utility functions, game state, game loop
- `systems/` - Sound, authentication, save, spawn systems
- `effects/` - Damage numbers, particle effects
- `entities/` - Role and monster entity classes

## 📝 License

This project is for learning and personal use only.

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📧 Contact

- GitHub: [@SunsetzF2023](https://github.com/SunsetzF2023)

---

**Enjoy the game! Defend the portal, defeat the monster army!** 🏹⚔️
