# Parental Control App

A React Native + Expo parental control app with a Lasso-inspired design system. Monitor children's screen time, set rules, and stay informed with real-time alerts.

## Screenshots

| Welcome | Dashboard | Child Detail |
|---------|-----------|--------------|
| Purple gradient hero screen | Children overview with usage bars | Weekly chart, top apps, actions |

| Rules | Notifications | Profile |
|-------|---------------|---------|
| Per-child toggles + presets | Approve/deny requests | Settings + account info |

## Features

- **Welcome Screen** — Purple gradient with feature pills and Get Started CTA
- **Dashboard** — Child cards with live usage bars, quick stats header, notification badge
- **Child Detail** — Screen time progress, weekly bar chart, top apps breakdown, Lock Now / +30 min actions
- **Rules** — Per-child rule toggles (daily limit, bedtime, app blocks), content safety, quick presets
- **Notifications** — Approve/deny time extension requests, mark all read
- **Profile** — Parent account, preferences, support links

## Design System

Lasso-inspired color palette:

| Token | Value | Use |
|-------|-------|-----|
| `primary` | `#5B4BA0` | Deep Purple — buttons, headers, accents |
| `primaryDark` | `#432F7C` | Gradient end color |
| `secondary` | `#A8E6CF` | Mint Green — on-track indicator |
| `accent1` | `#FFD166` | Yellow — highlights |
| `accent2` | `#FF9AA2` | Coral Pink — alerts, badges |
| `background` | `#F8F9FA` | App background |

## Tech Stack

- **React Native** 0.81.5
- **Expo** SDK 54
- **React Navigation** v7 (bottom tabs + native stack)
- **expo-linear-gradient** — gradient backgrounds and progress bars
- **@expo/vector-icons** — MaterialCommunityIcons
- **react-native-safe-area-context** — safe area handling
- **Jest** — unit tests

## Project Structure

```
parental-control-app-REACT2/
├── App.js                          # Root component (Welcome → Tab nav)
├── app.json                        # Expo config
├── babel.config.js                 # Babel (Expo preset / Node for Jest)
├── index.js                        # Expo entry point
├── assets/                         # Icons and splash screen
├── src/
│   ├── theme/
│   │   └── colors.js               # Color palette, spacing, typography, borderRadius
│   ├── components/
│   │   ├── Card.js                 # White rounded shadow card
│   │   ├── Button.js               # Primary + outline button variants
│   │   └── ErrorBoundary.js        # Class-based error fallback UI
│   ├── navigation/
│   │   └── TabNavigator.js         # Bottom tabs + Home stack navigator
│   ├── screens/
│   │   ├── WelcomeScreen.js        # Splash / onboarding screen
│   │   ├── DashboardScreen.js      # Parent home dashboard
│   │   ├── ChildDetailScreen.js    # Per-child detail view
│   │   ├── NotificationsScreen.js  # Alerts and requests
│   │   ├── RulesScreen.js          # Screen time rules
│   │   └── ProfileScreen.js        # Parent profile and settings
│   └── services/
│       └── demoData.js             # Demo children, notifications, helper functions
└── tests/
    ├── demoData.test.js            # 35 tests — helpers and data shape
    └── colors.test.js              # 12 tests — theme tokens
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI — `npm install -g expo-cli`
- Expo Go app on your iOS or Android device

### Install

```bash
git clone https://github.com/fonsconsulting/parental-control-app-REACT2.git
cd parental-control-app-REACT2
npm install
```

### Run

```bash
npx expo start
```

Scan the QR code with Expo Go to launch on your device.

```bash
# Android emulator
npx expo start --android

# iOS simulator
npx expo start --ios

# Web browser
npx expo start --web
```

### Test

```bash
npm test
# 47 tests, 2 suites
```

## Notes

- `newArchEnabled: false` in `app.json` — React Navigation 7 is not yet fully compatible with the React Native New Architecture's JSI strict type checking
- No authentication required — runs fully on demo data
- No `.env` or secrets needed

## License

MIT
