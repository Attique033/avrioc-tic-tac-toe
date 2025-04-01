# Tic-Tac-Toe Game - React Native Implementation

## Project Overview

This is a full-featured Tic-Tac-Toe game implementation developed as a take-home assessment. The project demonstrates
proficiency in React Native development, state management, API integration, and mobile app architecture.

### Key Features

- 🎮 Interactive Tic-Tac-Toe game board
- 👤 User authentication and registration
- 🤖 Play against computer AI
- 📊 User statistics tracking
- 🔄 Real-time game state updates
- 🔒 Secure JWT token management
- 📱 Responsive and intuitive UI
- 🌐 Backend API integration

## Technical Stack

- **Framework**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **UI Components**: React Native Paper
- **API Client**: Axios
- **Storage**: Expo Secure Store (Keychain & keyStore)
- **Styling**: Native components with custom styling
- **Type Safety**: TypeScript

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Attique033/avrioc-tic-tac-toe-mobile
cd avrioc-tic-tac-toe-mobile
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start
```

4. Run on your preferred platform:

- iOS: `yarn ios`
- Android: `yarn android`
- Web: `yarn web`

## Demo video

https://drive.google.com/file/d/1gZnmCuqBGkQz6Gk13k5VmyfdoqVsLQi2/view?usp=share_link

## Project Structure

```
avrioc-tic-tac-toe/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   ├── navigation/     # Navigation configuration
│   ├── store/         # Redux store setup
│   ├── services/      # API services
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript type definitions
├── assets/            # Images
├── App.tsx            # Root component
└── package.json       # Project dependencies
```

## Key Dependencies

- `@react-navigation/*`: Navigation management
- `@reduxjs/toolkit`: State management
- `react-native-paper`: UI component library
- `axios`: API client
- `expo-secure-store`: Secure storage for tokens
- `expo-linear-gradient`: UI effects
- `expo-blur`: UI effects

## Architecture Highlights

### State Management

- Implemented using Redux Toolkit for efficient state management
- Separate slices for authentication, game state, and user statistics
- Middleware for handling API calls and side effects

### Security

- JWT tokens stored securely using Expo Secure Store
- API requests authenticated with proper headers
- Input validation and error handling

### UI/UX

- Clean and intuitive interface
- Responsive design that works across different screen sizes
- Clear feedback for user actions

### API Integration

- Centralized API service layer
- Proper error handling and loading states
- Type-safe API responses

## Development Guidelines

### Code Style

- Follows TypeScript best practices
- Prettier for code formatting
- ESLint for code quality
- Consistent component structure

## Performance Considerations

- Optimized re-renders using React.memo
- Efficient state updates with Redux Toolkit
- Lazy loading for navigation

## License

This project is part of a take-home assessment and is not licensed for public use.

