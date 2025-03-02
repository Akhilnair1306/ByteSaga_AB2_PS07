Blood Donation Emergency Response App
A React Native mobile application designed to connect blood donors with those in need during emergencies. The app facilitates quick response to blood donation requests and includes an SOS feature for urgent situations.

Features
1. Authentication
User registration with personal and medical details
Secure login system
Profile management
2. Blood Request System
Create blood donation requests
Specify blood type and urgency level
Add hospital location and additional notes
Track request status
3. Donor Dashboard
View nearby blood requests
Accept/decline donation requests
Track donation history
View impact statistics
4. Emergency SOS System
Quick access SOS button
Real-time location tracking
Immediate notification to nearby donors
Emergency contact integration
5. Profile Management
Personal information management
Blood donation history
Emergency contact information
Location preferences
Tech Stack
Frontend Framework: React Native with Expo
Navigation: React Navigation v6
Maps & Location: React Native Maps, Expo Location
UI Components: Custom components with React Native Elements
State Management: React Hooks
Styling: Custom styling system with theme support
Installation
1. Clone the repository:
bash
Copy
git clone https://github.com/your-username/blood-donation-emergency-response.git
cd blood-donation-emergency-response
2. Install dependencies:
bash
Copy
npm install
Or if you prefer using Yarn:

bash
Copy
yarn install
3. Run the app:
bash
Copy
expo start
This will launch the Expo development server, and you can view the app by scanning the QR code with the Expo Go app or by using an Android/iOS simulator.

Running on a Physical Device
To run the app on a physical device, make sure you have the Expo Go app installed on your device. Then, scan the QR code shown in the terminal when running expo start to instantly open the app on your phone.

Screenshots
Here are some screenshots of the app:


Project Structure
Here's a brief overview of the project structure:

bash
Copy
/blood-donation-emergency-response
├── /assets              # Images, icons, and other static assets
├── /components          # Reusable components (buttons, inputs, etc.)
├── /screens             # App screens (login, dashboard, request, etc.)
├── /services            # API calls, Firebase setup, SOS integration
├── /navigation          # React Navigation setup
├── App.js               # Entry point for the app
├── package.json         # App dependencies and scripts
└── /theme               # Styling and themes for the app
Tech Stack
Frontend Framework: React Native with Expo
Navigation: React Navigation v6
Maps & Location: React Native Maps, Expo Location
UI Components: Custom components with React Native Elements
State Management: React Hooks, Context API
Styling: Custom styling system with theme support
Contributing
We welcome contributions! If you'd like to improve the app or add features, you can fork the repository, create a new branch, and submit a pull request.

How to contribute:
Fork the repository
Clone your fork to your local machine
Create a new branch for the feature/fix you're working on
Make your changes
Test your changes
Push your changes and open a pull request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
React Native: The core framework for building the mobile application.
Expo: Used for building and running the app quickly and efficiently.
React Navigation: Provides the navigation system for the app.
React Native Elements: UI library for components.
React Native Maps: For integrating maps and location-based services.
Firebase: For user authentication and storing user data (if applicable).
Emergency API: For SOS system notifications (if applicable).
