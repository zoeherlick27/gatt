import React, { useState } from 'react'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Solo from './pages/Solo'
import Group from './pages/Group'
import Taste from './pages/Taste'

type Tab = 'home' | 'solo' | 'group' | 'taste'

export default function App() {
  const [tab, setTab] = useState<Tab>('home')

  const renderPage = () => {
    switch (tab) {
      case 'home': return <Home onNavigate={(t) => setTab(t)} />
      case 'solo': return <Solo />
      case 'group': return <Group />
      case 'taste': return <Taste />
    }
  }

  return (
    <>
      {renderPage()}
      <BottomNav active={tab} onChange={setTab} />
    </>
  )
}
