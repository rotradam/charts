# Cryptocurrency Analysis Dashboard - Development Guidelines

## Project Overview
A Next.js-based cryptocurrency analysis dashboard with advanced charting capabilities, technical indicators, and quantitative analysis tools.

## Tech Stack
- Frontend:
  - Next.js 14+ with App Router
  - TypeScript
  - TailwindCSS for styling
  - TradingView or Lightweight Charts for technical analysis
  - React Query for data fetching and caching
  - Zustand for state management

- Backend/API:
  - Next.js API routes
  - Python FastAPI for data analysis (separate service)
  - WebSocket integration for real-time data

- Data Sources:
  - Binance API
  - CoinGecko API
  - Custom Python analysis service

## Project Structure 

```
/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── (routes)/
│ ├── dashboard/
│ ├── analysis/
│ └── settings/
├── components/
│ ├── ui/
│ ├── charts/
│ └── analysis/
├── lib/
│ ├── api/
│ ├── hooks/
│ └── utils/
├── types/
├── services/
│ ├── websocket/
│ └── analysis/
└── python/
├── analysis/
└── indicators/
```


## Development Standards
1. **TypeScript**
   - Strict type checking enabled
   - Interface-first approach
   - Proper error handling with custom types

2. **API Integration**
   - Rate limiting implementation
   - Error boundary handling
   - Data caching strategy
   - WebSocket connection management

3. **State Management**
   - Use Zustand for global state
   - React Query for server state
   - Local storage for user preferences

4. **Performance**
   - Implement virtualization for large datasets
   - Optimize chart rerendering
   - Use proper memoization

5. **Testing**
   - Jest for unit testing
   - Cypress for E2E testing
   - Python unittest for analysis service

