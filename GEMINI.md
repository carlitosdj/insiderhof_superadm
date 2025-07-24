# GEMINI.md

This file provides guidance to GEMINI when working with code in this repository.

## Development Commands

### Basic Development
- `npm run dev` - Start development server on port 3003
- `npm run build` - Build for production (runs TypeScript check then Vite build)
- `npm run lint` - Run ESLint with TypeScript support
- `npm run preview` - Preview production build on port 3003

### Testing
No specific test commands are configured in package.json. Check with the team for testing approach.

## Project Architecture

This is a React 18 + TypeScript admin dashboard application built with Vite, using the Metronic 8 theme framework.

### Core Technologies
- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Redux with Redux Saga for async operations and Redux Persist for persistence
- **Styling**: Bootstrap 5, Sass, Metronic theme system
- **HTTP Client**: Axios with interceptors for authentication
- **Forms**: Formik with Yup validation
- **Charts**: ApexCharts and Chart.js
- **Date Handling**: date-fns and moment.js
- **Internationalization**: react-intl

### API Configuration
- Production API: `https://api.insiderhof.com.br`
- Authentication: Bearer token stored in localStorage
- API client configured in `src/services/api.ts` with automatic token injection

### Application Structure

#### Layout System
- **Master Layout**: `src/_metronic/layout/MasterLayout.tsx` - Main application wrapper
- **Theme Provider**: Supports light/dark mode switching
- **Responsive Design**: Built on Bootstrap 5 grid system

#### State Management Architecture
- **Store**: `src/store/index.ts` - Redux store with saga middleware
- **Ducks Pattern**: Each feature has its own folder in `src/store/ducks/` with actions, reducers, sagas, and types
- **Key State Modules**:
  - `me` - Current user state
  - `users` - User management
  - `carts` - Shopping cart/sales data
  - `leads` - Lead management
  - `dlaunch` - Launch management
  - `dproduct` - Product management
  - `dclass` - Class/course management
  - Many more domain-specific modules

#### Module Organization
- **Admin Pages**: `src/app/pages/admin/` - Main admin functionality
  - `users/` - User management
  - `sells/` - Sales/cart management
  - `leads/` - Lead management
  - `dlaunch/` - Launch management with multi-step creation
  - `dproducts/` - Product management
  - `dclass/` - Class/course management
  - `massmails/` - Mass email campaigns
  - `wppcamp/` - WhatsApp campaigns
  - `roasplanner/` - ROAS planning tools

#### Key Features
- **Multi-step Launch Creation**: Complex stepper-based launch creation workflow
- **Product Management**: Full CRUD for products with offers and launch phases
- **User Management**: Complete user administration with export functionality
- **Email Campaigns**: Both mass email and single email management
- **WhatsApp Integration**: Campaign and group management
- **ROAS Planning**: Return on ad spend calculation tools
- **Export Functionality**: PDF and Excel export capabilities
- **Image Management**: Image cropping and resizing utilities

#### Authentication Flow
- Token-based authentication with localStorage persistence
- Auth module in `src/app/modules/auth/` handles login/logout
- Axios interceptor automatically adds Bearer token to requests

### Development Patterns

#### Component Structure
- Use functional components with hooks
- Follow existing TypeScript patterns
- Components are organized by feature/module
- Common UI components in `src/_metronic/helpers/components/`

#### State Management
- Use Redux Saga for async operations
- Follow the ducks pattern for organizing Redux code
- Persist important state using Redux Persist

#### Styling
- Use Metronic's Bootstrap-based design system
- Custom SCSS in `src/_metronic/assets/sass/`
- Follow existing component styling patterns

#### API Integration
- Use the configured axios instance from `src/services/api.ts`
- Implement proper error handling
- Follow existing patterns for API calls in saga files

### Important Notes
- The app uses Metronic 8 theme - follow their component and styling conventions
- Many admin features are domain-specific to the InsiderHof business
- Complex state management due to extensive feature set
- Multi-language support is configured but may not be fully implemented
- Development server runs on port 3003 by default