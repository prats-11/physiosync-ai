export default function DashboardScreen({ result }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>⚡ PhysioSync AI · Dashboard</span>
      </div>

      <div style={styles.statsGrid}>
        {[
          { label: 'CALORIES', value: result.calories + ' kcal', sub: 'This meal' },
          { label: 'HEALTH SCORE', value: result.health_score + '/100', sub: '↑ Great score' },
          { label: 'PROTEIN', value: result.nutrition?.protein, sub: 'This meal' },
          { label: 'WEIGHT IMPACT', value: result.weight_impact_30days, sub: 'In 30 days' },
        ].map(s => (
          <div key={s.label} style={styles.statCard}>
            <p style={styles.statLabel}>{s.label}</p>
            <p style={styles.statVal}>{s.value}</p>
            <p style={styles.statSub}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <p style={styles.sectionTitle}>WHAT-IF SIMULATOR</p>
          <p style={styles.sectionDesc}>Impact of eating this meal daily for 30 days</p>
          {result.what_if_simulations?.map((sim, i) => (
            <div key={i} style={styles.simRow}>
              <div>
                <p style={styles.simMeal}>{sim.meal}</p>
              </div>
              <span style={{ ...styles.simImpact, color: sim.impact.includes('+') ? '#ff4444' : '#00ff9d' }}>
                {sim.impact}
              </span>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <p style={styles.sectionTitle}>AI DIET RECOMMENDATIONS</p>
          {result.recommendations?.map((rec, i) => (
            <div key={i} style={styles.recRow}>
              <span style={styles.recNum}>0{i + 1}</span>
              <p style={styles.recText}>{rec.replace(/\*\*/g, '')}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <p style={styles.sectionTitle}>MICRONUTRIENTS BREAKDOWN</p>
        <div style={styles.microGrid}>
          {[
            { label: 'Calcium', value: result.micronutrients?.calcium, icon: '🥛' },
            { label: 'Iron', value: result.micronutrients?.iron, icon: '⚡' },
            { label: 'Vitamin C', value: result.micronutrients?.vitamin_c, icon: '🌿' },
            { label: 'Vitamin D', value: result.micronutrients?.vitamin_d, icon: '☀️' },
          ].map(m => (
            <div key={m.label} style={styles.microCard}>
              <span style={styles.microIcon}>{m.icon}</span>
              <p style={styles.microVal}>{m.value}</p>
              <p style={styles.microLabel}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0f0d', padding: '20px' },
  header: { display: 'flex', alignItems: 'center', marginBottom: '25px' },
  logo: { color: '#00ff9d', fontWeight: 'bold', fontSize: '18px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '20px' },
  statCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: '12px', padding: '20px' },
  statLabel: { color: '#666', fontSize: '11px', letterSpacing: '2px', marginBottom: '8px' },
  statVal: { fontSize: '24px', fontWeight: 'bold', color: '#00ff9d', marginBottom: '4px' },
  statSub: { color: '#666', fontSize: '12px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: '12px', padding: '20px', marginBottom: '20px' },
  sectionTitle: { color: '#00ff9d', fontSize: '11px', letterSpacing: '2px', marginBottom: '8px' },
  sectionDesc: { color: '#666', fontSize: '13px', marginBottom: '15px' },
  simRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', marginBottom: '10px' },
  simMeal: { color: '#fff', fontWeight: 'bold', fontSize: '14px' },
  simImpact: { fontWeight: 'bold', fontSize: '16px' },
  recRow: { display: 'flex', gap: '12px', marginBottom: '15px', alignItems: 'flex-start' },
  recNum: { color: '#00ff9d', fontWeight: 'bold', fontSize: '16px', minWidth: '25px' },
  recText: { color: '#ccc', fontSize: '14px', lineHeight: '1.5' },
  microGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' },
  microCard: { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '15px', textAlign: 'center' },
  microIcon: { fontSize: '24px' },
  microVal: { fontWeight: 'bold', fontSize: '18px', color: '#00ff9d', margin: '8px 0 4px' },
  microLabel: { color: '#666', fontSize: '12px' },
}