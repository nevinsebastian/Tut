
```markdown
# Adventure Activity Booking App




## Prerequisites

Before you start testing the app, make sure you have the following installed on your machine:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- React Native CLI: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/nevinsebastian/Tut.git
cd Tut
```

2. Install dependencies:

```bash
npm install
```

## Backend Setup

The backend server is hosted on AWS. Please contact the project administrator to obtain the AWS API endpoint and any required credentials.

## Configuring the App

Once you have the necessary backend information, open the `src/config/apiConfig.js` file, and update the `BASE_URL` with the AWS API endpoint.

```javascript
// src/config/apiConfig.js

const API_CONFIG = {
  BASE_URL: 'YOUR_AWS_API_ENDPOINT',
  // ... other configurations
};

export default API_CONFIG;
```

## Run the App

To run the app on an Android or iOS emulator, use the following commands:

### Android

```bash
npx react-native run-android
```

### iOS

```bash
npx react-native run-ios
```

## Testing

Once the app is running, you can use the emulator to navigate through the app. Test various features, such as:

- View the list of adventure activities.
- Click on an activity to view its details.
- Explore the app's user interface.

## Issues and Feedback

If you encounter any issues or have feedback, please create an issue on the GitHub repository: [https://github.com/nevinsebastian/Tut/issues](https://github.com/nevinsebastian/Tut/issues).

Enjoy testing the Adventure Activity Booking App!


