# Happy Thoughts

**backend github link**
https://github.com/JeffieJansson/ht-project-api

---
## What is Happy Thoughts?

Happy Thoughts is a positive social app inspired by Twitter, where users can share happy thoughts and spread joy. You can:
- Create an account and log in
- Write and post your own happy thoughts (5–140 characters)
- See other users' thoughts and like them with a heart
- Edit and delete your own thoughts
- Get instant feedback on your input and see how many characters you have left
- Enjoy real-time updates and a responsive design

The app is built with React and communicates with a backend API to handle authentication, storage, and retrieval of thoughts. Everything is designed to be simple, accessible, and fun to use!

## Project Overview

Happy Thoughts is a React application that allows users to share what makes them happy and spread positivity by liking others' thoughts. The app connects to a backend API to store and retrieve thoughts, providing a seamless user experience with instant feedback and validation.

## Features

- **Post Happy Thoughts**: Share what makes you happy with a simple form
- **Character Counter**: Real-time feedback showing remaining characters (turns red when exceeding limit)
- **Validation**: Friendly error messages for empty, too short, or too long messages
- **Like Thoughts**: Heart button to like others' thoughts (only once per session, spam prevention)
- **Loading States**: User-friendly loading indicators during API calls
- **Responsive Design**: Works seamlessly from mobile (320px) to desktop (1600px+)
- **Accessibility**: ARIA labels and live regions for screen reader support

## Requirements Fulfilled

- ✅ **API Documentation**: Express List Endpoints documents all available routes.
- ✅ **Read Thoughts**: `/thoughts` (GET) returns all thoughts.
- ✅ **Read Single Thought**: `/thoughts/:id` (GET) returns a specific thought.
- ✅ **Like Thought**: `/thoughts/:id/like` (PATCH) increments hearts.
- ✅ **Authenticated Create/Update/Delete**: Creating, updating, and deleting thoughts require login (accessToken in Authorization header).
- ✅ **Signup & Login**: `/user/signup` and `/user/login` endpoints with password encryption (bcrypt).
- ✅ **RESTful API**: All endpoints follow REST conventions.
- ✅ **Clean Code**: Follows best practices, DRY, and clear error handling.
- ✅ **Mongoose Models**: Thought and User models used for all DB operations.
- ✅ **Validation**: Backend validates message length, unique email, password length, and returns clear errors.
- ✅ **Error Handling**: All routes return proper status codes and error messages.
- ✅ **Frontend Features**: Update and delete thoughts, signup/login, error handling, and token persistence.
- ✅ **Password Encryption**: Passwords are hashed with bcrypt.
- ✅ **Deployment**: Backend deployed to Render.
- ✅ **Frontend/Backend Sync**: All backend features are reflected in the frontend.
- ✅ **Character Counter**: Live character count and validation in frontend.
- ✅ **Validation Error Messages**: API error messages shown next to relevant fields in frontend.
- ✅ **Token Persistence**: Token stored in localStorage and sent in headers for logged-in state.
- ✅ **Filtering**: Backend supports filtering thoughts by number of hearts.
- ✅ **Loading States**: Frontend shows loading indicators and error messages.

## Technologies Used

- **React** - Frontend framework with hooks (useState, useEffect)
- **react-timeago** - Automatic relative timestamps ("2 minutes ago")
- **Fetch API** - HTTP requests to backend
- **CSS** - Vanilla css for styling in this project
- **Vite** - Build tool and development server


## Project Structure

```
src/
├── api.js            
├── App.jsx            
├── main.jsx            
└── components/
    ├── ThoughtForm.jsx 
    ├── ThoughtList.jsx  
    |── ThoughtCard.jsx 
    ├── LoginForm.jsx 
    └── SignupForm.jsx

└── styles/
├── authForm.css   
|── index.css        
├── ThoughtForm.css           
├── ThoughtList.css          
├── ThoughtCard.css           
```

## Key Implementation Details

### Validation Logic

- Minimum 5 characters, maximum 140 characters (validated both in frontend and backend)
- Real-time validation with visual feedback in frontend
- Backend returns error messages for invalid input (shown in frontend)
- Submit button disabled only when typing invalid length (not when empty)
- Trim whitespace before submission (     hey) becomes (hey)

### State Management

- Global state in App.jsx for thoughts, loading, error, and user authentication
- Local state in ThoughtCard for like spam prevention
- Functional setState to avoid race conditions
- User state synced with localStorage and backend token

### API Error Handling

- Centralized error handling in `handleResponse` helper
- User-friendly error messages from backend shown in frontend
- Console logging for debugging
- Handles authentication errors (e.g. invalid token, expired session)

### Accessibility

- ARIA labels on interactive elements
- aria-live regions for dynamic content updates
- Semantic HTML structure
- Error messages and validation feedback are accessible

---
Built with ❤️ as part of Technigo Bootcamp
