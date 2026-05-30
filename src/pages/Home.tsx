import React from 'react'

interface HomeProps {
  onNavigate: (tab: 'solo' | 'group') => void
}

const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z" />
  </svg>
)

const PeopleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3" />
    <circle cx="17" cy="7" r="3" />
    <path d="M2 20c0-3 3-5 7-5s7 2 7 5" />
    <path d="M14 15.5c1-.3 2-.5 3-.5 3.5 0 6 2 6 5" />
  </svg>
)

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 40px 60px' }}>
      {/* Hero */}
      <div style={{ marginBottom: '72px' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '72px',
          fontWeight: 700,
          color: 'var(--navy)',
          lineHeight: 1.0,
          marginBottom: '4px',
        }}>
          the table,
        </h1>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '72px',
          fontWeight: 600,
          fontStyle: 'italic',
          color: 'var(--purple)',
          lineHeight: 1.0,
          marginBottom: '28px',
        }}>
          curated.
        </h1>
        <p style={{
          fontSize: '18px',
          color: 'var(--secondary)',
          lineHeight: 1.7,
          maxWidth: '480px',
        }}>
          tell us tonight's mood. we'll pick where you eat — alone or with the group. the more you rate, the smarter we get.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        maxWidth: '800px',
      }}>
        {/* Solo card */}
        <div
          onClick={() => onNavigate('solo')}
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '20px',
            padding: '32px 28px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
            ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(26,26,46,0.08)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.transform = 'none'
            ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--secondary)',
          }}>
            <SparkleIcon />
          </div>
          <p style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
            marginBottom: '12px',
          }}>
            solo
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--navy)',
            marginBottom: '10px',
            lineHeight: 1.2,
          }}>
            just me, tonight
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'var(--secondary)',
            lineHeight: 1.6,
          }}>
            type a vibe. get 3–5 spots tuned to your taste.
          </p>
        </div>

        {/* Group card */}
        <div
          onClick={() => onNavigate('group')}
          style={{
            backgroundColor: 'var(--purple)',
            borderRadius: '20px',
            padding: '32px 28px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
            ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(83,74,183,0.25)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.transform = 'none'
            ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.9)',
          }}>
            <PeopleIcon />
          </div>
          <p style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '12px',
          }}>
            group
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '28px',
            fontWeight: 600,
            color: 'white',
            marginBottom: '10px',
            lineHeight: 1.2,
          }}>
            gather the girls
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6,
          }}>
            share a link. everyone adds their preference, we find the overlap.
          </p>
        </div>
      </div>
    </div>
  )
}
