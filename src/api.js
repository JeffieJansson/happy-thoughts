const API_URL = 'https://happy-thoughts-api-4ful.onrender.com/thoughts'

// handleResponse - Helper function to handle API responses: throws an error on failure, returns JSON on success.
async function handleResponse(response) { 
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }
  return response.json()
}

// fetchThoughts retrieves an array of thought objects with _id, message, hearts, and createdAt
export async function fetchThoughts() { 
  const res = await fetch(API_URL) 
  return handleResponse(res)
}

// postThought makes a POST request to create a new happy thought.
// The backend will automatically add _id, hearts (0), and createdAt timestamp.
export async function postThought(message) { 
  const res = await fetch(API_URL, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  return handleResponse(res)
}

 // likeThought makes a POST request to the like endpoint.
// The backend increments the hearts counter and returns the updated thought.
export async function likeThought(thoughtId) {
  const res = await fetch(`${API_URL}/${thoughtId}/like`, { method: 'POST' }) // POSTs to /:id/like.
  return handleResponse(res)
}