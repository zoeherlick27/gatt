import React from 'react'

type Tab = 'home' | 'solo' | 'group' | 'taste'

interface BottomNavProps {
  active: Tab
  onChange: (tab: Tab) => void
}

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const SoloIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)

const GroupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="8" r="3" />
    <path d="M2 20c0-3 3-5.5 7-5.5s7 2.5 7 5.5" />
    <path d="M14 14.5c1-.3 2-.5 3-.5 4 0 7 2.5 7 5.5" />
  </svg>
)

const TasteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const tabs: { id: Tab; label: string; Icon: React.FC }[] = [
  { id: 'home', label: 'home', Icon: HomeIcon },
  { id: 'solo', label: 'solo', Icon: SoloIcon },
  { id: 'group', label: 'group', Icon: GroupIcon },
  { id: 'taste', label: 'taste', Icon: TasteIcon },
]

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '430px',
      backgroundColor: 'var(--bg)',
      borderTop: '1px solid rgba(26,26,46,0.1)',
      display: 'flex',
      paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      zIndex: 100,
    }}>
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '12px 0 8px',
              color: isActive ? 'var(--purple)' : 'var(--secondary)',
              transition: 'color 0.15s ease',
            }}
          >
            <Icon />
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? 600 : 400,
              letterSpacing: '0.05em',
            }}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
