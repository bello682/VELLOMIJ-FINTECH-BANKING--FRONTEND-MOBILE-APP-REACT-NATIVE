# VellomijBank 🏦

VellomijBank is a modern Fintech/Banking mobile application built with React Native and Expo. It features a secure interface, real-time transaction capabilities, and a robust backend integration.

# 📱 Mobile Application (Android)

You can test the live application directly on your Android device without setting up a development environment.

- Download the APK:

```bash
https://expo.dev/accounts/olamijidev/projects/VellomijBank/builds/a5b15428-b21b-4e38-9f86-d8e669e9f439
```

- Installation Note: Since this is a custom build, your phone may flag it as an "Unknown Source." Simply select "Install Anyway" to proceed.

## 🛠 Tech Stack

- Frontend: React Native (Expo SDK 54), Expo Router, TypeScript.

- Backend: Node.js, Express.

- Database: MongoDB.

- Features: New Architecture enabled, Adaptive Icons, KYC document upload (Image Picker), and Date/Time management.

## ⚠️ Important Note for Testers

[!IMPORTANT]
Email Notifications: The live backend is hosted on Render. Please note that Render's free tier environment has restrictions that prevent Nodemailer from sending outbound emails (OTP/Verification).

**To test the full Email/OTP flow:**

1. Clone the backend repository.

2. Configure your .env with a valid Gmail/SMTP service.

3. Run the backend locally while connecting the mobile app to your local IP.

## 🚀 Getting Started (Development)

1. Install dependencies

```bash
npm install
```

2. Configure Environment Variables
   Create a .env file in the root directory:

```bash
EXPO_PUBLIC_MOBILE_APP_BASE_URL=https://vellomij-fintech-banking-backend-api.onrender.com/Api_Url
EXPO_PUBLIC_MOBILE_APP_ASSETS_URL=https://vellomij-fintech-banking-backend-api.onrender.com
```

3. Start the app

```bash
npx expo start
```

- Scan the QR code with the Expo Go app (Android) or use an emulator.

## 🏗 Build Instructions (EAS)

If you wish to generate a new standalone build:

1. Install EAS CLI: npm install -g eas-cli

2. Log in: eas login

3. Configure: eas build:configure

4. Build APK: eas build -p android --profile preview

5. Note: This works to updated existing APK (Replace production with whatever branch name you used during your build).

```bash
eas update --branch production --message "Fixed splash screen routing logic
```

## 📄 License

This project is private and intended for portfolio demonstration.
