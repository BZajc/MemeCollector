# MemeCollector Documentation

Welcome to the MemeCollector documentation/ This project demonstrates how to build an engaging clicker-style game using modern web development tools like React, Redux, TypeScript, and Firebase (obviously I do not recommend using react to build website games). 

### Why creating game using React

My goal was to create an application utilizing Firebase and React, rather than developing a full-fledged game. The choice of concept might seem unusual, but I wanted to build something relatively original on this library, instead of the typical to-do list, to better showcase my skills.

## Project Overview

MemeCollector is a web application designed for showcasing interactive features and connected components. Users earn virtual currency by clicking on the screen, which can then be used to purchase card packs and upgrades. Collected cards are stored in a **Collection**.

## Features

### 1. Card Collection
- Collect cards of different rarities: **C Tier**, **B Tier**, **A Tier**, and **S Tier**.
- Cards are stored in a persistent database and displayed in the **Collection** tab.
- Placeholder cards indicate uncollected cards, giving a clear goal for completion.

### 2. Currency System
- Earn currency by clicking on the screen in the **Home** tab.
- Use the currency to purchase card packs, ranging from basic to premium, each with different rarity probabilities.

### 3. Card Packs
- Purchase card packs with currency to randomly receive 5 cards.
- Each card has metadata, including the date it was acquired.
- Avoid duplicate cards, ensuring every card collected is unique.

### 4. Upgrades
- Purchase upgrades like **Double Click**, **Critical Click**, and **Special Features** (e.g., access to **BlackJack** or **Wheel of Meme**).
- Upgrades are stored in the database and applied globally to enhance gameplay.

### 5. Technical Focus
- Implements a fully connected backend using Firebase for persistent user data storage.
- State management with Redux ensures seamless synchronization between components.

### 6. Extensibility
- The code was designed with extensibility in mind, making the process of adding new cards incredibly straightforward. All you need to do is place a .webp file in the appropriate folder (src/images/cards) with a prefix indicating its rarity (e.g., s-cardname.webp), and the card will be seamlessly integrated and handled by the application without requiring any additional coding.

### 7. Organized Styling and Maintainability
-Each component has a dedicated SCSS file, imported into a central stylesheet. This modular approach ensures clean, maintainable styling and allows easy navigation and updates, keeping the structure intuitive and developer-friendly.

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For managing global state.
- **TypeScript**: For type safety and code maintainability.
- **Firebase**: For authentication and real-time database.
- **SCSS**: For styling and animations.

## Hosting Information

MemeCollector is currently hosted on **Netlify**, and you can access the live version of the application at:

[https://memecollector.netlify.app/](https://memecollector.netlify.app/)

## Cloning the Repository

To clone the MemeCollector repository and run it locally, follow these steps:

### Steps

1. Open a terminal or command prompt on your machine.
2. Navigate to the directory where you want to clone the repository.
3. Clone the repository using the following command:
   
   git clone https://github.com/BZajc/MemeCollector.git

4. Run the command to install dependencies:
  
  npm install

5. Configure Firebase. Open src/firebaseConfig.js file and replace the placeholders with your Firebase project's credentials:
   
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_project_id.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project_id.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id",
};

### Firebase api keys are only used to identify an app and there is no real reason to keep them private that's why you can find mine in the code but they aren't gonna work anyway.

6. Add Cards (Optional):

Add .webp images for your cards in src/images/cards/ following the naming convention for rarity prefixes (e.g., c-cardname.webp, b-cardname.webp).
There are 4 rarities available by default: C, B, A, S.

## Acknowledgments

- **Music**: Special thanks to Vince Desi and Mike Jaret for providing the license to use the song _"Christian-Salyer-Habib's Lucky Ganesh-All American Market"_ from POSTAL® 2.
- **Copyright**: 
  - © Running With Scissors Studios LLC, 1996-2024. All Rights Reserved.
  - POSTAL® and Running With Scissors® are Registered Trademarks and Service Marks of Running With Scissors Studios LLC.

---
