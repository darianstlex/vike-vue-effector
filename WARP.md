# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Local Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Build and start production server
npm run lint         # Run ESLint on all files
```

### Development Server
- Development server runs on `http://localhost:3000` by default
- Uses `tsx` with `--force` flag for TypeScript execution
- Hot reload is enabled via Vike's dev middleware

## Architecture Overview

This is a **full-stack web application** built with:

- **Vike**: Meta-framework for Vue.js with SSR/SSG capabilities
- **Vue 3**: Frontend framework with Composition API
- **Effector**: Predictable state management library
- **Express**: Node.js server framework
- **Telefunc**: RPC layer for client-server communication
- **TypeScript**: Type safety throughout the stack

### Key Architectural Patterns

#### Page-Based Routing (Vike)
- Uses filesystem-based routing in `/pages/` directory
- Pages are defined with `+Page.vue` files
- Configuration via `+config.ts` files
- Supports Route Strings, Route Functions, and Filesystem Routing
- Special files:
  - `+onBeforeRender.ts` - Server-side data preparation
  - `+onAfterRenderClient.ts` - Client-side initialization
  - `+pageInitiated.ts` - Server-side page events
  - `+pageStarted.ts` - Client-side page events

#### State Management (Effector)
- **Scope-based architecture**: Each page/user gets isolated state scope
- **Server-side state preparation**: Use `+pageInitiated.ts` events
- **Client-side hydration**: State is serialized/deserialized via `scopeValues`
- **Custom Vue integration**: Custom `useUnit` hook that works with Effector scopes
- **Provider pattern**: `Provider.vue` component manages scope injection

#### Custom Effector-Vue Integration
- **Custom `useUnit` hook**: Located in `utils/effector/useUnit.ts`
  - Handles scope binding automatically
  - Watches scope changes and rebinds units
  - Removes readonly constraints for component prop compatibility
- **Scope management utilities**:
  - `getMergeScope()` - Client-side scope merging
  - `provideScope/useScope` - Vue composition API integration

#### Server Architecture
- **Express server** in `/server/entry.ts`
- **Telefunc integration** for type-safe RPC calls
- **Production features**: Compression, cookie parsing, periodic prerendering
- **Development features**: Vike dev middleware with hot reload

### Directory Structure

- `/pages/` - Vike pages with routing and lifecycle hooks
- `/components/` - Reusable Vue components
- `/layouts/` - Page layout components (LayoutDefault, HeadDefault)
- `/utils/effector/` - Effector integration utilities and hooks
- `/server/` - Express server and handlers
- `/database/` - Data layer (example: todoItems.ts)

### Build Configuration

- **Vite config**: Located in `vite.config.ts`
- **SWC plugin**: Enabled for Effector transformations
- **Vue Markdown**: Supports `.md` files as Vue components
- **Path aliases**: Configured for `@components`, `@layouts`, `@utils`, etc.
- **Telefunc**: Integrated for RPC functionality

### Development Guidelines

#### State Management
- Create models in `model.ts` files within page directories
- Use `createPageInit()` for server-side data preparation
- Use `createPageStart()` for client-side initialization
- Always use the custom `useUnit` hook instead of the standard one

#### Page Structure
- Each page should have its own directory under `/pages/`
- Use `+pageInitiated.ts` for server-side effects
- Use `+pageStarted.ts` for client-side effects
- Page components go in `+Page.vue`

#### Component Development
- Components use Vue 3 Composition API
- Import Effector units via `useUnit` hook
- Follow the established alias pattern for imports

#### RPC Communication
- Use Telefunc for client-server communication
- RPC functions in `.telefunc.ts` files
- Type-safe by default

### Linting and Code Style

- **ESLint config**: Modern flat config in `eslint.config.js`
- **Prettier integration**: Single quotes, trailing commas
- **Import sorting**: Enforced via `simple-import-sort`
- **TypeScript**: Strict type checking with consistent import types
- **Vue-specific rules**: Component naming, attribute ordering

### SSR Considerations
- SSR is enabled by default
- State is serialized on server and hydrated on client
- Use Effector scopes for proper SSR state isolation
- Page transition animations supported via lifecycle hooks
