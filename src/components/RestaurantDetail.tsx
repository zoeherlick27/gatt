import React from 'react'
import type { RecommendedRestaurant } from '../lib/claude'

interface RestaurantDetailProps {
  restaurant: RecommendedRestaurant
  context: 'solo' | 'group'
  onBack: () => void
}

const infoTiles = (r: RecommendedRestaurant) => [
  { label: 'NEIGHBORHOOD', value: r.neighborhood, icon: '📍' },
  { label: 'BOROUGH', value: r.borough || 'Manhattan', icon: '🗺' },
  { label: 'CUISINE', value: r.cuisine, icon: '🍽' },
  { label: 'PRICE', value: r.price, icon: '💰' },
  { label: 'NOISE', value: r.noise || 'moderate', icon: '🔊' },
  { label: 'GOOD FOR', value: r.good_for || 'any occasion', icon: '✨' },
]

export default function RestaurantDetail({ restaurant, context, onBack }: RestaurantDetailProps) {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 40px 60px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '40px',
      }}>
        <button onClick={onBack} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--purple)',
          fontSize: '14px',
          fontWeight: 500,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          back
        </button>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--secondary)',
        }}>
          {context}
        </span>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '22px',
          fontWeight: 700,
          color: 'var(--purple)',
        }}>
          gatt.
        </span>
      </div>

      <div>
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--secondary)',
          marginBottom: '8px',
        }}>
          {restaurant.neighborhood}
        </p>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '48px',
          fontWeight: 600,
          color: 'var(--navy)',
          lineHeight: 1.15,
          marginBottom: '12px',
        }}>
          {restaurant.name}
        </h1>

        <p style={{
          fontSize: '15px',
          color: 'var(--secondary)',
          marginBottom: '28px',
          lineHeight: 1.5,
        }}>
          {restaurant.description}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '28px',
        }}>
          {infoTiles(restaurant).map(tile => (
            <div key={tile.label} style={{
              backgroundColor: 'var(--white)',
              borderRadius: '16px',
              padding: '14px 16px',
            }}>
              <p style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}>
                <span>{tile.icon}</span> {tile.label}
              </p>
              <p style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--navy)',
              }}>
                {tile.value}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '28px' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--navy)',
            marginBottom: '12px',
          }}>
            vibes
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {restaurant.vibe_tags.map(tag => (
              <span key={tag} style={{
                backgroundColor: 'rgba(83,74,183,0.1)',
                color: 'var(--purple)',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          border: '1.5px dashed rgba(83,74,183,0.3)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--secondary)',
        }}>
          <div style={{ display: 'flex', gap: '16px', fontSize: '22px' }}>
            <span>🕐</span>
            <span>📷</span>
            <span>🗺</span>
          </div>
          <p style={{
            fontSize: '13px',
            textAlign: 'center',
            lineHeight: 1.5,
          }}>
            live hours, photos, and map — coming soon.
          </p>
        </div>
      </div>
    </div>
  )
}
