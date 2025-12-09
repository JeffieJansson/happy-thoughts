// Minimal API wrapper for happy-thoughts
const API_URL = 'https://happy-thoughts-api-4ful.onrender.com/thoughts'

export async function fetchThoughts() {
  const res = await fetch(API_URL)
  if (!res.ok) {
    throw new Error(`Failed to fetch thoughts: ${res.status}`)
  }
  return res.json()
}

export async function postThought(message) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`)
  }
  return res.json()
}

export async function likeThought(thoughtId) {
  const res = await fetch(`${API_URL}/${thoughtId}/like`, { method: 'POST' })
  if (!res.ok) {
    throw new Error(`Like request failed with status ${res.status}`)
  }
  return res.json()
}