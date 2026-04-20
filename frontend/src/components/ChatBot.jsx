import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function ChatBot({ result }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I\'m PhysioSync AI 🧬 Ask me anything about nutrition, fitness, or your meal!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes chatFadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      @keyframes chatPulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.08); } }
      @keyframes typingDot { 0%,100% { opacity:0.3; } 50% { opacity:1; } }
      @keyframes gradShift { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
      .chat-open { animation: chatFadeUp 0.3s ease forwards; }
      .chat-fab { animation: chatPulse 2s ease-in-out infinite; }
      .chat-fab:hover { transform: scale(1.1) !important; transition: transform 0.2s; }
      .typing-dot-1 { animation: typingDot 1s ease-in-out infinite; }
      .typing-dot-2 { animation: typingDot 1s ease-in-out 0.2s infinite; }
      .typing-dot-3 { animation: typingDot 1s ease-in-out 0.4s infinite; }
      .chat-send:hover { transform: scale(1.05); transition: transform 0.2s; }
      .chat-msg-ai { animation: chatFadeUp 0.3s ease forwards; }
      .chat-msg-user { animation: chatFadeUp 0.3s ease forwards; }
      .grad-btn { background: linear-gradient(135deg, #00ff9d, #00d4aa); background-size: 200% 200%; animation: gradShift 3s ease infinite; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getMealContext = () => {
    if (!result) return ''
    return `${result.food_name}, ${result.calories} kcal, health score ${result.health_score}/100, meal grade ${result.meal_grade}`
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const data = new FormData()
      data.append('message', userMsg)
      data.append('meal_context', getMealContext())
      const res = await axios.post('https://physiosync-backend-923345715930.us-central1.run.app/chat', data)
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, something went wrong. Try again!' }])
    }
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const suggestions = ['Is this meal good for weight loss?', 'What should I eat post workout?', 'Best Indian foods for protein?']

  return (
    <>
      {/* Floating button */}
      <button
        className="chat-fab"
        onClick={() => setOpen(!open)}
        style={{ position: 'fixed', bottom: '28px', right: '28px', width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #00ff9d, #00d4aa)', border: 'none', cursor: 'pointer', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', boxShadow: '0 8px 32px rgba(0,255,157,0.4)' }}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-open" style={{ position: 'fixed', bottom: '100px', right: '28px', width: '360px', height: '500px', background: 'rgba(5,10,7,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: '24px', zIndex: 999, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>

          {/* Header */}
          <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,255,157,0.04)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #00ff9d, #00d4aa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧬</div>
            <div>
              <p style={{ color: '#00ff9d', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>PhysioSync AI</p>
              <p style={{ color: '#555', fontSize: '11px', margin: 0 }}>● Online · Nutrition Expert</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg-${msg.role}`} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #00ff9d, #00d4aa)' : 'rgba(255,255,255,0.06)',
                  border: msg.role === 'ai' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  color: msg.role === 'user' ? '#050a07' : '#ddd',
                  fontSize: '13px', lineHeight: '1.5', fontWeight: msg.role === 'user' ? 'bold' : 'normal'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: '18px 18px 18px 4px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="typing-dot-1" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00ff9d', display: 'inline-block' }} />
                <span className="typing-dot-2" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00d4ff', display: 'inline-block' }} />
                <span className="typing-dot-3" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#a78bfa', display: 'inline-block' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div style={{ padding: '0 16px 10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => setInput(s)} style={{ padding: '8px 12px', background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: '10px', color: '#00ff9d', fontSize: '12px', cursor: 'pointer', textAlign: 'left' }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about nutrition..."
              style={{ flex: 1, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '13px', outline: 'none' }}
            />
            <button
              className="chat-send grad-btn"
              onClick={sendMessage}
              disabled={loading}
              style={{ width: '40px', height: '40px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}