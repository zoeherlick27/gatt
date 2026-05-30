export interface RecommendedRestaurant {
  name: string
  neighborhood: string
  cuisine: string
  price: string
  description: string
  vibe_tags: string[]
  match_percentage: number
  borough?: string
  noise?: string
  good_for?: string
}

export async function getRecommendations(vibe: string): Promise<RecommendedRestaurant[]> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  const prompt = `You are a NYC restaurant expert. A user described their dining vibe as: "${vibe}"

Return exactly 4 real NYC restaurants that match this vibe as a JSON array. Each restaurant must be a real place in NYC.

Return ONLY valid JSON, no markdown, no explanation. Format:
[
  {
    "name": "restaurant name lowercase",
    "neighborhood": "neighborhood name",
    "borough": "Manhattan/Brooklyn/Queens/Bronx/Staten Island",
    "cuisine": "cuisine type",
    "price": "$ or $$ or $$$ or $$$$",
    "description": "one compelling sentence about this place",
    "vibe_tags": ["tag1", "tag2", "tag3"],
    "match_percentage": 92,
    "noise": "quiet/moderate/loud",
    "good_for": "dates/groups/solo/special occasions"
  }
]`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Claude API error: ${err}`)
  }

  const data = await response.json()
  const text = data.content[0].text.trim()
  return JSON.parse(text)
}

export async function getGroupOverlap(vibes: string[]): Promise<RecommendedRestaurant[]> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  const vibeList = vibes.map((v, i) => `Person ${i + 1}: "${v}"`).join('\n')

  const prompt = `You are a NYC restaurant expert. A group of people are trying to find a restaurant that satisfies everyone. Here are their individual vibes:

${vibeList}

Find 4 real NYC restaurants that represent the best overlap between all their preferences.

Return ONLY valid JSON, no markdown, no explanation. Format:
[
  {
    "name": "restaurant name lowercase",
    "neighborhood": "neighborhood name",
    "borough": "Manhattan/Brooklyn/Queens/Bronx/Staten Island",
    "cuisine": "cuisine type",
    "price": "$ or $$ or $$$ or $$$$",
    "description": "one compelling sentence about this place",
    "vibe_tags": ["tag1", "tag2", "tag3"],
    "match_percentage": 92,
    "noise": "quiet/moderate/loud",
    "good_for": "dates/groups/solo/special occasions"
  }
]`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Claude API error: ${err}`)
  }

  const data = await response.json()
  const text = data.content[0].text.trim()
  return JSON.parse(text)
}
