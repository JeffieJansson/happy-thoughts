# Happy Thoughts

A Twitter-inspired positive thoughts sharing app built with React. Users can post happy thoughts (5-140 characters) and like others' thoughts. The app features real-time validation, character counting, and a responsive design.

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

### Core Requirements (7/7)

- ✅ **Responsive Design**: App is fully responsive from 320px to 1600px+ width
- ✅ **Form Functionality**: Text area with submit button that empties form after submission
- ✅ **Clean Code**: Well-structured, commented code following best practices and DRY principles
- ✅ **API Integration**: Posts new thoughts to API on form submission
- ✅ **Thought Listing**: Displays thoughts with newest first, updates after submission
- ✅ **Display Message & Likes**: Shows thought content and like count for each thought
- ✅ **Like Functionality**: Heart button that sends likes and updates count in real-time

### Stretch Goals (3/5 - Minimum 2 Required) 

- ✅ **Character Counter**: Live count of remaining characters, turns red when over 140
- ✅ **Validation Error Messages**: User-friendly error messages for invalid input (empty, too short, too long)
- ✅ **Loading States**: Loading indicators during API calls with error handling
- ❌ Animation for new thoughts - not implemented
- ❌ Keep count av different liked posts + localStorage - not implemented

## Technologies Used

- **React** - Frontend framework with hooks (useState, useEffect)
- **react-timeago** - Automatic relative timestamps ("2 minutes ago")
- **Fetch API** - HTTP requests to backend
- **CSS** - Vanilla css for styling in this project
- **Vite** - Build tool and development server

## Component Architecture

```
App.jsx (Main container)
├── State Management (thoughts, loading, error)
├── API Integration (fetch, post, like)
├── ThoughtForm.jsx (Create new thoughts)
│   ├── Controlled input with validation
│   ├── Character counter
│   └── Error messages
└── ThoughtList.jsx (Display thoughts)
    └── ThoughtCard.jsx (Individual thought)
        ├── Like button with spam prevention
        └── Relative timestamps
```

## Project Structure

```
src/
├── api.js            
├── App.jsx            
├── main.jsx            
└── components/
    ├── ThoughtForm.jsx 
    ├── ThoughtList.jsx  
    └── ThoughtCard.jsx  
└── styles/
├── index.css          
├── ThoughtForm.css           
├── ThoughtList.css          
├── ThoughtCard.css           
```

## Key Implementation Details

### Validation Logic

- Minimum 5 characters, maximum 140 characters
- Real-time validation with visual feedback
- Submit button disabled only when typing invalid length (not when empty)
- Trim whitespace before submission (     hey) becomes (hey)

### State Management

- Global state in App.jsx for thoughts, loading, and error
- Local state in ThoughtCard for like spam prevention
- Functional setState to avoid race conditions

### API Error Handling

- Centralized error handling in `handleResponse` helper
- User-friendly error messages
- Console logging for debugging

### Accessibility

- ARIA labels on interactive elements
- aria-live regions for dynamic content updates
- Semantic HTML structure

---
Built with ❤️ as part of Technigo Bootcamp
