const API_URL = 'https://happy-thoughts-api-4ful.onrender.com/thoughts'

/**

 * This function checks if the HTTP response was successful (status 200-299).
 * If successful, it parses and returns the JSON data.
 * If failed, it throws an error with the status code.
 * 
 * @param {Response} response - The fetch API response object
 * @returns {Promise<Object>} The parsed JSON data from the response
 * @throws {Error} If the response status is not OK (outside 200-299 range)
 */
async function handleResponse(response) { 
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }
  return response.json()
}

/**
@returns {Promise<Array>} Array of thought objects with _id, message, hearts, and createdAt
 */
export async function fetchThoughts() { // GET all thoughts
  const res = await fetch(API_URL) // GET is default method
  return handleResponse(res) // Parse and return JSON data
}

/**
 * Posts a new thought to the API
 * 
 * Makes a POST request to create a new happy thought.
 * The backend will automatically add _id, hearts (0), and createdAt timestamp.
 * 
 * @param {string} message - The thought message (must be 5-140 characters)
 * @returns {Promise<Object>} The newly created thought object from the server
 */
export async function postThought(message) { // POST a new thought
  const res = await fetch(API_URL, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  return handleResponse(res)
}

/**
 * Increments the like count (hearts) for a specific thought
 * 
 * Makes a POST request to the like endpoint.
 * The backend increments the hearts counter and returns the updated thought.
 * 
 * @param {string} thoughtId - The unique MongoDB _id of the thought to like
 * @returns {Promise<Object>} The updated thought object with incremented hearts
 */
export async function likeThought(thoughtId) { // POST like to a specific thought
  const res = await fetch(`${API_URL}/${thoughtId}/like`, { method: 'POST' }) //  fetch like endpoint 
  return handleResponse(res)
}