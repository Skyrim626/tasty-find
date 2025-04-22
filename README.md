# Recipe Finder Documentation

## Overview

Recipe Finder is a React application built with TypeScript and Vite, using Tailwind CSS for styling. It integrates with the Spoonacular API to find and display recipes.

## Project Setup

### Environment Variables

The project requires the following environment variables:

- `VITE_SPOONACULAR_API_KEY`: Your Spoonacular API key

Create a `.env` file in the root directory based on the `.env.example` template:

```
VITE_SPOONACULAR_API_KEY=your_api_key_here
```

### Configuration Files

#### Package.json

The project uses the following key dependencies:

- React 19
- React Router Dom 7.5.1
- Axios for API requests
- Framer Motion for animations
- Lucide React for icons
- React Helmet/React Helmet Async for document head management
- React Toastify for notifications

Development dependencies include:

- TypeScript 5.7.2
- Vite 6.3.1
- ESLint 9.22.0
- Tailwind CSS 3.4.1
- PostCSS and Autoprefixer

#### ESLint Configuration

The project uses a modern ESLint flat config approach with the following plugins:

- TypeScript ESLint
- React Hooks ESLint Plugin
- React Refresh ESLint Plugin

Key ESLint settings:

- Recommended TypeScript and JavaScript rules
- React Hooks rules
- Special handling for React Refresh components

#### TypeScript Configuration

The project uses TypeScript with the following configuration files:

- `tsconfig.json`: Base TypeScript configuration file that references more specific configs
- `tsconfig.app.json`: Configuration for the application code (in the `src` directory)
- `tsconfig.node.json`: Configuration for Node.js files like `vite.config.ts`

Key TypeScript settings:

- Target: ES2020 for application code, ES2022 for Node.js code
- Strict type checking enabled
- React JSX support
- Unused variables and parameters checking

#### Tailwind CSS Configuration

Tailwind CSS is used for styling with the following configuration:

- `tailwind.config.js`: Configures Tailwind to scan HTML and JS/TS/JSX/TSX files for classes
- `postcss.config.js`: Includes Tailwind CSS and Autoprefixer plugins

#### Vite Configuration

- `vite.config.ts`: Configures Vite with React plugin support

#### Deployment Configuration

- `vercel.json`: Configuration for deployment to Vercel platform
  - Specifies build command: `npm run build`
  - Sets output directory: `dist`
  - Configures rewrites to handle client-side routing by directing all routes to `index.html`

## Development

### Prerequisites

- Node.js (version recommended by Vite)
- npm or yarn
- Spoonacular API key

### Getting Started

1. Clone the repository

```
git clone https://github.com/Skyrim626/tasty-find
```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```
3. Create a `.env` file with your Spoonacular API key
4. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

### Scripts

The following npm scripts are available:

- `npm run dev`: Start the development server
- `npm run build`: Build the project (runs TypeScript build followed by Vite build)
- `npm run lint`: Run ESLint to check code quality
- `npm run preview`: Preview the production build locally

### Project Structure

This is a typical Vite + React + TypeScript project structure:

```
/
├── src/            # Application source code
├── public/         # Static assets
├── dist/           # Build output (generated)
├── .env.example    # Example environment variables
├── postcss.config.js
├── tailwind.config.js
├── eslint.config.js # ESLint configuration (flat config)
├── tsconfig.json   # TypeScript configuration
├── vite.config.ts  # Vite configuration
└── vercel.json     # Vercel deployment configuration
```

## Key Features

Based on the dependencies, the application likely includes:

- Recipe search and display functionality using the Spoonacular API
- Client-side routing with React Router
- Animations with Framer Motion
- Icon usage with Lucide React
- Document head management with React Helmet/Async
- Toast notifications with React Toastify

## Deployment

The project is configured for deployment to Vercel with the following settings:

- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: Vite
- Client-side routing support via rewrites configuration

### Deployment Steps

1. Push your code to a Git repository
2. Connect the repository to Vercel
3. Add the required environment variables in the Vercel dashboard
4. Deploy the application

## API Integration

The application uses the Spoonacular API, which requires an API key. The key is accessed in the application file named src/api/axios.ts and add this code using:

```typescript
const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
```

Remember to keep your API key secure and never commit it to your repository.
