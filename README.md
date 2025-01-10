# Shelfable

IMPORTANT: Due to issues during deployment the last working dev environment version is at commit tagget v1

## Table of Contents

- General Info
- Technologies Used
- Features
- Setup
- Project Status
- Acknowledgements
- Contact

## General Information

Shelfable is a full-stack application designed to fetch books using the Google Books API. Users can search for books and save their favorites in a personal area. The application requires login credentials to manage the user's personal favorites list.

This is the second part of the project, focusing on both the frontend and backend functionalities, ensuring smooth integration and user experience.

## Technologies Used

### Frontend

- **Vite** - version 6.0.1
- **React** - version 18.3.1
- **TailwindCSS** - version 3.4.12 for styling

### Backend

- **Node.js** - version 20.15.0
- **Express** - version 4.21.2 for server-side routing
- **Passport.js** - version 0.7.0 for local authentication
- **bycript** - version 5.1.1 for password encrypt
- **MongoDB** - version 6.12.0 for storing user data

## Features

- Search books using Google Books API.
- Save favorite books in a personal area after logging in.
- Responsive design using TailwindCSS.
- Local authentication using Passport.js.
- User data persistence with MongoDB.

## Setup

### Frontend

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Start the server:
   ```bash
   npm run server
   ```

## Project Status

Project is: pre-deploying phase

## Acknowledgements

This project was inspired by florinpop17 with this repo.

## Contact

Created by @Alberto23B - feel free to contact me!
