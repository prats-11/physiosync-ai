import { useEffect } from 'react'

export default function LandingPage({ onStart }) {

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
      @keyframes float1 { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
      @keyframes float2 { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-8px); } }
      @keyframes float3 { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-15px); } }
      @keyframes pulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
      @keyframes gradShift { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
      @keyframes glow { 0%,100% { box-shadow:0 0 20px rgba(0,255,157,0.3); } 50% { box-shadow:0 0 40px rgba(0,255,157,0.6); } }
      .hero-anim { animation: fadeUp 0.8s ease forwards; }
      .hero-anim-2 { animation: fadeUp 0.8s ease 0.2s forwards; opacity:0; }
      .hero-anim-3 { animation: fadeUp 0.8s ease 0.4s forwards; opacity:0; }
      .hero-anim-4 { animation: fadeUp 0.8s ease 0.6s forwards; opacity:0; }
      .float-card-1 { animation: float1 4s ease-in-out infinite; }
      .float-card-2 { animation: float2 5s ease-in-out infinite; }
      .float-card-3 { animation: float3 3.5s ease-in-out infinite; }
      .pulse-dot { animation: pulse 2s ease-in-out infinite; }
      .glow-btn { animation: glow 2s ease-in-out infinite; }
      .grad-text { background: linear-gradient(135deg, #00ff9d, #00d4ff, #7c3aed, #f59e0b); background-size: 300% 300%; animation: gradShift 4s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .feat-card:hover { border-color: rgba(0,255,157,0.4) !important; transform: translateY(-4px); transition: all 0.3s; }
      .step-card:hover { transform: translateY(-4px); transition: all 0.3s; }
      .metric-item:hover { background: rgba(255,255,255,0.05) !important; transition: all 0.2s; }
      .nav-link:hover { color: #00ff9d !important; transition: color 0.2s; }
      .primary-btn:hover { transform: scale(1.05); transition: transform 0.2s; }
      .secondary-btn:hover { border-color: rgba(255,255,255,0.4) !important; color: #fff !important; transition: all 0.2s; }
      .float-card:hover { transform: translateY(-6px) scale(1.02); transition: all 0.3s; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const floatingCards = [
    { title: 'FOOD DETECTED', value: 'Butter Chicken', sub: 'North Indian Cuisine', color: '#00ff9d', icon: '🍛', cls: 'float-card-1', top: '5%' },
    { title: 'HEALTH SCORE', value: '78/100', sub: 'Good Meal ✓', color: '#00d4ff', icon: '💪', cls: 'float-card-2', top: '37%' },
    { title: 'CALORIES', value: '520 kcal', sub: 'Protein: 32g', color: '#f59e0b', icon: '⚡', cls: 'float-card-3', top: '69%' },
  ]

  const tagColors = {
    'Vision AI': { bg: 'rgba(0,255,157,0.1)', border: 'rgba(0,255,157,0.3)', color: '#00ff9d' },
    'Detailed': { bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.3)', color: '#00d4ff' },
    'Simulation': { bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', color: '#a78bfa' },
    'Interactive': { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', color: '#f59e0b' },
    'Personalised': { bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', color: '#f472b6' },
    'Specialised': { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', color: '#f87171' },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050a07', color: '#fff', fontFamily: 'sans-serif', overflowX: 'hidden' }}>

      {/* Ambient orbs */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,157,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '30%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', padding: '18px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: '16px', position: 'relative', zIndex: 10, backdropFilter: 'blur(20px)', background: 'rgba(5,10,7,0.8)' }}>
        <span style={{ color: '#00ff9d', fontWeight: 'bold', fontSize: '18px' }}>⚡ PhysioSync AI</span>
        <span style={{ color: '#333', fontSize: '11px', letterSpacing: '2px' }}>METABOLISM SIMULATOR</span>
        <div style={{ display: 'flex', gap: '28px', flex: 1, justifyContent: 'center' }}>
          {['Features', 'How it works', 'About'].map(l => (
            <span key={l} className="nav-link" style={{ color: '#555', fontSize: '14px', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
        <button className="glow-btn" style={{ padding: '10px 22px', background: 'rgba(0,255,157,0.1)', border: '1px solid rgba(0,255,157,0.4)', borderRadius: '8px', color: '#00ff9d', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }} onClick={onStart}>Start Analysing →</button>
      </nav>

      {/* Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '60px', maxWidth: '1200px', margin: '0 auto', padding: '100px 48px 80px', position: 'relative', zIndex: 1, alignItems: 'center' }}>
        <div>
          <div className="hero-anim" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 22px', background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: '20px', color: '#00ff9d', fontSize: '13px', marginBottom: '32px' }}>
            <span className="pulse-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#00ff9d' }} />
            Powered by Google Gemini 2.5 Flash
          </div>
          <h1 className="hero-anim-2" style={{ fontSize: '64px', fontWeight: 'bold', lineHeight: '1.05', marginBottom: '24px', letterSpacing: '-2px' }}>
            Your Personal<br />
            <span className="grad-text">AI Metabolism</span><br />
            Simulator
          </h1>
          <p className="hero-anim-3" style={{ color: '#666', fontSize: '18px', lineHeight: '1.8', marginBottom: '40px', maxWidth: '520px' }}>
            Upload any meal photo. Get instant nutrition analysis, personalised health insights,
            and predict exactly how your body will respond.
          </p>
          <div className="hero-anim-4" style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
            <button className="primary-btn glow-btn" style={{ padding: '16px 34px', background: 'linear-gradient(135deg, #00ff9d, #00d4aa)', border: 'none', borderRadius: '10px', color: '#050a07', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={onStart}>🚀 Start Analysing</button>
            <button className="secondary-btn" style={{ padding: '16px 34px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: '#888', fontSize: '16px', cursor: 'pointer' }}>Explore Features ↓</button>
          </div>
          <div style={{ display: 'flex', gap: '40px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '40px' }}>
            {[
              { val: '6', label: 'Google Services', color: '#00ff9d' },
              { val: 'AI', label: 'Multimodal Vision', color: '#00d4ff' },
              { val: '5+', label: 'Health Factors', color: '#a78bfa' },
              { val: '0$', label: 'Free Forever', color: '#f59e0b' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: s.color, margin: '0 0 6px' }}>{s.val}</p>
                <p style={{ color: '#444', fontSize: '12px', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating cards */}
        <div style={{ position: 'relative', height: '480px' }}>
          {floatingCards.map(c => (
            <div key={c.title} className={`${c.cls} float-card`} style={{ position: 'absolute', top: c.top, right: '0', left: '0', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: `1px solid ${c.color}33`, borderRadius: '16px', padding: '16px 20px', boxShadow: `0 8px 32px ${c.color}15` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '16px' }}>{c.icon}</span>
                <p style={{ color: '#555', fontSize: '10px', letterSpacing: '2px', margin: 0 }}>{c.title}</p>
              </div>
              <p style={{ color: c.color, fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px' }}>{c.value}</p>
              <p style={{ color: '#555', fontSize: '12px', margin: 0 }}>{c.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '80px 48px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#00ff9d', fontSize: '11px', letterSpacing: '3px', marginBottom: '12px' }}>HOW IT WORKS</p>
        <h2 style={{ fontSize: '38px', fontWeight: 'bold', marginBottom: '50px' }}>Three steps to full meal insight</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
          {[
            { num: '01', title: 'Upload your meal', desc: 'Take a photo or upload any meal image from your device', color: '#00ff9d' },
            { num: '02', title: 'AI analyses instantly', desc: 'Gemini Vision identifies every ingredient and estimates portions', color: '#00d4ff' },
            { num: '03', title: 'Get your full report', desc: 'Receive nutrition breakdown, health score, and personalised insights', color: '#a78bfa' },
          ].map(s => (
            <div key={s.num} className="step-card" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${s.color}22`, borderRadius: '16px', padding: '32px', borderTop: `3px solid ${s.color}` }}>
              <span style={{ fontSize: '42px', fontWeight: 'bold', color: `${s.color}33`, display: 'block', marginBottom: '16px' }}>{s.num}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: s.color }}>{s.title}</h3>
              <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '80px 48px', maxWidth: '1100px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#00d4ff', fontSize: '11px', letterSpacing: '3px', marginBottom: '12px' }}>FEATURES</p>
        <h2 style={{ fontSize: '38px', fontWeight: 'bold', marginBottom: '50px' }}>Everything you need to understand your body</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
          {[
            { icon: '🧠', title: 'AI Food Recognition', desc: 'Gemini Vision identifies every ingredient in your meal instantly', tag: 'Vision AI' },
            { icon: '📊', title: 'Nutrition Breakdown', desc: 'Calories, protein, carbs, fats and micronutrients in seconds', tag: 'Detailed' },
            { icon: '🔮', title: 'Weight Prediction', desc: 'See exactly how this meal impacts your weight over 30 days', tag: 'Simulation' },
            { icon: '⚡', title: 'What-If Simulator', desc: 'Compare different meal choices and their body impact', tag: 'Interactive' },
            { icon: '🔄', title: 'Smart Swaps', desc: 'Get AI-suggested healthier alternatives tailored to your goal', tag: 'Personalised' },
            { icon: '🇮🇳', title: 'Indian Food Expert', desc: 'Deep analysis of Indian cuisine with traditional and modern takes', tag: 'Specialised' },
          ].map(f => (
            <div key={f.title} className="feat-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>{f.icon}</span>
                <span style={{ fontSize: '11px', color: tagColors[f.tag].color, background: tagColors[f.tag].bg, border: `1px solid ${tagColors[f.tag].border}`, padding: '3px 10px', borderRadius: '20px', letterSpacing: '1px' }}>{f.tag}</span>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '10px', color: '#fff' }}>{f.title}</h3>
              <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What you get */}
      <div style={{ padding: '80px 48px', background: 'rgba(0,255,157,0.02)', borderTop: '1px solid rgba(0,255,157,0.06)', borderBottom: '1px solid rgba(0,255,157,0.06)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ color: '#a78bfa', fontSize: '11px', letterSpacing: '3px', marginBottom: '12px' }}>WHAT YOU GET</p>
          <h2 style={{ fontSize: '38px', fontWeight: 'bold', marginBottom: '48px' }}>Every analysis includes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
            {[
              { text: 'Calorie estimation', color: '#00ff9d' },
              { text: 'Protein / Carbs / Fats / Fiber', color: '#00d4ff' },
              { text: 'Micronutrients (Ca, Fe, Vit C, D)', color: '#a78bfa' },
              { text: 'Meal grade A–F', color: '#f59e0b' },
              { text: 'Health score /100', color: '#00ff9d' },
              { text: '30-day weight impact', color: '#f472b6' },
              { text: 'What-if simulations', color: '#00d4ff' },
              { text: 'Smart food swaps', color: '#a78bfa' },
              { text: 'Cheat meal recovery plan', color: '#f87171' },
              { text: 'Indian food analysis', color: '#f59e0b' },
              { text: 'Workout timing advice', color: '#00ff9d' },
              { text: 'Personalised recommendations', color: '#f472b6' },
            ].map(m => (
              <div key={m.text} className="metric-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '14px 16px' }}>
                <span style={{ color: m.color, fontSize: '14px', fontWeight: 'bold' }}>✓</span>
                <span style={{ color: '#999', fontSize: '13px' }}>{m.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '100px 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,157,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <p style={{ color: '#f59e0b', fontSize: '11px', letterSpacing: '3px', marginBottom: '16px' }}>GET STARTED</p>
        <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Ready to understand<br /><span className="grad-text">your body?</span></h2>
        <p style={{ color: '#555', fontSize: '17px', marginBottom: '40px' }}>Upload your first meal and get AI-powered insights in seconds. Free forever.</p>
        <button className="primary-btn glow-btn" style={{ padding: '18px 44px', background: 'linear-gradient(135deg, #00ff9d, #00d4aa)', border: 'none', borderRadius: '12px', color: '#050a07', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }} onClick={onStart}>Start for Free →</button>
      </div>

      {/* Footer */}
      <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
        <span style={{ color: '#00ff9d', fontWeight: 'bold', fontSize: '15px' }}>⚡ PhysioSync AI</span>
        <span style={{ color: '#333', fontSize: '12px' }}>Powered by Google Gemini AI · Google Cloud Run</span>
      </footer>

    </div>
  )
}