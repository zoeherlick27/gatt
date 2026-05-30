import React from 'react'

type Tab = 'home' | 'solo' | 'group' | 'taste'

interface HeaderProps {
  active: Tab
  onChange: (tab: Tab) => void
}

const navItems: { id: Tab; label: string }[] = [
  { id: 'home', label: 'home' },
  { id: 'solo', label: 'solo' },
  { id: 'group', label: 'group' },
  { id: 'taste', label: 'taste' },
]

export default function Header({ active, onChange }: HeaderProps) {
  return (
    <header style={{
      borderBottom: '1px solid rgba(26,26,46,0.1)',
      backgroundColor: 'var(--bg)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
      }}>
        <button
          onClick={() => onChange('home')}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '30px',
            fontWeight: 700,
            color: 'var(--purple)',
            letterSpacing: '-0.5px',
            cursor: 'pointer',
          }}
        >
          gatt.
        </button>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onChange(id)}
              style={{
                fontSize: '14px',
                fontWeight: active === id ? 600 : 400,
                color: active === id ? 'var(--purple)' : 'var(--secondary)',
                letterSpacing: '0.03em',
                transition: 'color 0.15s ease',
                borderBottom: active === id ? '2px solid var(--purple)' : '2px solid transparent',
                paddingBottom: '2px',
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
