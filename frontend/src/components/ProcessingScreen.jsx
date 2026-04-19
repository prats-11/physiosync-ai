import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ProcessingScreen({ formData, onDone }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      @keyframes pulse { 0%,100% { opacity:0.4; transform:scale(1); } 50% { opacity:1; transform:scale(1.05); } }
      @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      @keyframes gradShift { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
      @keyframes scanLine { 0% { top:-10%; } 100% { top:110%; } }
      @keyframes ripple { 0% { transform:scale(0.8); opacity:1; } 100% { transform:scale(2.5); opacity:0; } }
      @keyframes stepDone { from { transform:scale(0); opacity:0; } to { transform:scale(1); opacity:1; } }
      @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
      @keyframes glow { 0%,100% { box-shadow:0 0 20px rgba(0,255,157,0.2); } 50% { box-shadow:0 0 50px rgba(0,255,157,0.5); } }
      @keyframes particleFloat { 0% { transform:translateY(0) translateX(0); opacity:0; } 20% { opacity:1; } 100% { transform:translateY(-120px) translateX(20px); opacity:0; } }
      .spin-ring { animation: spin 2s linear infinite; }
      .spin-ring-2 { animation: spinReverse 3s linear infinite; }
      .spin-ring-3 { animation: spin 4s linear infinite; }
      .pulse-logo { animation: pulse 2s ease-in-out infinite; }
      .grad-text { background: linear-gradient(135deg, #00ff9d, #00d4ff, #7c3aed); background-size: 300% 300%; animation: gradShift 3s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .float-card { animation: float 4s ease-in-out infinite; }
      .glow-ring { animation: glow 2s ease-in-out infinite; }
      .ripple-1 { animation: ripple 2s ease-out infinite; }
      .ripple-2 { animation: ripple 2s ease-out 0.6s infinite; }
      .ripple-3 { animation: ripple 2s ease-out 1.2s infinite; }
      .step-done { animation: stepDone 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      .fade-up { animation: fadeUp 0.6s ease forwards; }
      .fade-up-2 { animation: fadeUp 0.6s ease 0.2s forwards; opacity:0; }
      .fade-up-3 { animation: fadeUp 0.6s ease 0.4s forwards; opacity:0; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 500)
    return () => clearInterval(dotsInterval)
  }, [])

  useEffect(() => {
    const stepTimers = [
      setTimeout(() => setCurrentStep(1), 1500),
      setTimeout(() => setCurrentStep(2), 4000),
    ]
    return () => stepTimers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const analyze = async () => {
      const data = new FormData()
      data.append('image', formData.image)
      data.append('weight', formData.weight)
      data.append('height', formData.height)
      data.append('age', formData.age)
      data.append('goal', formData.goal)
      data.append('activity', formData.activity)
      try {
        const res = await axios.post('https://physiosync-backend-923345715930.us-central1.run.app/analyze', data, { timeout: 60000 })
        setCurrentStep(3)
        setTimeout(() => onDone(res.data), 600)
      } catch (err) {
        console.error(err)
        alert('Error analyzing meal. Try again.')
      }
    }
    analyze()
  }, [])

  const steps = [
    { icon: '🧠', label: 'Image parsed', desc: 'Photo processed', color: '#00ff9d' },
    { icon: '🤖', label: 'AI analysis', desc: 'Gemini thinking', color: '#00d4ff' },
    { icon: '📊', label: 'Simulation', desc: 'Building report', color: '#a78bfa' },
  ]

  const facts = [
    'Analysing macronutrient ratios',
    'Detecting ingredients with Vision AI',
    'Calculating 30-day weight impact',
    'Generating personalised insights',
    'Running metabolism simulation',
  ]
  const [factIdx, setFactIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setFactIdx(i => (i + 1) % facts.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#050a07', color: '#fff', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient orbs */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '20%', left: '15%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,157,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', padding: '18px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)', width: '100%', backdropFilter: 'blur(20px)', background: 'rgba(5,10,7,0.8)', position: 'relative', zIndex: 10, boxSizing: 'border-box' }}>
        <span style={{ color: '#00ff9d', fontWeight: 'bold', fontSize: '18px' }}>⚡ PhysioSync AI</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.3)', borderRadius: '20px', padding: '7px 16px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00ff9d', display: 'inline-block', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <span style={{ color: '#00ff9d', fontSize: '13px', fontWeight: 'bold' }}>● AI Processing</span>
        </div>
      </nav>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', zIndex: 1, width: '100%' }}>

        {/* Spinner rings */}
        <div className="fade-up" style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Ripple effects */}
          {['ripple-1','ripple-2','ripple-3'].map(c => (
            <div key={c} className={c} style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', border: '1px solid rgba(0,255,157,0.3)' }} />
          ))}
          {/* Outer ring */}
          <div className="spin-ring glow-ring" style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', border: '2px solid transparent', borderTop: '2px solid #00ff9d', borderRight: '2px solid rgba(0,255,157,0.3)' }} />
          {/* Mid ring */}
          <div className="spin-ring-2" style={{ position: 'absolute', width: '130px', height: '130px', borderRadius: '50%', border: '2px solid transparent', borderTop: '2px solid #00d4ff', borderLeft: '2px solid rgba(0,212,255,0.3)' }} />
          {/* Inner ring */}
          <div className="spin-ring-3" style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', border: '2px solid transparent', borderTop: '2px solid #a78bfa', borderBottom: '2px solid rgba(167,139,250,0.3)' }} />
          {/* Center */}
          <div className="pulse-logo" style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.3)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
            🧬
          </div>
        </div>

        {/* Title */}
        <div className="fade-up-2" style={{ textAlign: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            Analysing your meal <span className="grad-text">using AI{dots}</span>
          </h2>
          <p style={{ color: '#555', fontSize: '16px', margin: 0 }}>Gemini multimodal vision is identifying ingredients and estimating portions</p>
        </div>

        {/* Rotating fact */}
        <div className="fade-up-2" style={{ marginBottom: '40px', padding: '10px 24px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '20px' }}>
          <span style={{ color: '#00d4ff', fontSize: '13px' }}>⚡ {facts[factIdx]}</span>
        </div>

        {/* Steps */}
        <div className="fade-up-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', maxWidth: '600px', width: '100%', marginBottom: '32px' }}>
          {steps.map((s, i) => {
            const isDone = currentStep > i
            const isActive = currentStep === i
            return (
              <div key={s.label} className="float-card" style={{ background: isDone ? `${s.color}10` : 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: `1px solid ${isDone ? s.color + '40' : isActive ? s.color + '30' : 'rgba(255,255,255,0.06)'}`, borderRadius: '16px', padding: '20px', textAlign: 'center', transition: 'all 0.4s', animationDelay: `${i * 0.3}s` }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>{s.icon}</div>
                <p style={{ color: isDone ? s.color : isActive ? '#fff' : '#555', fontWeight: 'bold', fontSize: '13px', margin: '0 0 6px', letterSpacing: '1px' }}>{s.label}</p>
                <p style={{ color: isDone ? s.color : isActive ? '#888' : '#333', fontSize: '12px', margin: 0 }}>
                  {isDone ? '✓ Done' : isActive ? 'Running...' : 'Queued'}
                </p>
                {isDone && (
                  <div className="step-done" style={{ width: '24px', height: '24px', borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px auto 0', fontSize: '12px' }}>✓</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Powered by */}
        <div style={{ padding: '10px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px' }}>
          <span style={{ color: '#333', fontSize: '13px' }}>Powered by Google Gemini AI · Multimodal Vision + Reasoning</span>
        </div>
      </div>
    </div>
  )
}