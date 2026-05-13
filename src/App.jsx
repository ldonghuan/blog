import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Article from './pages/Article'

// Placeholder for other pages
const Placeholder = ({ title }) => (
  <div style={{ padding: '4rem 0', textAlign: 'center' }}>
    <h1 className="glow-text">{title}</h1>
    <p style={{ color: 'var(--text-secondary)', margin: '1rem auto', maxWidth: '600px' }}>
      分类文章列表建设中... 目前您可以在首页查看最新发布的文章。
    </p>
  </div>
)

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Article />} />
          <Route path="/ai" element={<Placeholder title="AI & 智能演进" />} />
          <Route path="/crypto" element={<Placeholder title="数字货币 & Web3" />} />
          <Route path="/convergence" element={<Placeholder title="科技交汇点" />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default App
