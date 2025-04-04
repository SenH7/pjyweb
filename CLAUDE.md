# CLAUDE.md - Development Guide

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines
- **Framework**: Next.js with Pages Router
- **Styling**: Use Tailwind CSS utility classes
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: Group imports by: React, Next.js, third-party, components, utilities
- **Components**: Prefer functional components with explicit props
- **Internationalization**: Use next-i18next with namespaces
- **Error Handling**: Use try/catch for async operations
- **State Management**: Use React hooks (useState, useEffect)
- **Folder Structure**:
  - `/src/components/` - Reusable components organized by category
  - `/src/pages/` - Next.js routes
  - `/src/utils/` - Utility functions
  - `/public/` - Static assets and i18n files