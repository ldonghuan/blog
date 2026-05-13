import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Cpu, Bitcoin, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Home.css'
import postsData from '../data/posts.json'

// Helper to map string icon names to Lucide components
const iconMap = {
  Cpu,
  Bitcoin,
  Activity
}

const ArticleCard = ({ title, summary, category, date, iconName, path }) => {
  const Icon = iconMap[iconName] || Activity
  
  return (
    <motion.div 
      className="article-card glass-panel"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="card-header">
        <span className="category-badge"><Icon size={14} /> {category}</span>
        <span className="date">{date}</span>
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-summary">{summary}</p>
      <Link to={path} className="read-more">
        阅读深度解析 <ArrowRight size={16} />
      </Link>
    </motion.div>
  )
}

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section glass-panel">
        <div className="hero-bg" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/hero_bg.png')` }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1 
            className="hero-title glow-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            探索未来边界 <br/> AI 与 Web3 的奇点
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            深入剖析大语言模型、智能体前沿，以及加密货币与去中心化网络的激荡交汇。
          </motion.p>
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/ai" className="btn btn-primary neon-border">探索 AI 前沿</Link>
            <Link to="/crypto" className="btn btn-secondary glass-panel">研究 Web3 动向</Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="latest-articles">
        <h2 className="section-title glow-text">最新情报 <span className="blinking-cursor">_</span></h2>
        
        <div className="articles-grid">
          {postsData.map((post) => (
            <ArticleCard 
              key={post.id}
              title={post.title}
              summary={post.summary}
              category={post.category}
              date={post.date}
              iconName={post.icon}
              path={`/post/${post.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
