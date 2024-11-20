# Changelog

## [0.3.0] - 2024-11-20

### Added
- Implemented Market Dominance chart with stacked area visualization
- Added interactive tooltips for dominance data
- Created custom tooltip component for better data presentation
- Added time range filtering (30d, 90d, 1y, all)
- Implemented proper date formatting with year display
- Added theme-aware styling for chart components

### Technical Details

#### Market Dominance Implementation
- Created DominanceChart component with Recharts
- Added proper data processing and filtering
- Implemented stacked area chart for BTC, ETH, and Others
- Added responsive container handling
- Implemented theme-aware gradients and colors

#### Data Integration
- Added dominanceService for data fetching
- Implemented proper Zod validation
- Added type definitions for dominance data
- Set up 5-minute revalidation for data

#### UI/UX Improvements
- Added custom tooltip component
- Improved date formatting on X-axis
- Added proper percentage formatting
- Implemented theme-aware styling
- Added margin to prevent theme toggle overlap

### Bug Fixes
1. Fixed tooltip display and interaction
2. Improved date formatting with year display
3. Fixed theme toggle button overlap
4. Corrected gradient opacity issues

## [0.2.0] - 2024-11-19

### Added
- Implemented collapsible sidebar navigation
- Added light/dark theme support with default light theme
- Created proper routing structure for market analysis pages
- Added SidebarProvider for state management
- Implemented responsive layout with proper transitions

### Technical Details

#### Sidebar Implementation
- Created custom SidebarProvider for state management
- Added smooth transitions for collapse/expand
- Implemented proper nested navigation
- Added active state tracking for current route

#### Theme Implementation
- Set default theme to light
- Added proper theme variables for sidebar
- Implemented consistent styling across themes
- Added proper color variables for charts

#### Layout Structure
- Reorganized routes under market analysis
- Implemented proper page layouts
- Added responsive container handling
- Improved navigation hierarchy

### Bug Fixes
1. Theme Issues
   - Fixed theme persistence
   - Added proper theme variables
   - Improved color contrast

2. Layout Issues
   - Fixed sidebar width transitions
   - Improved responsive behavior
   - Fixed container center alignment

## [0.1.0] - 2024-11-19

### Added
- Initial project setup with Next.js 14, TypeScript, and TailwindCSS
- Implemented Altcoin Season Index chart using Recharts
- Set up React Query for data fetching with proper caching
- Added API proxy route for handling CORS with external APIs
- Implemented proper error handling and loading states

### Technical Details

#### Chart Implementation
- Initially attempted with Lightweight Charts but faced initialization issues
- Switched to Recharts for better React integration and TypeScript support
- Implemented proper data transformation for time series data
- Added reference lines for Bitcoin and Altcoin season thresholds

#### API Integration
- Created proxy API route to handle CORS issues with CoinMarketCap API
- Implemented proper error handling with Zod schema validation
- Added caching layer with 5-minute stale time
- Set up proper TypeScript types for API response data

#### State Management
- Implemented React Query for server state management
- Added proper loading and error states
- Set up data refetching strategy (5-minute intervals)

### Bug Fixes
1. CORS Issues
   - Problem: Direct API calls to CoinMarketCap were blocked
   - Solution: Implemented Next.js API route as proxy

2. Chart Rendering Issues
   - Problem: Lightweight Charts had initialization problems
   - Solution: Switched to Recharts with proper React integration

3. Type Safety
   - Problem: Incomplete type definitions for API responses
   - Solution: Added comprehensive TypeScript interfaces and Zod schemas

### Development Notes

#### Environment Setup
```bash
# Required environment variables
NEXT_PUBLIC_WS_URL=wss://stream.binance.com:9443/ws
NEXT_PUBLIC_API_URL=https://api.binance.com/api/v3
```

#### API Response Format
```typescript
interface AltcoinSeasonPoint {
  name: string;
  altcoinIndex: string;
  altcoinMarketcap: string;
  timestamp: string;
}
```

#### Known Issues
- Chart rerendering on window resize needs optimization
- Need to implement proper error boundary for chart component
- WebSocket integration pending for real-time updates

### Next Steps
1. Implement WebSocket connection for real-time data
2. Add more technical indicators
3. Implement proper error boundaries
4. Add unit tests for chart components
5. Optimize chart performance 