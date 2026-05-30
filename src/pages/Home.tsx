import React from 'react'
import Header from '../components/Header'

interface HomeProps {
  onNavigate: (tab: 'solo' | 'group') => void
}

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z" />
  </svg>
)

const PeopleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3" />
    <circle cx="17" cy="7" r="3" />
    <path d="M2 20c0-3 3-5 7-5s7 2 7 5" />
    <path d="M14 15.5c1-.3 2-.5 3-.5 3.5 0 6 2 6 5" />
  </svg>
)

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div style={{ paddingBottom: '90px' }}>
      <Header />

      <div style={{ padding: '32px 20px 24px' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '48px',
          fontWeight: 700,
          color: 'var(--navy)',
          lineHeight: 1.05,
          marginBottom: '2px',
        }}>
          the table,
        </h1>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '48px',
          fontWeight: 600,
          fontStyle: 'italic',
          color: 'var(--purple)',
          lineHeight: 1.05,
          marginBottom: '20px',
        }}>
          curated.
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--secondary)',
          lineHeight: 1.7,
          maxWidth: '320px',
        }}>
          tell us tonight's mood. we'll pick where you eat — alone or with the group. the more you rate, the smarter we get.
        </p>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Solo card */}
        <div
          onClick={() => onNavigate('solo')}
          style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '20px',
            padding: '22px 20px',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
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
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
            marginBottom: '8px',
          }}>
            solo
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--navy)',
            marginBottom: '8px',
            lineHeight: 1.2,
          }}>
            just me, tonight
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--secondary)',
            lineHeight: 1.5,
            maxWidth: '240px',
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
            padding: '22px 20px',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
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
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '8px',
          }}>
            group
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '24px',
            fontWeight: 600,
            color: 'white',
            marginBottom: '8px',
            lineHeight: 1.2,
          }}>
            gather the girls
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.5,
            maxWidth: '240px',
          }}>
            share a link. everyone adds their preference, we find the overlap.
          </p>
        </div>
      </div>
    </div>
  )
}
