// Minimal API wrapper for happy-thoughts
const API_URL = 'https://happy-thoughts-api-4ful.onrender.com/thoughts'

// Helper function to handle API responses and errors
async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }
  return response.json()
}

export async function fetchThoughts() {
  const res = await fetch(API_URL)
  return handleResponse(res)
}

export async function postThought(message) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  return handleResponse(res)
}

export async function likeThought(thoughtId) {
  const res = await fetch(`${API_URL}/${thoughtId}/like`, { method: 'POST' })
  return handleResponse(res)
}