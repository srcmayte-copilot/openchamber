const API_BASE = '/api'

export async function fetchSettings() {
  const response = await fetch(`${API_BASE}/settings`)
  if (!response.ok) throw new Error('Failed to fetch settings')
  return response.json()
}

export async function updateSetting(key: string, value: any) {
  const response = await fetch(`${API_BASE}/settings/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value })
  })
  if (!response.ok) throw new Error('Failed to update setting')
  return response.json()
}

export async function getHealth() {
  const response = await fetch(`${API_BASE}/health`)
  if (!response.ok) throw new Error('Failed to fetch health')
  return response.json()
}
