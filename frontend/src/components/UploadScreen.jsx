import { useState, useRef, useEffect } from 'react'

export default function UploadScreen({ onAnalyze }) {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [weight, setWeight] = useState('72')
  const [height, setHeight] = useState('175')
  const [age, setAge] = useState('22')
  const [activity, setActivity] = useState('Moderate')
  const [goal, setGoal] = useState('Lose Weight')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      @keyframes gradShift { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
      @keyframes glow { 0%,100% { box-shadow:0 0 20px rgba(0,255,157,0.3); } 50% { box-shadow:0 0 40px rgba(0,255,157,0.6); } }
      @keyframes pulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
      @keyframes borderGlow { 0%,100% { border-color: rgba(0,255,157,0.3); } 50% { border-color: rgba(0,255,157,0.7); } }
      .upload-anim { animation: fadeUp 0.6s ease forwards; }
      .upload-anim-2 { animation: fadeUp 0.6s ease 0.1s forwards; opacity:0; }
      .upload-anim-3 { animation: fadeUp 0.6s ease 0.2s forwards; opacity:0; }
      .grad-text { background: linear-gradient(135deg, #00ff9d, #00d4ff, #7c3aed); background-size: 300% 300%; animation: gradShift 4s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .glow-btn { animation: glow 2s ease-in-out infinite; }
      .upload-box-anim { animation: borderGlow 2s ease-in-out infinite; }
      .goal-btn:hover { border-color: rgba(0,255,157,0.5) !important; color: #00ff9d !important; transform: translateY(-2px); transition: all 0.2s; }
      .input-field:focus { border-color: rgba(0,255,157,0.5) !important; outline: none; box-shadow: 0 0 0 3px rgba(0,255,157,0.1); }
      .upload-btn:hover { background: rgba(0,255,157,0.2) !important; transition: all 0.2s; }
      .analyze-btn:hover { transform: scale(1.02); transition: transform 0.2s; }
      .pulse-dot { animation: pulse 2s ease-in-out infinite; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)) }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)) }
  }

  const handleSubmit = () => {
    if (!image) return alert('Please upload a meal photo')
    onAnalyze({ image, weight, height, age, goal, activity })
  }

  const goalIcons = { 'Lose Weight': '🔥', 'Build Muscle': '💪', 'Maintain': '⚖️', 'Performance': '⚡' }
  const goalColors = {
    'Lose Weight': { active: 'rgba(239,68,68,0.15)', border: '#f87171', color: '#f87171' },
    'Build Muscle': { active: 'rgba(0,212,255,0.15)', border: '#00d4ff', color: '#00d4ff' },
    'Maintain': { active: 'rgba(245,158,11,0.15)', border: '#f59e0b', color: '#f59e0b' },
    'Performance': { active: 'rgba(124,58,237,0.15)', border: '#a78bfa', color: '#a78bfa' },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050a07', color: '#fff', fontFamily: 'sans-serif', position: 'relative', overflowX: 'hidden' }}>

      {/* Ambient orbs */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,157,0.05) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', padding: '18px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: '12px', position: 'relative', zIndex: 10, backdropFilter: 'blur(20px)', background: 'rgba(5,10,7,0.8)' }}>
        <span style={{ color: '#00ff9d', fontWeight: 'bold', fontSize: '18px' }}>⚡ PhysioSync AI</span>
        <span style={{ color: '#333', fontSize: '11px', letterSpacing: '2px' }}>METABOLISM SIMULATOR</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: '20px', padding: '6px 16px' }}>
          <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff9d', display: 'inline-block' }} />
          <span style={{ color: '#00ff9d', fontSize: '12px' }}>AI Ready</span>
        </div>
      </nav>

      {/* Main */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 48px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="upload-anim" style={{ marginBottom: '40px' }}>
          <p style={{ color: '#00ff9d', fontSize: '11px', letterSpacing: '3px', marginBottom: '10px' }}>STEP 1 OF 3 · MEAL UPLOAD</p>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', lineHeight: '1.1', marginBottom: '12px', letterSpacing: '-1px' }}>
            Upload Your <span className="grad-text">Meal Photo</span>
          </h1>
          <p style={{ color: '#555', fontSize: '16px' }}>AI will analyse nutrition and simulate your body's response</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>

          {/* Left — Upload */}
          <div className="upload-anim-2">
            <div
              className="upload-box-anim"
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
              style={{ border: `2px dashed ${dragOver ? '#00ff9d' : 'rgba(0,255,157,0.3)'}`, borderRadius: '20px', minHeight: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '16px', background: dragOver ? 'rgba(0,255,157,0.05)' : 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)', transition: 'all 0.3s', overflow: 'hidden', position: 'relative' }}
            >
              {preview ? (
                <>
                  <img src={preview} alt="meal" style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '18px' }} />
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,255,157,0.9)', borderRadius: '8px', padding: '6px 12px', color: '#050a07', fontSize: '12px', fontWeight: 'bold' }}>✓ Photo ready</div>
                </>
              ) : (
                <>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '16px' }}>📸</div>
                  <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', marginBottom: '6px' }}>Drag & drop your meal photo</p>
                  <p style={{ color: '#444', fontSize: '13px', marginBottom: '16px' }}>or click to browse files</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['JPG', 'PNG', 'WEBP'].map(f => (
                      <span key={f} style={{ padding: '3px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', color: '#555', fontSize: '11px' }}>{f}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
            <button className="upload-btn" onClick={() => fileRef.current.click()} style={{ width: '100%', padding: '14px', background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.25)', borderRadius: '12px', color: '#00ff9d', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
              📸 Upload Meal Photo
            </button>
          </div>

          {/* Right — Profile + Goal */}
          <div className="upload-anim-3">

            {/* Body Profile */}
            <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '24px', marginBottom: '20px' }}>
              <p style={{ color: '#00ff9d', fontSize: '11px', letterSpacing: '2px', marginBottom: '18px' }}>BODY PROFILE</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  { label: 'Weight (kg)', val: weight, set: setWeight, placeholder: '72' },
                  { label: 'Height (cm)', val: height, set: setHeight, placeholder: '175' },
                  { label: 'Age', val: age, set: setAge, placeholder: '22' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ color: '#555', fontSize: '12px', display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>{f.label}</label>
                    <input className="input-field" type="number" value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                      style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div>
                  <label style={{ color: '#555', fontSize: '12px', display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>Activity Level</label>
                  <select className="input-field" value={activity} onChange={e => setActivity(e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#fff', fontSize: '15px', boxSizing: 'border-box' }}>
                    {['Sedentary', 'Light', 'Moderate', 'Active', 'Very Active'].map(a => <option key={a} style={{ background: '#0a0f0d' }}>{a}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Goal */}
            <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '24px', marginBottom: '20px' }}>
              <p style={{ color: '#00d4ff', fontSize: '11px', letterSpacing: '2px', marginBottom: '18px' }}>YOUR GOAL</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['Lose Weight', 'Build Muscle', 'Maintain', 'Performance'].map(g => {
                  const isActive = goal === g
                  const c = goalColors[g]
                  return (
                    <button key={g} className="goal-btn" onClick={() => setGoal(g)}
                      style={{ padding: '14px 12px', background: isActive ? c.active : 'rgba(255,255,255,0.03)', border: `1px solid ${isActive ? c.border : 'rgba(255,255,255,0.08)'}`, borderRadius: '12px', color: isActive ? c.color : '#666', cursor: 'pointer', fontSize: '14px', fontWeight: isActive ? 'bold' : 'normal', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      <span>{goalIcons[g]}</span>
                      {g}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Analyse button */}
            <button className="analyze-btn glow-btn" onClick={handleSubmit}
              style={{ width: '100%', padding: '18px', background: 'linear-gradient(135deg, #00ff9d, #00d4aa)', border: 'none', borderRadius: '14px', color: '#050a07', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer' }}>
              🚀 Analyse with AI →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}