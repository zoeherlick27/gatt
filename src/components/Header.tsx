import React from 'react'

interface HeaderProps {
  pageLabel?: string
}

export default function Header({ pageLabel }: HeaderProps) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 20px 16px',
      borderBottom: '1px solid rgba(26,26,46,0.1)',
      backgroundColor: 'var(--bg)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <span style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '22px',
        fontWeight: 700,
        color: 'var(--purple)',
        letterSpacing: '-0.5px',
      }}>
        gatt.
      </span>
      {pageLabel && (
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--secondary)',
        }}>
          {pageLabel}
        </span>
      )}
    </header>
  )
}
