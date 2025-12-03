# Copilot Instructions for ProyectoApp

## Project Overview

- **ProyectoApp** is a React Native app built with Expo, using React Navigation and Context for state management.
- The app is organized into clear domains: UI components, context providers, navigation, services (API), and views.

## Architecture & Data Flow

- **App.js** wraps the app in `AuthProvider` and `ClassroomProvider`, then renders the navigation stack.
- **Navigation** is managed via `src/navigation/Navigation.js` using `@react-navigation/native-stack`.
- **Context**: Global state (e.g., classroom data) is managed in `src/context/ClassroomProvider.jsx` and consumed via custom hooks (e.g., `useClassroom`).
- **Services**: API calls are abstracted in `src/services/*.js` using Axios. Auth tokens are stored in `AsyncStorage` and injected into headers.
- **Views**: Main screens are in `src/views/`, with subfolders for domain-specific screens (e.g., Classroom).
- **Components**: UI elements are in `src/components/`, grouped by domain.

## Developer Workflows

- **Start the app**: `npm start` (or `npm run android`/`ios`/`web` for platform-specific launch)
- **Dependencies**: Managed via npm. Key packages: `expo`, `react-native`, `@react-navigation/*`, `axios`.
- **API URL**: Set via `EXPO_PUBLIC_API_URL` env variable (default: `https://tu-api.com`).
- **Authentication**: Token stored in `AsyncStorage` and used in all service requests.

## Project-Specific Patterns

- **Context Providers**: Always wrap screens in relevant providers (`AuthProvider`, `ClassroomProvider`).
- **Service Functions**: All API logic is in `src/services/`, with clear naming (`getMyClassrooms`, `createClassroom`, etc.).
- **Alerts**: Use React Native's `Alert` for user feedback, triggered from context or components.
- **Navigation**: Use `navigation.navigate('ScreenName', params)` for screen transitions.
- **Error Handling**: Catch and log errors in service calls; show user-friendly alerts via context.
- **Component Communication**: Pass data via props and context; avoid prop drilling by using hooks.

## Integration Points

- **External API**: All backend communication via Axios in `src/services/`.
- **AsyncStorage**: Used for persistent auth tokens.
- **Expo**: Handles build, status bar, and platform-specific features.

## Key Files & Directories

- `App.js`: App entry, provider setup
- `src/navigation/Navigation.js`: Navigation stack
- `src/context/ClassroomProvider.jsx`: Classroom state logic
- `src/services/classroom.service.js`: API calls for classroom domain
- `src/components/Classroom/`: UI for classroom features
- `src/views/Classroom/`: Screens for classroom workflows

## Example Patterns

- **Service Usage**:
  ```js
  import * as classroomService from "../../services/classroom.service";
  const data = await classroomService.getMyClassrooms();
  ```
- **Context Usage**:
  ```js
  const { classrooms, fetchClassrooms } = useClassroom();
  ```
- **Navigation**:
  ```js
  navigation.navigate("EditClassroom", { id: classroom.id });
  ```

---

_If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions._
