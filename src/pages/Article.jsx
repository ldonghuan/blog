import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import postsData from '../data/posts.json'
import './Article.css'

const Article = () => {
  const { id } = useParams()
  const [content, setContent] = useState('')
  const [metadata, setMetadata] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the post metadata from our generated index
    const postMeta = postsData.find(p => p.id === id)
    if (postMeta) {
      setMetadata(postMeta)
    }

    // Fetch the raw markdown file
    fetch(`/posts/${id}.md`)
      .then(response => {
        if (!response.ok) throw new Error('Post not found')
        return response.text()
      })
      .then(text => {
        // Strip the frontmatter for display
        const contentWithoutFrontmatter = text.replace(/---[\s\S]*?---/, '')
        setContent(contentWithoutFrontmatter)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setContent('# 404 - 文章未找到\n\n抱歉，您访问的文章不存在。')
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="article-loading glow-text">加载中...</div>

  return (
    <article className="article-container glass-panel">
      <Link to="/" className="back-link">
        <ArrowLeft size={16} /> 返回首页
      </Link>
      
      {metadata && (
        <header className="article-header">
          <h1 className="article-title">{metadata.title}</h1>
          <div className="article-meta">
            <span className="meta-item"><Calendar size={14} /> {metadata.date}</span>
            <span className="meta-item"><Tag size={14} /> {metadata.category}</span>
          </div>
        </header>
      )}

      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default Article
