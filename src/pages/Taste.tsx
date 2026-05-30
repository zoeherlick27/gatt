import React, { useState, useEffect } from 'react'
import LogVisitModal from '../components/LogVisitModal'
import { getVisits, type Restaurant } from '../lib/supabase'

export default function Taste() {
  const [showModal, setShowModal] = useState(false)
  const [visits, setVisits] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getVisits()
      setVisits(data)
    } catch {
      // supabase not configured yet
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 40px 60px' }}>
        <p style={{
          fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--purple)', marginBottom: '12px',
        }}>
          taste
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: '52px', fontWeight: 700,
          color: 'var(--navy)', marginBottom: '14px', lineHeight: 1.1,
        }}>
          your little black book.
        </h1>
        <p style={{
          fontSize: '17px', color: 'var(--secondary)', marginBottom: '40px',
          lineHeight: 1.6, maxWidth: '440px',
        }}>
          log every place. rate it 1–5, we learn what you love.
        </p>

        <button
          onClick={() => setShowModal(true)}
          style={{
            border: '1.5px dashed rgba(83,74,183,0.45)', borderRadius: '16px',
            padding: '18px 32px', fontSize: '15px', fontWeight: 600,
            color: 'var(--purple)', backgroundColor: 'transparent',
            marginBottom: '40px', cursor: 'pointer',
          }}
        >
          + log a visit
        </button>

        <p style={{
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '20px',
        }}>
          visited
        </p>

        {loading ? (
          <p style={{ color: 'var(--secondary)', fontSize: '15px', padding: '32px 0' }}>loading...</p>
        ) : visits.length === 0 ? (
          <p style={{ color: 'var(--secondary)', fontSize: '15px', padding: '32px 0' }}>
            log your first place to start.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}>
            {visits.map(v => (
              <div key={v.id} style={{
                backgroundColor: 'var(--card-bg)', borderRadius: '20px', padding: '22px 24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: 'var(--navy)' }}>
                    {v.name}
                  </h3>
                  <span style={{ fontSize: '16px', letterSpacing: '1px', color: 'var(--purple)' }}>
                    {'★'.repeat(v.stars)}{'☆'.repeat(5 - v.stars)}
                  </span>
                </div>
                <p style={{
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '12px',
                }}>
                  {[v.neighborhood, v.cuisine, v.price].filter(Boolean).join(' · ')}
                </p>
                {v.vibe_tags?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: v.notes ? '10px' : '0' }}>
                    {v.vibe_tags.map(t => (
                      <span key={t} style={{
                        border: '1px solid rgba(83,74,183,0.3)', borderRadius: '999px',
                        padding: '3px 10px', fontSize: '12px', color: 'var(--purple)',
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {v.notes && (
                  <p style={{ fontSize: '13px', color: 'var(--secondary)', fontStyle: 'italic', marginTop: '8px' }}>
                    {v.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <LogVisitModal
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); load() }}
        />
      )}
    </>
  )
}
