import React, { useState } from 'react'
import Header from '../components/Header'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantDetail from '../components/RestaurantDetail'
import { getRecommendations, type RecommendedRestaurant } from '../lib/claude'

const EXAMPLE_VIBES = [
  'cozy, not too loud, asian',
  'first date, walkable from l train',
  'celebrating, splurge worthy',
  'rainy night, comfort food',
]

export default function Solo() {
  const [vibe, setVibe] = useState('')
  const [results, setResults] = useState<RecommendedRestaurant[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<RecommendedRestaurant | null>(null)

  const handleFind = async () => {
    if (!vibe.trim()) return
    setLoading(true)
    setError('')
    try {
      const recs = await getRecommendations(vibe)
      setResults(recs)
    } catch (e) {
      setError('something went wrong. check your api key.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleFind()
  }

  if (selected) {
    return (
      <>
        <RestaurantDetail
          restaurant={selected}
          context="solo"
          onBack={() => setSelected(null)}
        />
      </>
    )
  }

  return (
    <div style={{ paddingBottom: '90px' }}>
      <Header pageLabel="solo" />

      <div style={{ padding: '28px 20px 0' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--navy)',
          lineHeight: 1.15,
          marginBottom: '10px',
        }}>
          what's the vibe tonight?
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--secondary)',
          marginBottom: '24px',
          lineHeight: 1.6,
        }}>
          describe your mood in your own words.
        </p>

        <div style={{
          backgroundColor: 'var(--card-bg)',
          borderRadius: '20px',
          padding: '16px 16px 14px',
          marginBottom: '20px',
        }}>
          <textarea
            value={vibe}
            onChange={e => setVibe(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="cozy, candlelit, near the L train..."
            rows={4}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: 'var(--navy)',
              lineHeight: 1.6,
              marginBottom: '12px',
            }}
          />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
            }}>
              tonight, nyc
            </span>
            <button
              onClick={handleFind}
              disabled={loading || !vibe.trim()}
              style={{
                backgroundColor: 'var(--purple)',
                color: 'white',
                borderRadius: '999px',
                padding: '9px 18px',
                fontSize: '13px',
                fontWeight: 600,
                opacity: loading || !vibe.trim() ? 0.5 : 1,
                transition: 'opacity 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              {loading ? 'finding...' : '✦ find spots'}
            </button>
          </div>
        </div>

        {!results && (
          <>
            <p style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              marginBottom: '10px',
            }}>
              try
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {EXAMPLE_VIBES.map(eg => (
                <button
                  key={eg}
                  onClick={() => setVibe(eg)}
                  style={{
                    borderRadius: '999px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    border: '1.5px solid rgba(26,26,46,0.15)',
                    color: 'var(--navy)',
                    backgroundColor: 'transparent',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {eg}
                </button>
              ))}
            </div>
          </>
        )}

        {error && (
          <p style={{ color: '#c0392b', fontSize: '13px', marginTop: '12px' }}>{error}</p>
        )}

        {results && (
          <div style={{ marginTop: '8px' }}>
            <p style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              marginBottom: '16px',
            }}>
              {results.length} matches
            </p>
            {results.map((r, i) => (
              <RestaurantCard
                key={i}
                restaurant={r}
                onClick={() => setSelected(r)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
