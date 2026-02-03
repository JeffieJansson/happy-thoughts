export const API_URL = 'https://ht-api-ij7j.onrender.com'

async function handleResponse(response) { 
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }
  return response.json()
}

//fetch thoughts
export async function fetchThoughts() { 
  const res = await fetch(`${API_URL}/thoughts`)
  return handleResponse(res)
}

//post thought
export async function postThought(message, token) { 
  const res = await fetch(`${API_URL}/thoughts`, { 
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({ message }),
  })
  return handleResponse(res)
}

//edit thought
export async function editThought(thoughtId, newMessage, token) {
  const res = await fetch(`${API_URL}/thoughts/${thoughtId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
},
    body: JSON.stringify({ message: newMessage }),
  })
  return handleResponse(res)
}

//like thought
export async function likeThought(thoughtId) {
  const res = await fetch(`${API_URL}/thoughts/${thoughtId}/like`, { method: 'PATCH' })
  return handleResponse(res)
}

//delete thought
export async function deleteThought(thoughtId, token) { 
  const res = await fetch(`${API_URL}/thoughts/${thoughtId}`, { 
    method: 'DELETE',
    headers: {
      Authorization: token
    }
  })
  return handleResponse(res)
}

