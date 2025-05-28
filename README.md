# 📊 Project Management Application

## Description

This is a full-stack Kanban board with user authentication, drag-and-drop functionality and multi-language support (Russian and English).

## Screenshots

## Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Features

- **User Authentication:** You can create a new account or log in with an existing one.
- **Account Deletion:** You can delete your account.
- **Multilingual Support:** The app supports Russian and English languages.
- **Board, Column, and Task Management:** You can create, edit, and delete boards, columns, and tasks.
- **Drag-and-Drop:** You can swap columns or move tasks within a column or between different columns.
- **Modal Window:** The same component is used for creating a new board, column, or task, and for confirming delete actions.
- **Responsive Design:** The app works well and looks good on different screen sizes.

## Requirements

Before you can run the project, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Recommended version: v14 or higher)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

## Installation

To set up and run the project, follow these steps:

**1. Clone the Backend Branch**

Clone the backend code and install its dependencies:

   ```bash
   git clone https://github.com/nst-mznts/Project-Management-App.git -b backend
   cd backend
   npm install
   ```

**2. Clone the Frontend Branch**

   Clone the frontend code and install its dependencies:
   
   ```bash
   git clone https://github.com/nst-mznts/Project-Management-App.git -b frontend
   cd frontend
   npm install
   ```

**3. Run the Backend**

In the backend folder, start the backend server:

   ```bash
   npm run start
   ```

   You will see these messages in the console:
   - `Server is running on port 3004`
   - `Database connected successfully`

**4. Run the Frontend**

   In the frontend folder, start the frontend:
   
   ```bash
   npm run dev
   ```

A link will appear in the console: `http://localhost:5173/`. Open it in your browser to use the app.
