import React, { useState } from 'react'
import { saveVisit } from '../lib/supabase'

interface LogVisitModalProps {
  onClose: () => void
  onSaved: () => void
}

const VIBE_TAGS = [
  'cozy', 'loud', 'romantic', 'great for groups', 'date night',
  'special occasion', 'quick bite', 'late night', 'outdoor', 'hidden gem',
]

const PRICES = ['$', '$$', '$$$', '$$$$']

export default function LogVisitModal({ onClose, onSaved }: LogVisitModalProps) {
  const [name, setName] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [stars, setStars] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [price, setPrice] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleSave = async () => {
    if (!name.trim()) {
      setError('restaurant name is required')
      return
    }
    setSaving(true)
    setError('')
    try {
      await saveVisit({ name, neighborhood, cuisine, stars, price, vibe_tags: selectedTags, notes })
      onSaved()
    } catch {
      setError('failed to save. check your supabase connection.')
      setSaving(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--bg)',
    border: '1px solid rgba(26,26,46,0.12)',
    borderRadius: '12px',
    padding: '14px 16px',
    fontSize: '15px',
    color: 'var(--navy)',
    outline: 'none',
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(26,26,46,0.6)',
      backdropFilter: 'blur(6px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'flex-end',
      padding: '0',
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        backgroundColor: '#EDE7DF',
        borderRadius: '24px 24px 0 0',
        padding: '24px 20px 40px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        <div style={{
          width: '36px',
          height: '4px',
          backgroundColor: 'rgba(26,26,46,0.15)',
          borderRadius: '2px',
          margin: '0 auto 24px',
        }} />

        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '26px',
          fontWeight: 600,
          color: 'var(--navy)',
          marginBottom: '24px',
        }}>
          log a visit
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            style={inputStyle}
            placeholder="restaurant name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="neighborhood"
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="cuisine type"
            value={cuisine}
            onChange={e => setCuisine(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--navy)',
            marginBottom: '12px',
          }}>rating</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onMouseEnter={() => setHoveredStar(n)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setStars(n)}
                style={{
                  color: n <= (hoveredStar || stars) ? 'var(--purple)' : 'rgba(83,74,183,0.2)',
                  fontSize: '28px',
                  lineHeight: 1,
                  transition: 'color 0.1s ease',
                }}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--navy)',
            marginBottom: '12px',
          }}>price</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {PRICES.map(p => (
              <button
                key={p}
                onClick={() => setPrice(p)}
                style={{
                  borderRadius: '999px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: price === p ? 'none' : '1.5px solid rgba(83,74,183,0.4)',
                  backgroundColor: price === p ? 'var(--purple)' : 'transparent',
                  color: price === p ? 'white' : 'var(--purple)',
                  transition: 'all 0.15s ease',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--navy)',
            marginBottom: '12px',
          }}>vibe tags</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {VIBE_TAGS.map(tag => {
              const selected = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    borderRadius: '999px',
                    padding: '7px 14px',
                    fontSize: '13px',
                    fontWeight: 500,
                    border: selected ? 'none' : '1.5px solid rgba(83,74,183,0.35)',
                    backgroundColor: selected ? 'var(--purple)' : 'transparent',
                    color: selected ? 'white' : 'var(--purple)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="what did you order? any tips?"
          rows={3}
          style={{
            ...inputStyle,
            display: 'block',
            marginBottom: '24px',
          }}
        />

        {error && (
          <p style={{ color: '#c0392b', fontSize: '13px', marginBottom: '12px' }}>{error}</p>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            width: '100%',
            backgroundColor: 'var(--navy)',
            color: 'white',
            borderRadius: '999px',
            padding: '16px',
            fontSize: '15px',
            fontWeight: 600,
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? 'saving...' : 'save visit'}
        </button>
      </div>
    </div>
  )
}
