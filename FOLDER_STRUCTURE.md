# 📁 Folder Structure Guide

This document explains the folder structure of this React + TypeScript + Chakra UI application.

## 🌳 Complete Structure

```
chakra-ui-react-js-template/
├── public/                      # Static assets served as-is
│   └── vite.svg
│
├── src/
│   ├── assets/                  # Application assets
│   │   ├── images/             # Image files (PNG, JPG, SVG)
│   │   │   └── react.svg
│   │   └── icons/              # Icon files
│   │
│   ├── components/             # React components
│   │   ├── common/            # Reusable common components
│   │   │   └── Button/
│   │   │       ├── Button.tsx
│   │   │       └── index.ts
│   │   │
│   │   ├── features/          # Feature-specific components
│   │   │   └── .gitkeep
│   │   │
│   │   └── layout/            # Layout components
│   │       ├── Header/
│   │       │   ├── Header.tsx
│   │       │   └── index.ts
│   │       ├── Footer/
│   │       │   ├── Footer.tsx
│   │       │   └── index.ts
│   │       └── MainLayout/
│   │           ├── MainLayout.tsx
│   │           └── index.ts
│   │
│   ├── config/                # Application configuration
│   │   └── constants.ts       # Constants and environment configs
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   │
│   ├── pages/                 # Page components (route level)
│   │   ├── Home.tsx
│   │   └── index.ts
│   │
│   ├── services/              # API and external services
│   │   └── api.ts
│   │
│   ├── theme/                 # Chakra UI theme customization
│   │   └── index.ts
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── utils/                 # Utility functions
│   │   └── helpers.ts
│   │
│   ├── App.tsx               # Root application component
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite type definitions
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 📂 Folder Descriptions

### `/src/assets`
Store static assets like images, icons, fonts, and other media files.
- **images/**: Photos, illustrations, logos
- **icons/**: Icon files (SVG preferred)

### `/src/components`
React components organized by purpose:

#### `common/`
Reusable UI components used across the application:
- Buttons, Inputs, Cards, Modals, etc.
- Each component in its own folder with index.ts for clean imports
- Example: `@/components/common/Button`

#### `features/`
Feature-specific components:
- UserProfile, ProductCard, OrderList, etc.
- Components tied to specific business logic
- Example: `@/components/features/UserDashboard`

#### `layout/`
Layout and structural components:
- Header, Footer, Sidebar, MainLayout
- Components that define page structure
- Example: `@/components/layout/Header`

### `/src/config`
Configuration files and constants:
- API endpoints
- Environment variables
- App-wide constants
- Route definitions

### `/src/hooks`
Custom React hooks:
- Reusable stateful logic
- Data fetching hooks
- UI interaction hooks
- Example: `useLocalStorage`, `useAuth`, `useDebounce`

### `/src/pages`
Page-level components (one per route):
- Home.tsx, About.tsx, Dashboard.tsx
- Compose smaller components into full pages
- Used with React Router or similar

### `/src/services`
External service integrations:
- API calls
- Authentication services
- Third-party integrations
- WebSocket connections

### `/src/theme`
Chakra UI theme customization:
- Custom colors
- Typography settings
- Component style overrides
- Global styles

### `/src/types`
TypeScript type definitions:
- Interface definitions
- Type aliases
- API response types
- Shared types across the app

### `/src/utils`
Utility functions:
- Helper functions
- Formatters
- Validators
- Pure functions without side effects

## 🎯 Best Practices

### Component Organization
Each component folder should contain:
```
ComponentName/
├── ComponentName.tsx    # Component logic
├── index.ts            # Export for clean imports
└── ComponentName.test.tsx  # Tests (optional)
```

### Import Aliases
Use path aliases for cleaner imports:
```typescript
// ✅ Good
import { Button } from "@/components/common/Button";
import { apiService } from "@/services/api";
import type { User } from "@/types";

// ❌ Avoid
import { Button } from "../../components/common/Button";
```

### File Naming
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `User.ts` or in `index.ts`)
- **Constants**: UPPER_SNAKE_CASE for values

### Export Patterns
```typescript
// index.ts - barrel exports
export { Button } from "./Button";
export { Input } from "./Input";
export { Card } from "./Card";
```

## 🚀 Adding New Features

### 1. New Page
```bash
# Create page file
src/pages/NewPage.tsx

# Export from index
src/pages/index.ts
```

### 2. New Component
```bash
# Create component folder
src/components/common/NewComponent/
  ├── NewComponent.tsx
  └── index.ts
```

### 3. New Hook
```bash
# Create hook file
src/hooks/useNewHook.ts

# Export from index
src/hooks/index.ts
```

### 4. New API Service
```bash
# Add service methods in
src/services/api.ts

# Or create feature-specific service
src/services/userService.ts
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Chakra UI Components](https://chakra-ui.com/docs/components)
- [Vite Guide](https://vitejs.dev/guide/)

## 🤝 Contributing

When adding new code:
1. Follow the existing folder structure
2. Use TypeScript for type safety
3. Create reusable components
4. Document complex logic
5. Keep components small and focused

