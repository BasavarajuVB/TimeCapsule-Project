# Time Capsule App

A modern React application for creating and managing digital time capsules. Preserve your memories, photos, and messages for future rediscovery.

## Features

- Create digital time capsules with photos, messages, and videos
- Set custom unlock dates for your capsules
- Secure storage until the specified date
- User authentication with Google and email/password
- Real-time database integration
- Beautiful cosmic-themed UI
- Responsive design for all devices
- Advanced filtering and search capabilities
- Contact form with validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <https://github.com/BasavarajuVB/TimeCapsule-Project.git>
cd time-capsule-app
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## What technologies are used for this project?

This project is built with:

- **Frontend**: Vite, React, JavaScript
- **UI Components**: shadcn-ui, Tailwind CSS
- **Backend**: Firebase (Authentication, Realtime Database)
- **Authentication**: Firebase Auth (Email/Password, Google Sign-in)
- **Database**: Firebase Realtime Database
- **Deployment**: Vercel.com
- **Form Handling**: React Form
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect your repository
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Firebase Hosting**: Use Firebase CLI to deploy

### Build for Production

```sh
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Firebase Setup

This project uses Firebase for authentication and database. To set up Firebase:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Create a Realtime Database
4. Copy your Firebase config to `src/lib/firebase.js`
5. Update security rules for your database

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Developer

**Developed by BasavarajuVB** - Fullstack Developer at Web3Today

- **LinkedIn**: [Basavaraju VB](https://www.linkedin.com/in/basavaraju-vb/)
- **GitHub**: [BasavarajuVB](https://github.com/BasavarajuVB)
- **Repository**: [TimeCapsule-Project](https://github.com/BasavarajuVB/TimeCapsule-Project.git)

## License

This project is open source and available under the [MIT License](LICENSE).
