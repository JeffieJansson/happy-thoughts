const API_URL = 'https://ht-api-ij7j.onrender.com/thoughts'

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

export async function editThought(thoughtId, newMessage) {
  const res = await fetch(`${API_URL}/${thoughtId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: newMessage }),
  })
  return handleResponse(res)
}

export async function likeThought(thoughtId) {
  const res = await fetch(`${API_URL}/${thoughtId}/like`, { method: 'PATCH' }) 
  return handleResponse(res)
}

export async function deleteThought(thoughtId) { 
  const res = await fetch(`${API_URL}/${thoughtId}`, { method: 'DELETE' })
  return handleResponse(res)
}

