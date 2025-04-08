# Calculator

## Task

[Task requirements](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit#heading=h.5dt3hghpa22f)

## Demo

Check out the live demo: [Calculator](https://yulikk.github.io/calc/)

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, division
- Additional operations: percentage, sign change
- Copy result to clipboard
- Keyboard support
- Error handling
- Theme switching

## Project Structure

- `src/` - Source files
  - `app/` - Application entry point
  - `entities/` - Basic building blocks (Display, Control Panel, Options Panel, Notification)
  - `features/` - Feature modules (Theme switcher)
  - `shared/` - Shared utilities, constants
    - `assets/` - Icons
    - `styles/` - Reusable SCSS variables and mixins
    - `ui/` - Abstract base components used as foundation for other components
    - `utils/` - Utility functions for calculation logic
  - `widgets/` - Main components (Calculator)

## Technologies

- JavaScript (ES6+)
- SCSS Modules
- Webpack
- ESLint
- Prettier
- Stylelint
- Husky (Git hooks)

## How to run the app

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/YulikK/calc.git
```

1. Install dependencies

```bash
npm install
```

### Development

Run development server:

```bash
npm start
```

The app will be available at <http://localhost:8080>

### Production Build

Create production build:

```bash
npm run build
```

### Linting

Run ESLint:

```bash
npm run lint
 ```

Fix ESLint issues:

```bash
npm run lint:fix
 ```

Format code with Prettier:

```bash
npm run format
 ```

Check SCSS files:

```bash
npm run stylelint
 ```

Fix SCSS issues:

```bash
npm run stylelint:fix
 ```

## Happy Calculating! 🧮✨

May all your computations be accurate and your results be precise! 🎯
