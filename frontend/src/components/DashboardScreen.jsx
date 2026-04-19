export default function DashboardScreen({ result, onBack }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <p style={styles.headerSub}>MEAL ANALYSIS DASHBOARD</p>
          <h2 style={styles.headerTitle}>⚡ PhysioSync AI · {result.food_name}</h2>
        </div>
        <button style={styles.backBtn} onClick={onBack}>+ New Analysis</button>
      </div>

      <div style={styles.statsGrid}>
        {[
          { label: 'CALORIES', value: result.calories + ' kcal', sub: 'this meal', color: '#00ff9d' },
          { label: 'HEALTH SCORE', value: result.health_score + '/100', sub: result.health_label, color: result.health_score < 40 ? '#ff4444' : '#00ff9d' },
          { label: 'PROTEIN', value: result.nutrition?.protein, sub: 'this meal', color: '#fff' },
          { label: 'WEIGHT IMPACT', value: result.weight_impact_30days, sub: 'in 30 days', color: result.weight_impact_30days?.includes('+') ? '#ff4444' : '#00ff9d' },
          { label: 'MEAL GRADE', value: result.meal_grade, sub: result.meal_grade_reason, color: result.meal_grade === 'A' ? '#00ff9d' : result.meal_grade === 'B' ? '#88ff00' : result.meal_grade === 'C' ? '#ffaa00' : '#ff4444' },
        ].map(s => (
          <div key={s.label} style={styles.statCard}>
            <p style={styles.statLabel}>{s.label}</p>
            <p style={{ ...styles.statVal, color: s.color }}>{s.value}</p>
            <p style={styles.statSub}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <p style={styles.sectionTitle}>WHAT-IF SIMULATOR</p>
          <p style={styles.sectionDesc}>30-day weight impact if eaten daily</p>
          {result.what_if_simulations?.map((sim, i) => (
            <div key={i} style={styles.simRow}>
              <span style={styles.simMeal}>{sim.meal}</span>
              <span style={{ ...styles.simImpact, color: sim.impact.includes('+') ? '#ff4444' : '#00ff9d' }}>{sim.impact}</span>
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

      <div style={styles.grid}>
        <div style={styles.card}>
          <p style={styles.sectionTitle}>SMART SWAPS</p>
          {result.smart_swaps?.map((s, i) => (
            <div key={i} style={styles.swapCard}>
              <p style={styles.swapText}>{s.swap}</p>
              <p style={styles.swapBenefit}>{s.benefit}</p>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <p style={styles.sectionTitle}>MICRONUTRIENTS</p>
          <div style={styles.microGrid}>
            {[
              { label: 'Calcium', value: result.micronutrients?.calcium },
              { label: 'Iron', value: result.micronutrients?.iron },
              { label: 'Vitamin C', value: result.micronutrients?.vitamin_c },
              { label: 'Vitamin D', value: result.micronutrients?.vitamin_d },
            ].map(m => (
              <div key={m.label} style={styles.microCard}>
                <p style={styles.microVal}>{m.value}</p>
                <p style={styles.microLabel}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <p style={styles.sectionTitle}>WORKOUT TIMING</p>
        <div style={styles.workoutGrid}>
          {[
            { label: 'Pre-workout', value: result.workout_timing?.pre_workout },
            { label: 'Post-workout', value: result.workout_timing?.post_workout },
            { label: 'Best time to eat', value: result.workout_timing?.best_time_to_eat },
          ].map(w => (
            <div key={w.label} style={styles.workoutCard}>
              <p style={styles.workoutLabel}>{w.label}</p>
              <p style={{ ...styles.workoutVal, color: w.value === 'Good' ? '#00ff9d' : w.value === 'Bad' ? '#ff4444' : '#ffaa00' }}>{w.value}</p>
            </div>
          ))}
        </div>
      </div>

      {result.cheat_meal_recovery?.is_cheat_meal && (
        <div style={styles.cheatCard}>
          <p style={styles.sectionTitle}>CHEAT MEAL RECOVERY PLAN</p>
          {result.cheat_meal_recovery?.recovery_tips?.map((tip, i) => (
            <div key={i} style={styles.recRow}>
              <span style={{ ...styles.recNum, color: '#ff4444' }}>0{i + 1}</span>
              <p style={styles.recText}>{tip}</p>
            </div>
          ))}
        </div>
      )}

      {result.indian_food_analysis?.is_indian && (
        <div style={styles.indianCard}>
          <p style={styles.sectionTitle}>INDIAN FOOD ANALYSIS</p>
          <div style={styles.grid}>
            <div>
              <p style={styles.indianLabel}>Traditional Benefits</p>
              <p style={styles.indianText}>{result.indian_food_analysis?.traditional_benefits}</p>
            </div>
            <div>
              <p style={styles.indianLabel}>Modern Health Take</p>
              <p style={styles.indianText}>{result.indian_food_analysis?.modern_health_take}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0f0d', padding: '24px', fontFamily: 'sans-serif' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
  headerSub: { color: '#444', fontSize: '11px', letterSpacing: '2px', margin: '0 0 4px' },
  headerTitle: { color: '#00ff9d', fontWeight: 'bold', fontSize: '20px', margin: 0 },
  backBtn: { padding: '10px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '14px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '12px', marginBottom: '20px' },
  statCard: { background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px' },
  statLabel: { color: '#555', fontSize: '10px', letterSpacing: '1.5px', margin: '0 0 8px' },
  statVal: { fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px' },
  statSub: { color: '#555', fontSize: '11px', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px', marginBottom: '16px' },
  sectionTitle: { color: '#00ff9d', fontSize: '11px', letterSpacing: '2px', margin: '0 0 12px' },
  sectionDesc: { color: '#555', fontSize: '13px', margin: '0 0 14px' },
  simRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '11px 14px', marginBottom: '8px' },
  simMeal: { color: '#ddd', fontSize: '13px', fontWeight: 'bold' },
  simImpact: { fontSize: '15px', fontWeight: 'bold' },
  recRow: { display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' },
  recNum: { color: '#00ff9d', fontWeight: 'bold', fontSize: '14px', minWidth: '22px' },
  recText: { color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 },
  swapCard: { background: 'rgba(0,255,157,0.04)', border: '1px solid rgba(0,255,157,0.12)', borderRadius: '8px', padding: '12px', marginBottom: '10px' },
  swapText: { color: '#00ff9d', fontWeight: 'bold', fontSize: '13px', margin: '0 0 4px' },
  swapBenefit: { color: '#777', fontSize: '12px', margin: 0 },
  microGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  microCard: { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', textAlign: 'center' },
  microVal: { fontWeight: 'bold', fontSize: '17px', color: '#00ff9d', margin: '0 0 4px' },
  microLabel: { color: '#555', fontSize: '12px', margin: 0 },
  workoutGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' },
  workoutCard: { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '14px', textAlign: 'center' },
  workoutLabel: { color: '#555', fontSize: '12px', margin: '0 0 8px' },
  workoutVal: { fontWeight: 'bold', fontSize: '16px', margin: 0 },
  cheatCard: { background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.15)', borderRadius: '12px', padding: '20px', marginBottom: '16px' },
  indianCard: { background: 'rgba(255,165,0,0.05)', border: '1px solid rgba(255,165,0,0.15)', borderRadius: '12px', padding: '20px', marginBottom: '16px' },
  indianLabel: { color: '#ffaa00', fontSize: '12px', letterSpacing: '1px', margin: '0 0 8px' },
  indianText: { color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 },
}