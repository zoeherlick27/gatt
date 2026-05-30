import React, { useState } from 'react'
import Header from '../components/Header'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantDetail from '../components/RestaurantDetail'
import { getGroupOverlap, type RecommendedRestaurant } from '../lib/claude'

type GroupState = 'start' | 'session' | 'results'

interface TableEntry {
  name: string
  vibe: string
}

const generateCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join(' ')
}

export default function Group() {
  const [state, setState] = useState<GroupState>('start')
  const [code] = useState(generateCode)
  const [joinCode, setJoinCode] = useState('')
  const [myVibe, setMyVibe] = useState('')
  const [members, setMembers] = useState<TableEntry[]>([])
  const [newName, setNewName] = useState('')
  const [newVibe, setNewVibe] = useState('')
  const [results, setResults] = useState<RecommendedRestaurant[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<RecommendedRestaurant | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`gatt.app/g/${code.replace(/\s/g, '')}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addMember = () => {
    if (!newName.trim() || !newVibe.trim()) return
    setMembers(prev => [...prev, { name: newName.trim(), vibe: newVibe.trim() }])
    setNewName('')
    setNewVibe('')
  }

  const handleFindOverlap = async () => {
    const allVibes = [myVibe, ...members.map(m => m.vibe)].filter(Boolean)
    if (allVibes.length < 1) return
    setLoading(true)
    setError('')
    try {
      const recs = await getGroupOverlap(allVibes)
      setResults(recs)
      setState('results')
    } catch {
      setError('something went wrong. check your api key.')
    } finally {
      setLoading(false)
    }
  }

  const totalPeople = 1 + members.length

  if (selected) {
    return (
      <RestaurantDetail
        restaurant={selected}
        context="group"
        onBack={() => setSelected(null)}
      />
    )
  }

  if (state === 'results' && results) {
    return (
      <div style={{ paddingBottom: '90px' }}>
        <Header pageLabel="group" />
        <div style={{ padding: '28px 20px 0' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
            marginBottom: '8px',
          }}>
            group match · {totalPeople} {totalPeople === 1 ? 'person' : 'people'}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--navy)',
            marginBottom: '24px',
            lineHeight: 1.15,
          }}>
            the overlap
          </h1>
          {results.map((r, i) => (
            <RestaurantCard key={i} restaurant={r} onClick={() => setSelected(r)} />
          ))}
          <button
            onClick={() => { setState('session'); setResults(null) }}
            style={{
              width: '100%',
              marginTop: '8px',
              padding: '14px',
              borderRadius: '999px',
              border: '1.5px solid rgba(26,26,46,0.2)',
              fontSize: '14px',
              color: 'var(--navy)',
              backgroundColor: 'transparent',
            }}
          >
            back to table
          </button>
        </div>
      </div>
    )
  }

  if (state === 'session') {
    return (
      <div style={{ paddingBottom: '90px' }}>
        <Header pageLabel="group" />
        <div style={{ padding: '28px 20px 0' }}>
          <div style={{
            backgroundColor: 'var(--purple)',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '24px',
          }}>
            <p style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '8px',
            }}>
              share with the table
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                color: 'white',
                fontWeight: 600,
              }}>
                gatt.app/g/{code.replace(/\s/g, '')}
              </span>
              <button
                onClick={handleCopy}
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  padding: '4px',
                }}
              >
                {copied ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <p style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--secondary)',
            marginBottom: '16px',
          }}>
            👥 at the table · {totalPeople}
          </p>

          {/* Your vibe card */}
          <div style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '12px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--purple)',
            }} />
            <p style={{ fontSize: '13px', color: 'var(--secondary)', marginBottom: '4px', fontWeight: 500 }}>you</p>
            {myVibe ? (
              <p style={{ fontSize: '15px', color: 'var(--navy)', fontStyle: 'italic' }}>
                "{myVibe}"
              </p>
            ) : (
              <input
                placeholder="describe your vibe..."
                value={myVibe}
                onChange={e => setMyVibe(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  color: 'var(--navy)',
                }}
              />
            )}
          </div>

          {/* Members vibes */}
          {members.map((m, i) => (
            <div key={i} style={{
              backgroundColor: 'var(--card-bg)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '12px',
            }}>
              <p style={{ fontSize: '13px', color: 'var(--secondary)', marginBottom: '4px', fontWeight: 500 }}>{m.name}</p>
              <p style={{ fontSize: '15px', color: 'var(--navy)', fontStyle: 'italic' }}>"{m.vibe}"</p>
            </div>
          ))}

          {/* Add member */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '16px',
          }}>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="name"
              style={{
                width: '100%',
                backgroundColor: 'var(--card-bg)',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 16px',
                fontSize: '15px',
                outline: 'none',
              }}
            />
            <input
              value={newVibe}
              onChange={e => setNewVibe(e.target.value)}
              placeholder="their vibe — loud and fun, no sushi..."
              style={{
                width: '100%',
                backgroundColor: 'var(--card-bg)',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 16px',
                fontSize: '15px',
                outline: 'none',
              }}
            />
            <button
              onClick={addMember}
              disabled={!newName.trim() || !newVibe.trim()}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '999px',
                border: '1.5px solid rgba(83,74,183,0.4)',
                fontSize: '14px',
                color: 'var(--purple)',
                backgroundColor: 'transparent',
                fontWeight: 600,
                opacity: (!newName.trim() || !newVibe.trim()) ? 0.5 : 1,
              }}
            >
              + add to table
            </button>
          </div>

          {error && (
            <p style={{ color: '#c0392b', fontSize: '13px', marginBottom: '12px' }}>{error}</p>
          )}

          <button
            onClick={handleFindOverlap}
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: 'var(--navy)',
              color: 'white',
              borderRadius: '999px',
              padding: '16px',
              fontSize: '15px',
              fontWeight: 600,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'finding the overlap...' : 'find the overlap'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingBottom: '90px' }}>
      <Header pageLabel="group" />
      <div style={{ padding: '28px 20px 0' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--navy)',
          lineHeight: 1.15,
          marginBottom: '10px',
        }}>
          gather the girls
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--secondary)',
          marginBottom: '32px',
          lineHeight: 1.6,
        }}>
          share a link. everyone adds their preference, we find the overlap.
        </p>

        <button
          onClick={() => setState('session')}
          style={{
            width: '100%',
            backgroundColor: 'var(--purple)',
            color: 'white',
            borderRadius: '999px',
            padding: '16px',
            fontSize: '15px',
            fontWeight: 600,
            marginBottom: '28px',
          }}
        >
          start a table
        </button>

        <p style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--secondary)',
          textAlign: 'center',
          marginBottom: '16px',
        }}>
          or join with a code
        </p>

        <input
          value={joinCode}
          onChange={e => setJoinCode(e.target.value.toUpperCase())}
          placeholder="A  B  C  D"
          style={{
            width: '100%',
            backgroundColor: 'var(--card-bg)',
            border: 'none',
            borderRadius: '16px',
            padding: '18px',
            fontSize: '22px',
            fontWeight: 600,
            letterSpacing: '0.3em',
            textAlign: 'center',
            color: 'var(--navy)',
            outline: 'none',
          }}
        />
      </div>
    </div>
  )
}
