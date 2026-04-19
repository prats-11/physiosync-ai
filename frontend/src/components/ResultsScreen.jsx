export default function ResultsScreen({ result, onDashboard }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>⚡ PhysioSync AI</span>
        <span style={styles.badge}>✓ Analysis Complete</span>
      </div>

      <div style={styles.card}>
        <div style={styles.topRow}>
          <div>
            <h2 style={styles.foodName}>🍽️ {result.food_name}</h2>
            <p style={styles.time}>Today · Just now</p>
          </div>
          <button style={styles.dashBtn} onClick={onDashboard}>View Dashboard →</button>
        </div>

        <div style={styles.grid}>
          <div style={styles.section}>
            <p style={styles.sectionTitle}>CALORIE ESTIMATION</p>
            <h1 style={styles.calories}>{result.calories} <span style={styles.unit}>kcal</span></h1>
            <div style={styles.macros}>
              {[
                { label: 'Protein', value: result.nutrition?.protein, color: '#00ff9d' },
                { label: 'Carbs', value: result.nutrition?.carbs, color: '#4488ff' },
                { label: 'Fats', value: result.nutrition?.fats, color: '#ffaa00' },
                { label: 'Fiber', value: result.nutrition?.fiber, color: '#00ffcc' },
              ].map(m => (
                <div key={m.label} style={styles.macroRow}>
                  <span style={styles.macroLabel}>{m.label}</span>
                  <div style={styles.macroBar}>
                    <div style={{ ...styles.macroFill, background: m.color, width: '60%' }} />
                  </div>
                  <span style={styles.macroVal}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <p style={styles.sectionTitle}>HEALTH SCORE</p>
            <div style={styles.scoreCircle}>
              <span style={styles.scoreNum}>{result.health_score}</span>
              <span style={styles.scoreMax}>/100</span>
            </div>
            <p style={styles.healthLabel}>{result.health_label}</p>
            <div style={styles.tags}>
              {result.tags?.map(t => (
                <span key={t} style={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.section}>
            <p style={styles.sectionTitle}>MICRONUTRIENTS</p>
            <div style={styles.microGrid}>
              {[
                { icon: '🥛', label: 'Calcium', value: result.micronutrients?.calcium },
                { icon: '⚡', label: 'Iron', value: result.micronutrients?.iron },
                { icon: '🌿', label: 'Vitamin C', value: result.micronutrients?.vitamin_c },
                { icon: '☀️', label: 'Vitamin D', value: result.micronutrients?.vitamin_d },
              ].map(m => (
                <div key={m.label} style={styles.microCard}>
                  <span>{m.icon}</span>
                  <p style={styles.microVal}>{m.value}</p>
                  <p style={styles.microLabel}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <p style={styles.sectionTitle}>AI INSIGHTS</p>
            {result.insights?.map((insight, i) => (
              <div key={i} style={styles.insight}>
                <span style={{ color: ['#00ff9d', '#4488ff', '#ffaa00'][i] }}>●</span>
                <p style={styles.insightText}>{insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <p style={styles.sectionTitle}>WEIGHT IMPACT · 30 DAYS</p>
          <p style={styles.impact}>{result.weight_impact_30days}</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0f0d', padding: '20px' },
  header: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  logo: { color: '#00ff9d', fontWeight: 'bold', fontSize: '18px' },
  badge: { marginLeft: 'auto', color: '#00ff9d', background: 'rgba(0,255,157,0.1)', border: '1px solid rgba(0,255,157,0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: '16px', padding: '30px', backdropFilter: 'blur(10px)' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  foodName: { fontSize: '22px', fontWeight: 'bold' },
  time: { color: '#666', fontSize: '13px', marginTop: '4px' },
  dashBtn: { padding: '10px 20px', background: '#00ff9d', border: 'none', borderRadius: '8px', color: '#0a0f0d', fontWeight: 'bold', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
  section: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px', marginBottom: '15px' },
  sectionTitle: { color: '#00ff9d', fontSize: '11px', letterSpacing: '2px', marginBottom: '15px' },
  calories: { fontSize: '48px', fontWeight: 'bold', color: '#00ff9d' },
  unit: { fontSize: '20px', color: '#666' },
  macros: { marginTop: '15px' },
  macroRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' },
  macroLabel: { color: '#666', fontSize: '13px', width: '55px' },
  macroBar: { flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' },
  macroFill: { height: '100%', borderRadius: '3px' },
  macroVal: { color: '#fff', fontSize: '13px', width: '40px', textAlign: 'right' },
  scoreCircle: { width: '100px', height: '100px', borderRadius: '50%', border: '4px solid #00ff9d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', flexDirection: 'column' },
  scoreNum: { fontSize: '28px', fontWeight: 'bold', color: '#00ff9d' },
  scoreMax: { fontSize: '13px', color: '#666' },
  healthLabel: { textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' },
  tags: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' },
  tag: { padding: '4px 10px', background: 'rgba(0,255,157,0.1)', border: '1px solid rgba(0,255,157,0.3)', borderRadius: '20px', color: '#00ff9d', fontSize: '12px' },
  microGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  microCard: { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', textAlign: 'center' },
  microVal: { fontWeight: 'bold', fontSize: '18px', margin: '5px 0' },
  microLabel: { color: '#666', fontSize: '12px' },
  insight: { display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' },
  insightText: { color: '#ccc', fontSize: '14px', lineHeight: '1.5' },
  impact: { fontSize: '24px', fontWeight: 'bold', color: '#00ff9d' },
}