# AI Code Reviewer & Online Compiler

An AI-powered web application for writing, compiling, running, and reviewing C++ code online.

## Features

- Write C++ code using Monaco Editor
- Compile and run C++ programs
- Provide custom input
- View program output and errors
- Get AI-powered code reviews
- Get suggestions to improve code
- Light and dark mode
- Simple and responsive UI

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Monaco Editor
- Axios

### Backend
- Node.js
- Express.js
- Google Gemini AI
- C++ (g++)

## Project Structure

```text
ai-code-reviewer-compiler/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
└── .gitignore
