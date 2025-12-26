# 🚀 Chakra UI React TypeScript Template

A modern, production-ready React application template with the best tools and practices.

## ⚡ Tech Stack

### Core
- **[React 19](https://react.dev/)** - Latest React LTS with improved performance
- **[TypeScript 5.6](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Vite 6](https://vitejs.dev/)** - Lightning-fast build tool
- **[Chakra UI v3](https://chakra-ui.com/)** - Modern component library

### State & Data
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management (1KB)
- **[TanStack Query](https://tanstack.com/query/latest)** - Powerful data fetching & caching

### Development
- **[Vitest](https://vitest.dev/)** - Fast unit testing
- **[Testing Library](https://testing-library.com/)** - User-centric testing
- **[ESLint](https://eslint.org/)** - Code quality
- **[pnpm](https://pnpm.io/)** - Fast, disk-efficient package manager

## 📦 Quick Start

### Prerequisites
- Node.js 18+ (v22.18.0 recommended)
- pnpm 8+ (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd chakra-ui-react-js-template

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173)

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start dev server with HMR
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint

# Testing
pnpm test             # Run tests
pnpm test:ui          # Run tests with UI
pnpm test:coverage    # Generate coverage report
```

## 📁 Project Structure

```
src/
├── api/              # API layer & React Query hooks
├── assets/           # Static files (images, icons)
├── components/       # React components
│   ├── common/      # Reusable UI components
│   ├── features/    # Feature-specific components
│   └── layout/      # Layout components
├── config/           # App configuration & constants
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # Third-party library configs
├── pages/            # Page components
├── services/         # API services & business logic
├── store/            # Zustand state management
├── styles/           # Global styles
├── theme/            # Chakra UI theme customization
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── __tests__/        # Test files
```

See [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) for detailed explanation.

## 🎯 Features

### ✅ Production-Ready Setup
- TypeScript for type safety
- ESLint for code quality
- Path aliases (@/...) for clean imports
- Environment variable support
- Comprehensive testing setup

### ✅ State Management (Zustand)
- Simple, lightweight (1KB)
- No boilerplate
- Persistence support
- DevTools integration

Example:
```typescript
import { useAuthStore } from '@/store';

function Profile() {
  const { user, logout } = useAuthStore();
  return <div>{user.name}</div>;
}
```

### ✅ Data Fetching (React Query)
- Automatic caching
- Background refetching
- Optimistic updates
- Loading & error states

Example:
```typescript
import { useUsers } from '@/api/queries';

function UserList() {
  const { data, isLoading } = useUsers();
  if (isLoading) return <Spinner />;
  return <div>{data.map(user => ...)}</div>;
}
```

### ✅ Testing Infrastructure
- Fast tests with Vitest
- Component testing with Testing Library
- Coverage reporting
- UI mode for debugging

Example:
```typescript
it('renders user name', () => {
  render(<Profile user={mockUser} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### ✅ Chakra UI Components
- Accessible by default
- Dark mode ready
- Customizable theme
- Responsive utilities

Example:
```typescript
<Button colorPalette="blue" size="lg">
  Click Me
</Button>
```

## 📖 Documentation

- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed setup & usage examples
- **[Folder Structure](./FOLDER_STRUCTURE.md)** - Project organization guide
- **[Production Structure](./PRODUCTION_FOLDER_STRUCTURE.md)** - Scaling guide

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run with UI for debugging
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

Example test files:
- `src/__tests__/components/Button.test.tsx`
- `src/__tests__/hooks/useLocalStorage.test.ts`
- `src/__tests__/store/useAuthStore.test.ts`

## 🎨 Customization

### Theme

Customize Chakra UI theme in `src/theme/index.ts`:

```typescript
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: { /* your colors */ },
      },
    },
  },
});
```

### Environment Variables

Create `.env` files:

```bash
# .env.local
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=My App
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## 🚀 Deployment

### Build

```bash
pnpm build
```

Output will be in `dist/` directory.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## 🤝 Best Practices

### Component Structure
```typescript
// ComponentName/
// ├── ComponentName.tsx
// ├── ComponentName.test.tsx
// └── index.ts

export { ComponentName } from './ComponentName';
```

### Import Organization
```typescript
// 1. React & third-party
import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';

// 2. Internal imports
import { useAuth } from '@/hooks';
import type { User } from '@/types';

// 3. Relative imports
import { Header } from './Header';
```

### Type Safety
```typescript
// Define types for props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  // ...
};
```

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Chakra UI Components](https://chakra-ui.com/docs/components)
- [Zustand Guide](https://zustand-demo.pmnd.rs/)
- [TanStack Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [Vitest Guide](https://vitest.dev/guide/)

## 🐛 Known Issues

None currently! Report issues on GitHub.

## 📝 License

MIT License - feel free to use this template for any project!

## 🎉 What's Next?

Your app is production-ready! Here's what you can add:

1. **Router** - Add [React Router](https://reactrouter.com/) for navigation
2. **Forms** - Add [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
3. **i18n** - Add [i18next](https://www.i18next.com/) for internationalization
4. **Analytics** - Add [Mixpanel](https://mixpanel.com/) or [Google Analytics](https://analytics.google.com/)
5. **Error Tracking** - Add [Sentry](https://sentry.io/)
6. **CI/CD** - Set up GitHub Actions or GitLab CI

---

**Built with ❤️ for modern React development**

⭐ Star this repo if you find it useful!
