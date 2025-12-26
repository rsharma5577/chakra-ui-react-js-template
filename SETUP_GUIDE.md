# 🚀 Production Setup Guide

Your app now includes all the essential tools for production-level development!

## 📦 What's Installed

### 1. **Zustand** - State Management
Lightweight, modern state management without boilerplate.

**Why Zustand?**
- ✅ 1KB size (vs Redux 15KB)
- ✅ No providers needed
- ✅ Simple API
- ✅ TypeScript-first
- ✅ DevTools support

**Location:** `src/store/`

### 2. **TanStack Query (React Query)** - Data Fetching
The best data-fetching and caching library for React.

**Why React Query?**
- ✅ Automatic caching
- ✅ Background updates
- ✅ Optimistic updates
- ✅ Built-in loading/error states
- ✅ Powerful DevTools

**Location:** `src/api/queries/`, `src/lib/react-query.ts`

### 3. **Vitest + Testing Library** - Testing
Modern, fast testing framework built on Vite.

**Why Vitest?**
- ✅ 10x faster than Jest
- ✅ Same API as Jest
- ✅ Native ESM support
- ✅ Component snapshots
- ✅ UI mode for debugging

**Location:** `src/__tests__/`, `vitest.config.ts`

---

## 🎯 Quick Start

### Running Your App

```bash
# Development with hot reload
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

### Running Tests

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test -- --watch

# Run tests with UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

---

## 📚 Usage Examples

### 1. Zustand State Management

#### Create a Store

```typescript
// src/store/useCartStore.ts
import { create } from 'zustand';

interface CartState {
  items: string[];
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item] })),
  
  removeItem: (item) =>
    set((state) => ({
      items: state.items.filter((i) => i !== item),
    })),
  
  clearCart: () => set({ items: [] }),
}));
```

#### Use the Store

```typescript
import { useCartStore } from '@/store/useCartStore';

function Cart() {
  const { items, addItem, removeItem } = useCartStore();
  
  return (
    <div>
      {items.map((item) => (
        <div key={item}>
          {item}
          <button onClick={() => removeItem(item)}>Remove</button>
        </div>
      ))}
      <button onClick={() => addItem('New Item')}>Add</button>
    </div>
  );
}
```

#### Persist State

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'settings-storage', // localStorage key
    }
  )
);
```

---

### 2. React Query Data Fetching

#### Create Query Hooks

```typescript
// src/api/queries/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await apiService.get('/products');
      return response.data;
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product) => {
      const response = await apiService.post('/products', product);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
```

#### Use Query Hooks

```typescript
import { useProducts, useCreateProduct } from '@/api/queries/useProducts';

function ProductList() {
  const { data, isLoading, error } = useProducts();
  const createProduct = useCreateProduct();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
      
      <button
        onClick={() => createProduct.mutate({ name: 'New Product' })}
        disabled={createProduct.isPending}
      >
        Add Product
      </button>
    </div>
  );
}
```

#### React Query DevTools

DevTools are already configured! Look for the floating icon in the bottom-right corner when running `pnpm dev`.

---

### 3. Testing with Vitest

#### Test a Component

```typescript
// src/__tests__/components/Card.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { Card } from '@/components/common/Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card>Hello World</Card>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    render(<Card className="custom">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('custom');
  });
});
```

#### Test a Hook

```typescript
// src/__tests__/hooks/useCounter.test.ts
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '@/hooks/useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });
  
  it('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

#### Test a Zustand Store

```typescript
// src/__tests__/store/useCartStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCartStore } from '@/store/useCartStore';

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });
  
  it('adds items to cart', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem('Product 1');
    });
    
    expect(result.current.items).toContain('Product 1');
  });
});
```

---

## 🏗️ File Structure

```
src/
├── api/
│   └── queries/           # React Query hooks
│       ├── useUsers.ts
│       └── index.ts
│
├── store/                 # Zustand stores
│   ├── useAuthStore.ts
│   ├── useUIStore.ts
│   └── index.ts
│
├── lib/                   # Library configurations
│   └── react-query.ts     # React Query client config
│
└── __tests__/             # Test files
    ├── components/
    ├── hooks/
    ├── store/
    ├── utils/
    │   └── test-utils.tsx  # Custom render with providers
    └── setup.ts            # Test setup
```

---

## 🎨 Best Practices

### Zustand

1. **One store per domain**
   ```typescript
   useAuthStore    // Authentication
   useCartStore    // Shopping cart
   useUIStore      // UI state
   ```

2. **Use selectors for performance**
   ```typescript
   // ❌ Bad - re-renders on any state change
   const store = useAuthStore();
   
   // ✅ Good - only re-renders when user changes
   const user = useAuthStore((state) => state.user);
   ```

3. **Keep stores flat**
   ```typescript
   // ✅ Good
   { user: {...}, token: '...', isLoading: false }
   
   // ❌ Avoid deep nesting
   { auth: { user: {...}, meta: { status: {...} } } }
   ```

### React Query

1. **Use query keys consistently**
   ```typescript
   export const productKeys = {
     all: ['products'] as const,
     lists: () => [...productKeys.all, 'list'] as const,
     detail: (id) => [...productKeys.all, 'detail', id] as const,
   };
   ```

2. **Handle loading and error states**
   ```typescript
   const { data, isLoading, error } = useProducts();
   
   if (isLoading) return <Spinner />;
   if (error) return <ErrorMessage error={error} />;
   return <ProductList products={data} />;
   ```

3. **Use mutations for updates**
   ```typescript
   const mutation = useCreateProduct();
   
   mutation.mutate(newProduct, {
     onSuccess: () => toast.success('Created!'),
     onError: (error) => toast.error(error.message),
   });
   ```

### Testing

1. **Test user behavior, not implementation**
   ```typescript
   // ✅ Good
   const button = screen.getByRole('button', { name: /submit/i });
   await user.click(button);
   
   // ❌ Bad
   expect(component.state.submitted).toBe(true);
   ```

2. **Use Testing Library queries**
   ```typescript
   // Prefer (in order):
   getByRole
   getByLabelText
   getByPlaceholderText
   getByText
   getByTestId (last resort)
   ```

3. **Mock external dependencies**
   ```typescript
   vi.mock('@/services/api', () => ({
     apiService: {
       get: vi.fn(() => Promise.resolve({ data: [] })),
     },
   }));
   ```

---

## 🚀 Next Steps

### 1. Add More Stores

Create stores for your specific needs:
- Shopping cart
- User preferences
- Form state
- Notification system

### 2. Create API Queries

Add query hooks for your backend:
- User management
- Product catalog
- Order processing
- Analytics

### 3. Write Tests

Aim for good coverage:
- Critical user flows
- Complex business logic
- Edge cases
- Error scenarios

### 4. Configure CI/CD

Add to your pipeline:
```yaml
# .github/workflows/test.yml
- run: pnpm install
- run: pnpm test
- run: pnpm build
```

---

## 📖 Resources

### Zustand
- [Documentation](https://zustand-demo.pmnd.rs/)
- [TypeScript Guide](https://github.com/pmndrs/zustand#typescript)

### React Query
- [Documentation](https://tanstack.com/query/latest)
- [Best Practices](https://tkdodo.eu/blog/practical-react-query)

### Vitest
- [Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 🎉 You're Ready!

Your app now has:
- ✅ **State Management** (Zustand)
- ✅ **Data Fetching** (React Query)
- ✅ **Testing** (Vitest + Testing Library)
- ✅ **Production Structure**
- ✅ **Best Practices**

Start building amazing features! 🚀



