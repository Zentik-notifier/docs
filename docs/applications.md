---
sidebar_position: 2
---

# Applications - Technology Stack

This section describes the technical architecture of Zentik, including the frameworks, libraries, and technologies used for the backend and mobile client.

## Backend Stack

### Main Framework
- **NestJS**: Node.js framework for scalable and maintainable server-side applications
- **TypeScript**: Typed programming language for JavaScript
- **PostgreSQL**: Relational database for data persistence

### Architecture and Patterns
- **Modular Architecture**: Code organization in independent modules
- **Dependency Injection**: Built-in dependency injection system in NestJS
- **Repository Pattern**: Abstraction for data access
- **Service Layer**: Business logic separated from controllers

### Authentication and Security
- **Passport.js**: Authentication strategies (JWT, OAuth)
- **JWT**: JSON Web Tokens for stateless authentication
- **OAuth 2.0**: Authorization protocol for third-party applications
- **System Access Tokens**: System tokens for server-to-server integration

### API and Communication
- **GraphQL**: Query language for APIs with typed schema
- **REST API**: Traditional REST endpoints for compatibility
- **WebSocket**: Real-time communication for live notifications
- **Webhook**: HTTP notifications for system events

### Storage and File Management
- **File System**: Local storage for attachments and temporary files
- **Database Migrations**: Database change management
- **Seeding**: Initial database population with test data

## Client Stack

### Mobile Framework
- **React Native**: Cross-platform mobile application framework
- **Expo**: Simplified React Native development platform
- **TypeScript**: Static typing for client code

### State Management
- **Apollo Client**: GraphQL client for React/React Native
- **React Context**: Global application state management
- **Custom Hooks**: Reusable logic custom hooks

### UI and Components
- **React Navigation**: Navigation between app screens
- **Custom Components**: Custom UI components for the app
- **Responsive Design**: Adaptive layout for different screen sizes

### Push Notifications
- **Expo Notifications**: Integrated push notification system
- **APNs**: Apple Push Notification service for iOS
- **FCM**: Firebase Cloud Messaging for Android
- **Local Notifications**: Local app notifications

## Main Libraries

### Backend
- **@nestjs/common**: NestJS utilities and decorators
- **@nestjs/graphql**: GraphQL integration
- **@nestjs/passport**: Authentication strategies
- **@nestjs/typeorm**: ORM for database
- **class-validator**: DTO validation
- **class-transformer**: Object transformation

### Client
- **@apollo/client**: GraphQL client
- **react-native-async-storage**: Asynchronous local storage
- **expo-constants**: Expo environment constants
- **expo-linking**: Deep linking in the app
- **expo-secure-store**: Secure storage for credentials

### Testing
- **Jest**: Testing framework
- **@nestjs/testing**: Testing utilities for NestJS
- **Supertest**: HTTP API testing

## Project Structure

```
zentik/
├── backend/           # NestJS API
│   ├── src/
│   │   ├── auth/      # Authentication and authorization
│   │   ├── users/     # User management
│   │   ├── messages/  # Notification system
│   │   ├── buckets/   # Content organization
│   │   └── webhooks/  # Webhook system
│   └── test/          # Test suite
├── frontend/            # React Native app
│   ├── app/           # App screens
│   ├── components/    # Reusable components
│   ├── services/      # Business logic
│   └── hooks/         # Custom hooks
└── docs/              # Docusaurus documentation
```

## Development Technologies

### Build and Deployment
- **Docker**: Application containerization
- **Docker Compose**: Local service orchestration
- **NPM Scripts**: Build operation automation
- **ESLint**: TypeScript/JavaScript code linting

### Monitoring and Logging
- **Winston**: Structured logging system
- **Health Checks**: Status monitoring endpoints
- **Error Handling**: Centralized error management

### Security
- **Helmet**: HTTP security headers
- **CORS**: Cross-Origin Resource Sharing configuration
- **Rate Limiting**: DDoS attack protection
- **Input Validation**: Input validation and sanitization

This architecture ensures scalability, maintainability, and security for an enterprise notification system.
