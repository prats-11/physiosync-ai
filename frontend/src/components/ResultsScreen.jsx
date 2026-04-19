import { useEffect } from 'react'

export default function ResultsScreen({ result, onDashboard }) {
  const gradeColor = { A: '#00ff9d', B: '#88ff00', C: '#ffaa00', D: '#ff6600', F: '#ff4444' }
  const gc = gradeColor[result.meal_grade] || '#00ff9d'

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      @keyframes gradShift { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
      @keyframes glow { 0%,100% { box-shadow:0 0 20px rgba(0,255,157,0.2); } 50% { box-shadow:0 0 40px rgba(0,255,157,0.5); } }
      @keyframes barFill { from { width:0%; } to { width:var(--w); } }
      @keyframes countUp { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
      @keyframes pulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
      @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
      .fade-1 { animation: fadeUp 0.5s ease forwards; }
      .fade-2 { animation: fadeUp 0.5s ease 0.1s forwards; opacity:0; }
      .fade-3 { animation: fadeUp 0.5s ease 0.2s forwards; opacity:0; }
      .fade-4 { animation: fadeUp 0.5s ease 0.3s forwards; opacity:0; }
      .fade-5 { animation: fadeUp 0.5s ease 0.4s forwards; opacity:0; }
      .fade-6 { animation: fadeUp 0.5s ease 0.5s forwards; opacity:0; }
      .fade-7 { animation: fadeUp 0.5s ease 0.6s forwards; opacity:0; }
      .fade-8 { animation: fadeUp 0.5s ease 0.7s forwards; opacity:0; }
      .grad-text { background: linear-gradient(135deg, #00ff9d, #00d4ff, #7c3aed); background-size: 300% 300%; animation: gradShift 4s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .glow-btn { animation: glow 2s ease-in-out infinite; }
      .pulse-dot { animation: pulse 2s ease-in-out infinite; }
      .float-card { animation: float 4s ease-in-out infinite; }
      .macro-bar { animation: barFill 1s ease forwards; }
      .count-up { animation: countUp 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      .card-hover:hover { border-color: rgba(0,255,157,0.3) !important; transform: translateY(-2px); transition: all 0.3s; }
      .dash-btn:hover { transform: scale(1.03); transition: transform 0.2s; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const macros = [
    { label: 'Protein', value: result.nutrition?.protein, color: '#00ff9d', pct: 65 },
    { label: 'Carbs', value: result.nutrition?.carbs, color: '#00d4ff', pct: 80 },
    { label: 'Fats', value: result.nutrition?.fats, color: '#f59e0b', pct: 55 },
    { label: 'Fiber', value: result.nutrition?.fiber, color: '#a78bfa', pct: 40 },
  ]

  const insightColors = ['#00ff9d', '#00d4ff', '#f59e0b']

  const tagColors = [
    'rgba(0,255,157,0.1)', 'rgba(0,212,255,0.1)', 'rgba(167,139,250,0.1)',
    'rgba(245,158,11,0.1)', 'rgba(244,114,182,0.1)', 'rgba(248,113,113,0.1)'
  ]
  const tagBorders = [
    'rgba(0,255,157,0.3)', 'rgba(0,212,255,0.3)', 'rgba(167,139,250,0.3)',
    'rgba(245,158,11,0.3)', 'rgba(244,114,182,0.3)', 'rgba(248,113,113,0.3)'
  ]
  const tagTextColors = ['#00ff9d', '#00d4ff', '#a78bfa', '#f59e0b', '#f472b6', '#f87171']

  return (
    <div style={{ minHeight: '100vh', background: '#050a07', color: '#fff', fontFamily: 'sans-serif', position: 'relative', overflowX: 'hidden' }}>

      {/* Ambient orbs */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,157,0.05) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', padding: '18px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', background: 'rgba(5,10,7,0.8)', position: 'sticky', top: 0, zIndex: 100, boxSizing: 'border-box' }}>
        <span style={{ color: '#00ff9d', fontWeight: 'bold', fontSize: '18px' }}>⚡ PhysioSync AI</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,255,157,0.06)', border: '1px solid rgba(0,255,157,0.2)', borderRadius: '20px', padding: '6px 14px' }}>
            <span className="pulse-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00ff9d', display: 'inline-block' }} />
            <span style={{ color: '#00ff9d', fontSize: '13px' }}>✓ Analysis Complete</span>
          </div>
          <button className="dash-btn glow-btn" onClick={onDashboard} style={{ padding: '10px 22px', background: 'linear-gradient(135deg, #00ff9d, #00d4aa)', border: 'none', borderRadius: '10px', color: '#050a07', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
            View Dashboard →
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 48px', position: 'relative', zIndex: 1 }}>

        {/* Food title */}
        <div className="fade-1" style={{ marginBottom: '32px' }}>
          <p style={{ color: '#555', fontSize: '13px', marginBottom: '6px' }}>Today · Just now · {result.cuisine_type} Cuisine</p>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', letterSpacing: '-0.5px', margin: 0 }}>
            🍽️ <span className="grad-text">{result.food_name}</span>
          </h1>
        </div>

        {/* Grade + Score row */}
        <div className="fade-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {/* Grade */}
          <div className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: `1px solid ${gc}33`, borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="count-up" style={{ width: '64px', height: '64px', borderRadius: '50%', border: `3px solid ${gc}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${gc}10`, flexShrink: 0 }}>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: gc }}>{result.meal_grade}</span>
            </div>
            <div>
              <p style={{ color: '#555', fontSize: '11px', letterSpacing: '2px', margin: '0 0 4px' }}>MEAL GRADE</p>
              <p style={{ color: '#ccc', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>{result.meal_grade_reason}</p>
            </div>
          </div>

          {/* Health Score */}
          <div className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="count-up" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid #00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'rgba(0,212,255,0.08)', flexShrink: 0 }}>
              <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#00d4ff' }}>{result.health_score}</span>
              <span style={{ fontSize: '10px', color: '#555' }}>/100</span>
            </div>
            <div>
              <p style={{ color: '#555', fontSize: '11px', letterSpacing: '2px', margin: '0 0 4px' }}>HEALTH SCORE</p>
              <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>{result.health_label}</p>
            </div>
          </div>

          {/* Calories */}
          <div className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '20px', padding: '24px' }}>
            <p style={{ color: '#555', fontSize: '11px', letterSpacing: '2px', margin: '0 0 8px' }}>CALORIES</p>
            <p className="count-up" style={{ fontSize: '36px', fontWeight: 'bold', color: '#f59e0b', margin: '0 0 2px' }}>{result.calories}</p>
            <p style={{ color: '#555', fontSize: '13px', margin: 0 }}>kcal this meal</p>
          </div>

          {/* Weight Impact */}
          <div className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: `1px solid ${result.weight_impact_30days?.includes('+') ? 'rgba(248,113,113,0.2)' : 'rgba(0,255,157,0.2)'}`, borderRadius: '20px', padding: '24px' }}>
            <p style={{ color: '#555', fontSize: '11px', letterSpacing: '2px', margin: '0 0 8px' }}>WEIGHT IMPACT · 30 DAYS</p>
            <p className="count-up" style={{ fontSize: '36px', fontWeight: 'bold', color: result.weight_impact_30days?.includes('+') ? '#f87171' : '#00ff9d', margin: '0 0 2px' }}>{result.weight_impact_30days}</p>
            <p style={{ color: '#555', fontSize: '13px', margin: 0 }}>if eaten daily</p>
          </div>
        </div>

        {/* Macros + Insights */}
        <div className="fade-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px' }}>
            <p style={{ color: '#00ff9d', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>CALORIE BREAKDOWN</p>
            {macros.map((m, i) => (
              <div key={m.label} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#666', fontSize: '13px' }}>{m.label}</span>
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>{m.value}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div className="macro-bar" style={{ height: '100%', borderRadius: '3px', background: m.color, '--w': `${m.pct}%`, width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px' }}>
            <p style={{ color: '#00d4ff', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>AI INSIGHTS</p>
            {result.insights?.map((insight, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                <span style={{ color: insightColors[i], fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>●</span>
                <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{insight}</p>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
              {result.tags?.map((t, i) => (
                <span key={t} style={{ padding: '4px 12px', background: tagColors[i % 6], border: `1px solid ${tagBorders[i % 6]}`, borderRadius: '20px', color: tagTextColors[i % 6], fontSize: '12px' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Micronutrients + Workout */}
        <div className="fade-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px' }}>
            <p style={{ color: '#a78bfa', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>MICRONUTRIENTS</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { icon: '🥛', label: 'Calcium', value: result.micronutrients?.calcium, color: '#00d4ff' },
                { icon: '⚡', label: 'Iron', value: result.micronutrients?.iron, color: '#f59e0b' },
                { icon: '🌿', label: 'Vitamin C', value: result.micronutrients?.vitamin_c, color: '#00ff9d' },
                { icon: '☀️', label: 'Vitamin D', value: result.micronutrients?.vitamin_d, color: '#f472b6' },
              ].map(m => (
                <div key={m.label} className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '22px', display: 'block', marginBottom: '8px' }}>{m.icon}</span>
                  <p style={{ fontWeight: 'bold', fontSize: '18px', color: m.color, margin: '0 0 4px' }}>{m.value}</p>
                  <p style={{ color: '#555', fontSize: '12px', margin: 0 }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px' }}>
            <p style={{ color: '#f59e0b', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>WORKOUT TIMING</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
              {[
                { label: 'Pre-Workout', value: result.workout_timing?.pre_workout },
                { label: 'Post-Workout', value: result.workout_timing?.post_workout },
                { label: 'Best Time', value: result.workout_timing?.best_time_to_eat },
              ].map(w => (
                <div key={w.label} className="card-hover" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ color: '#555', fontSize: '12px', margin: '0 0 10px' }}>{w.label}</p>
                  <p style={{ fontWeight: 'bold', fontSize: '16px', margin: 0, color: w.value === 'Good' ? '#00ff9d' : w.value === 'Bad' ? '#f87171' : '#f59e0b' }}>{w.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Swaps */}
        <div className="fade-5" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,255,157,0.1)', borderRadius: '20px', padding: '28px', marginBottom: '20px' }}>
          <p style={{ color: '#00ff9d', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>SMART SWAPS</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {result.smart_swaps?.map((s, i) => (
              <div key={i} className="card-hover" style={{ background: 'rgba(0,255,157,0.04)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: '14px', padding: '18px' }}>
                <p style={{ color: '#00ff9d', fontWeight: 'bold', fontSize: '14px', margin: '0 0 6px' }}>🔄 {s.swap}</p>
                <p style={{ color: '#777', fontSize: '13px', margin: 0 }}>{s.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cheat Meal Recovery */}
        {result.cheat_meal_recovery?.is_cheat_meal && (
          <div className="fade-6" style={{ background: 'rgba(248,113,113,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '20px', padding: '28px', marginBottom: '20px' }}>
            <p style={{ color: '#f87171', fontSize: '11px', letterSpacing: '2px', margin: '0 0 20px' }}>🚨 CHEAT MEAL RECOVERY PLAN</p>
            {result.cheat_meal_recovery?.recovery_tips?.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '14px', alignItems: 'flex-start' }}>
                <span style={{ color: '#f87171', fontWeight: 'bold', fontSize: '15px', minWidth: '24px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '2px 8px', textAlign: 'center' }}>0{i + 1}</span>
                <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{tip}</p>
              </div>
            ))}
          </div>
        )}

        {/* Indian Food Analysis */}
        {result.indian_food_analysis?.is_indian && (
          <div className="fade-7" style={{ background: 'rgba(245,158,11,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '20px', padding: '28px', marginBottom: '20px' }}>
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