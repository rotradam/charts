# Cryptocurrency Analysis Dashboard - Development Guidelines

## Project Overview
A Next.js-based cryptocurrency analysis dashboard with advanced charting capabilities, technical indicators, and quantitative analysis tools.

## Tech Stack & Architecture

### Frontend Core
- **Next.js 14+** with App Router
- **TypeScript** (strict mode enabled)
- **TailwindCSS** for styling
- **Lightweight Charts** for technical analysis visualization
- **React Query** for data fetching and caching
- **Zustand** for state management
- **Zod** for runtime type validation
- **Decimal.js** for precise financial calculations

### Backend Services
- Next.js API routes for basic operations
- Python FastAPI service for complex analysis
- WebSocket integration for real-time data

### Data Sources
- Binance API (via ccxt)
- CoinGecko API
- Custom Python analysis service

## Project Structure
```
src/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   │   ├── market/         # Market data endpoints
│   │   └── analysis/       # Analysis endpoints
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   ├── charts/             # Chart-related components
│   └── analysis/           # Analysis-specific components
├── lib/                     # Core business logic
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── indicators/         # Technical indicators
│   └── websocket/          # WebSocket handlers
├── services/               # External service integrations
│   ├── websocket/         # WebSocket service
│   └── analysis/          # Analysis service
├── types/                  # TypeScript type definitions
│   ├── market.d.ts        # Market-related types
│   └── next.d.ts          # Next.js types
└── python/                 # Python analysis service
    ├── analysis/          # Analysis modules
    └── indicators/        # Technical indicators
```

## Development Standards

### 1. TypeScript Guidelines
- Enable strict mode in tsconfig.json
- Use explicit typing over implicit
- Utilize type inference where appropriate
- Define interfaces for all data structures
- Use Zod schemas for runtime validation

Example:
```typescript
// Good
interface MarketData {
  price: string;
  volume: string;
}

// Bad
type MarketData = any;
```

### 2. Component Structure
- Use functional components
- Implement proper error boundaries
- Follow single responsibility principle
- Use composition over inheritance

Example:
```typescript
// components/charts/PriceChart.tsx
export const PriceChart = ({ 
  data, 
  indicators 
}: PriceChartProps): JSX.Element => {
  // Implementation
};
```

### 3. State Management
- Use Zustand for global state
- React Query for server state
- Local state for component-specific data
- Implement proper loading states

### 4. API Integration
- Use React Query for data fetching
- Implement proper error handling
- Use TypeScript types for responses
- Handle rate limiting appropriately

### 5. Styling Guidelines
- Use TailwindCSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use CSS variables for theming

### 6. Performance Considerations
- Implement proper memoization
- Use virtualization for large datasets
- Optimize WebSocket connections
- Lazy load components when possible

### 7. Error Handling
```typescript
try {
  // Operation
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API errors
  } else {
    // Handle other errors
  }
}
```

### 8. Testing Strategy
- Jest for unit testing
- React Testing Library for component tests
- Cypress for E2E testing
- Python unittest for analysis service

## Code Style

### Naming Conventions
- Components: PascalCase (e.g., PriceChart)
- Functions: camelCase (e.g., calculateRSI)
- Files: kebab-case (e.g., price-chart.tsx)
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase

### File Organization
- One component per file
- Group related utilities
- Separate business logic from UI
- Keep files under 200 lines

### Import Order
1. External dependencies
2. Internal modules
3. Type imports
4. Style imports

```typescript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { PriceChart } from '@components/charts';
import { useMarketData } from '@hooks/market';

import type { MarketData } from '@types/market';
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start development server:
```bash
npm run dev
```

## Deployment Guidelines
- Use environment variables for configuration
- Implement proper error logging
- Set up monitoring
- Configure proper CORS headers

## Best Practices Checklist
- [ ] TypeScript strict mode enabled
- [ ] Proper error handling implemented
- [ ] Tests written for new features
- [ ] Performance optimizations applied
- [ ] Proper documentation added
- [ ] Code reviewed by peers
- [ ] Accessibility considerations
- [ ] Mobile responsiveness verified

## Common Pitfalls to Avoid
1. Using `any` type
2. Skipping error handling
3. Direct DOM manipulation
4. Unnecessary re-renders
5. Memory leaks in WebSocket connections
6. Unhandled API errors
7. Missing loading states
8. Improper number handling in calculations

## Additional Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Query Documentation](https://tanstack.com/query/latest/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
