import React from 'react'
import type { RecommendedRestaurant } from '../lib/claude'

interface RestaurantCardProps {
  restaurant: RecommendedRestaurant
  onClick?: () => void
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '20px',
        padding: '18px 20px',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        marginBottom: '12px',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        backgroundColor: 'var(--purple)',
        color: 'white',
        borderRadius: '999px',
        padding: '4px 10px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.03em',
      }}>
        {restaurant.match_percentage}%
      </div>

      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '22px',
        fontWeight: 600,
        color: 'var(--navy)',
        marginBottom: '6px',
        paddingRight: '60px',
        lineHeight: 1.2,
      }}>
        {restaurant.name}
      </h3>

      <p style={{
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--secondary)',
        marginBottom: '10px',
      }}>
        {restaurant.neighborhood} · {restaurant.cuisine} · {restaurant.price}
      </p>

      <p style={{
        fontSize: '14px',
        color: 'var(--navy)',
        marginBottom: '14px',
        lineHeight: 1.5,
      }}>
        {restaurant.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {restaurant.vibe_tags.map(tag => (
          <span key={tag} style={{
            border: '1px solid rgba(83,74,183,0.35)',
            borderRadius: '999px',
            padding: '4px 12px',
            fontSize: '12px',
            color: 'var(--purple)',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
