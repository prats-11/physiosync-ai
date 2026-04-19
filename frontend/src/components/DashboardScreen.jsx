import { useEffect } from 'react'

export default function DashboardScreen({ result, onBack }) {
  const gradeColor = { A: '#00ff9d', B: '#88ff00', C: '#ffaa00', D: '#ff6600', F: '#ff4444' }
  const gc = gradeColor[result.meal_grade] || '#00ff9d'

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      @keyframes gradShift { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
      @keyframes glow { 0%,100% { box-shadow:0 0 20px rgba(0,255,157,0.2); } 50% { box-shadow:0 0 40px rgba(0,255,157,0.5); } }
      @keyframes countUp { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
      @keyframes pulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
      @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
      @keyframes barFill { from { width:0%; } to { width:var(--w); } }
      .fade-1 { animation: fadeUp 0.5s ease forwards; }
      .fade-2 { animation: fadeUp 0.5s ease 0.1s forwards; opacity:0; }
      .fade-3 { animation: fadeUp 0.5s ease 0.2s forwards; opacity:0; }
      .fade-4 { animation: fadeUp 0.5s ease 0.3s forwards; opacity:0; }
      .fade-5 { animation: fadeUp 0.5s ease 0.4s forwards; opacity:0; }
      .fade-6 { animation: fadeUp 0.5s ease 0.5s forwards; opacity:0; }
      .fade-7 { animation: fadeUp 0.5s ease 0.6s forwards; opacity:0; }
      .grad-text { background: linear-gradient(135deg, #00ff9d, #00d4ff, #7c3aed); background-size: 300% 300%; animation: gradShift 4s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .glow-btn { animation: glow 2s ease-in-out infinite; }
      .pulse-dot { animation: pulse 2s ease-in-out infinite; }
      .count-up { animation: countUp 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      .card-hover:hover { border-color: rgba(0,255,157,0.3) !important; transform: translateY(-2px); transition: all 0.3s; }
      .new-btn:hover { background: rgba(255,255,255,0.08) !important; transition: all 0.2s; }
      .macro-bar { animation: barFill 1.2s ease forwards; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#050a07', color: '#fff', fontFamily: 'sans-serif', position: 'relative', overflowX: 'hidden' }}>

      {/* Ambient orbs */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '5%', left: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,157,0.05) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', padding: '18px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', background: 'rgba(5,10,7,0.8)', position: 'sticky', top: 0, zIndex: 100, boxSizing: 'border-box' }}>
        <div>
          <p style={{ color: '#444', fontSize: '11px', letterSpacing: '2px', margin: '0 0 2px' }}>MEAL ANALYSIS DASHBOARD</p>
          <h2 style={{ color: '#00ff9d', fontWeight: 'bold', fontSize: '16px', margin: 0 }}>⚡ PhysioSync AI · <span style={{ color: '#fff' }}>{result.food_name}</span></h2>
        </div>
        <button className="new-btn" onClick={onBack} style={{ marginLeft: 'auto', padding: '10px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontSize: '14px' }}>+ New Analysis</button>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 48px', position: 'relative', zIndex: 1 }}>

        {/* Stats grid */}
        <div className="fade-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '14px', marginBottom: '24px' }}>
          {[
            { label: 'CALORIES', value: result.calories + ' kcal', sub: 'this meal', color: '#f59e0b' },
            { label: 'HEALTH SCORE', value: result.health_score + '/100', sub: result.health_label, color: result.health_score < 40 ? '#f87171' : '#00d4ff' },
            { label: 'PROTEIN', value: result.nutrition?.protein, sub: 'this meal', color: '#00ff9d' },
            { label: 'WEIGHT IMPACT', value: result.weight_impact_30days, sub: 'in 30 days', color: result.weight_impact_30days?.includes('+') ? '#f87171' : '#00ff9d' },
            { label: 'MEAL GRADE', value: result.meal_grade, sub: result.meal_grade_reason?.substring(0, 40) + '...', color: gc },
          ].map(s => (
            <div key={s.label} className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
              <p style={{ color: '#444', fontSize: '10px', letterSpacing: '1.5px', margin: '0 0 10px' }}>{s.label}</p>
              <p className="count-up" style={{ fontSize: '22px', fontWeight: 'bold', color: s.color, margin: '0 0 6px' }}>{s.value}</p>
              <p style={{ color: '#444', fontSize: '11px', margin: 0 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* What-if + Recommendations */}
        <div className="fade-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px' }}>
            <p style={{ color: '#00ff9d', fontSize: '11px', letterSpacing: '2px', margin: '0 0 6px' }}>WHAT-IF SIMULATOR</p>
            <p style={{ color: '#444', fontSize: '13px', margin: '0 0 20px' }}>30-day weight impact if eaten daily</p>
            {result.what_if_simulations?.map((sim, i) => (
              <div key={i} className="card-hover" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px 16px', marginBottom: '10px' }}>
                <span style={{ color: '#ccc', fontSize: '13px', fontWeight: 'bold' }}>{sim.meal}</span>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: sim.impact.includes('+') ? '#f87171' : '#00ff9d' }}>{sim.impact}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px' }}>
            <p style={{ color: '#00d4ff', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>AI DIET RECOMMENDATIONS</p>
            {result.recommendations?.map((rec, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '16px', alignItems: 'flex-start' }}>
                <span style={{ color: '#00d4ff', fontWeight: 'bold', fontSize: '13px', minWidth: '24px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '6px', padding: '2px 6px', textAlign: 'center' }}>0{i + 1}</span>
                <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{rec.replace(/\*\*/g, '')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Swaps + Micronutrients */}
        <div className="fade-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,255,157,0.1)', borderRadius: '20px', padding: '28px' }}>
            <p style={{ color: '#00ff9d', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>SMART SWAPS</p>
            {result.smart_swaps?.map((s, i) => (
              <div key={i} className="card-hover" style={{ background: 'rgba(0,255,157,0.04)', border: '1px solid rgba(0,255,157,0.12)', borderRadius: '12px', padding: '14px', marginBottom: '10px' }}>
                <p style={{ color: '#00ff9d', fontWeight: 'bold', fontSize: '13px', margin: '0 0 5px' }}>🔄 {s.swap}</p>
                <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>{s.benefit}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(167,139,250,0.15)', borderRadius: '20px', padding: '28px' }}>
            <p style={{ color: '#a78bfa', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>MICRONUTRIENTS</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { icon: '🥛', label: 'Calcium', value: result.micronutrients?.calcium, color: '#00d4ff' },
                { icon: '⚡', label: 'Iron', value: result.micronutrients?.iron, color: '#f59e0b' },
                { icon: '🌿', label: 'Vitamin C', value: result.micronutrients?.vitamin_c, color: '#00ff9d' },
                { icon: '☀️', label: 'Vitamin D', value: result.micronutrients?.vitamin_d, color: '#f472b6' },
              ].map(m => (
                <div key={m.label} className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '20px', display: 'block', marginBottom: '8px' }}>{m.icon}</span>
                  <p style={{ fontWeight: 'bold', fontSize: '18px', color: m.color, margin: '0 0 4px' }}>{m.value}</p>
                  <p style={{ color: '#444', fontSize: '12px', margin: 0 }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workout Timing */}
        <div className="fade-4" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '20px', padding: '28px', marginBottom: '20px' }}>
          <p style={{ color: '#f59e0b', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>WORKOUT TIMING</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
            {[
              { label: 'Pre-workout', value: result.workout_timing?.pre_workout },
              { label: 'Post-workout', value: result.workout_timing?.post_workout },
              { label: 'Best time to eat', value: result.workout_timing?.best_time_to_eat },
            ].map(w => (
              <div key={w.label} className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
                <p style={{ color: '#555', fontSize: '12px', margin: '0 0 12px' }}>{w.label}</p>
                <p style={{ fontWeight: 'bold', fontSize: '18px', margin: 0, color: w.value === 'Good' ? '#00ff9d' : w.value === 'Bad' ? '#f87171' : '#f59e0b' }}>{w.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cheat Meal */}
        {result.cheat_meal_recovery?.is_cheat_meal && (
          <div className="fade-5" style={{ background: 'rgba(248,113,113,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '20px', padding: '28px', marginBottom: '20px' }}>
            <p style={{ color: '#f87171', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>🚨 CHEAT MEAL RECOVERY PLAN</p>
            {result.cheat_meal_recovery?.recovery_tips?.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '14px', alignItems: 'flex-start' }}>
                <span style={{ color: '#f87171', fontWeight: 'bold', fontSize: '13px', minWidth: '28px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '2px 8px', textAlign: 'center' }}>0{i + 1}</span>
                <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{tip}</p>
              </div>
            ))}
          </div>
        )}

        {/* Indian Food */}
        {result.indian_food_analysis?.is_indian && (
          <div className="fade-6" style={{ background: 'rgba(245,158,11,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '20px', padding: '28px', marginBottom: '20px' }}>
            <p style={{ color: '#f59e0b', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>🇮🇳 INDIAN FOOD ANALYSIS</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '14px', padding: '18px' }}>
                <p style={{ color: '#f59e0b', fontSize: '12px', letterSpacing: '1px', margin: '0 0 10px' }}>TRADITIONAL BENEFITS</p>
                <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{result.indian_food_analysis?.traditional_benefits}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '14px', padding: '18px' }}>
                <p style={{ color: '#f59e0b', fontSize: '12px', letterSpacing: '1px', margin: '0 0 10px' }}>MODERN HEALTH TAKE</p>
                <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{result.indian_food_analysis?.modern_health_take}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}