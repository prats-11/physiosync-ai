export default function ResultsScreen({ result, onDashboard }) {
  const gradeColor = { A: '#00ff9d', B: '#88ff00', C: '#ffaa00', D: '#ff6600', F: '#ff4444' }

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
            <p style={styles.cuisine}>{result.cuisine_type} Cuisine · Today · Just now</p>
          </div>
          <button style={styles.dashBtn} onClick={onDashboard}>View Dashboard →</button>
        </div>

        {/* Meal Grade */}
        <div style={styles.gradeRow}>
          <div style={{...styles.gradeCircle, borderColor: gradeColor[result.meal_grade] || '#00ff9d'}}>
            <span style={{...styles.gradeLetter, color: gradeColor[result.meal_grade] || '#00ff9d'}}>{result.meal_grade}</span>
          </div>
          <div>
            <p style={styles.gradeLabel}>Meal Grade</p>
            <p style={styles.gradeReason}>{result.meal_grade_reason}</p>
          </div>
          <div style={styles.scoreCircle}>
            <span style={styles.scoreNum}>{result.health_score}</span>
            <span style={styles.scoreMax}>/100</span>
          </div>
          <div>
            <p style={styles.gradeLabel}>Health Score</p>
            <p style={styles.healthLabel}>{result.health_label}</p>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.section}>
            <p style={styles.sectionTitle}>CALORIE ESTIMATION</p>
            <h1 style={styles.calories}>{result.calories} <span style={styles.unit}>kcal</span></h1>
            {[
              { label: 'Protein', value: result.nutrition?.protein, color: '#00ff9d' },
              { label: 'Carbs', value: result.nutrition?.carbs, color: '#4488ff' },
              { label: 'Fats', value: result.nutrition?.fats, color: '#ffaa00' },
              { label: 'Fiber', value: result.nutrition?.fiber, color: '#00ffcc' },
            ].map(m => (
              <div key={m.label} style={styles.macroRow}>
                <span style={styles.macroLabel}>{m.label}</span>
                <div style={styles.macroBar}><div style={{ ...styles.macroFill, background: m.color, width: '60%' }} /></div>
                <span style={styles.macroVal}>{m.value}</span>
              </div>
            ))}
          </div>

          <div style={styles.section}>
            <p style={styles.sectionTitle}>AI INSIGHTS</p>
            {result.insights?.map((insight, i) => (
              <div key={i} style={styles.insight}>
                <span style={{ color: ['#00ff9d', '#4488ff', '#ffaa00'][i] }}>●</span>
                <p style={styles.insightText}>{insight}</p>
              </div>
            ))}
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
            <p style={styles.sectionTitle}>🏋️ WORKOUT TIMING</p>
            <div style={styles.workoutGrid}>
              {[
                { label: 'Pre-Workout', value: result.workout_timing?.pre_workout },
                { label: 'Post-Workout', value: result.workout_timing?.post_workout },
                { label: 'Best Time', value: result.workout_timing?.best_time_to_eat },
              ].map(w => (
                <div key={w.label} style={styles.workoutCard}>
                  <p style={styles.workoutLabel}>{w.label}</p>
                  <p style={{ ...styles.workoutVal, color: w.value === 'Good' ? '#00ff9d' : w.value === 'Bad' ? '#ff4444' : '#ffaa00' }}>{w.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Swaps */}
        <div style={styles.section}>
          <p style={styles.sectionTitle}>🔄 SMART SWAPS</p>
          <div style={styles.swapGrid}>
            {result.smart_swaps?.map((s, i) => (
              <div key={i} style={styles.swapCard}>
                <p style={styles.swapText}>{s.swap}</p>
                <p style={styles.swapBenefit}>{s.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cheat Meal Recovery */}
        {result.cheat_meal_recovery?.is_cheat_meal && (
          <div style={styles.cheatSection}>
            <p style={styles.sectionTitle}>🚨 CHEAT MEAL RECOVERY PLAN</p>
            {result.cheat_meal_recovery?.recovery_tips?.map((tip, i) => (
              <div key={i} style={styles.recoveryTip}>
                <span style={styles.tipNum}>0{i+1}</span>
                <p style={styles.tipText}>{tip}</p>
              </div>
            ))}
          </div>
        )}

        {/* Indian Food Analysis */}
        {result.indian_food_analysis?.is_indian && (
          <div style={styles.indianSection}>
            <p style={styles.sectionTitle}>🇮🇳 INDIAN FOOD ANALYSIS</p>
            <div style={styles.indianGrid}>
              <div style={styles.indianCard}>
                <p style={styles.indianLabel}>Traditional Benefits</p>
                <p style={styles.indianText}>{result.indian_food_analysis?.traditional_benefits}</p>
              </div>
              <div style={styles.indianCard}>
                <p style={styles.indianLabel}>Modern Health Take</p>
                <p style={styles.indianText}>{result.indian_food_analysis?.modern_health_take}</p>
              </div>
            </div>
          </div>
        )}

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
  cuisine: { color: '#666', fontSize: '13px', marginTop: '4px' },
  dashBtn: { padding: '10px 20px', background: '#00ff9d', border: 'none', borderRadius: '8px', color: '#0a0f0d', fontWeight: 'bold', cursor: 'pointer' },
  gradeRow: { display: 'flex', alignItems: 'center', gap: '25px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '20px', marginBottom: '20px' },
  gradeCircle: { width: '70px', height: '70px', borderRadius: '50%', border: '3px solid #00ff9d', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  gradeLetter: { fontSize: '32px', fontWeight: 'bold' },
  gradeLabel: { color: '#666', fontSize: '12px', letterSpacing: '1px', marginBottom: '4px' },
  gradeReason: { color: '#ccc', fontSize: '14px' },
  scoreCircle: { width: '70px', height: '70px', borderRadius: '50%', border: '3px solid #00ff9d', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginLeft: 'auto' },
  scoreNum: { fontSize: '22px', fontWeight: 'bold', color: '#00ff9d' },
  scoreMax: { fontSize: '11px', color: '#666' },
  healthLabel: { color: '#fff', fontWeight: 'bold', fontSize: '14px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
  section: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px', marginBottom: '15px' },
  sectionTitle: { color: '#00ff9d', fontSize: '11px', letterSpacing: '2px', marginBottom: '15px' },
  calories: { fontSize: '48px', fontWeight: 'bold', color: '#00ff9d' },
  unit: { fontSize: '20px', color: '#666' },
  macroRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' },
  macroLabel: { color: '#666', fontSize: '13px', width: '55px' },
  macroBar: { flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' },
  macroFill: { height: '100%', borderRadius: '3px' },
  macroVal: { color: '#fff', fontSize: '13px', width: '40px', textAlign: 'right' },
  tags: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '15px' },
  tag: { padding: '4px 10px', background: 'rgba(0,255,157,0.1)', border: '1px solid rgba(0,255,157,0.3)', borderRadius: '20px', color: '#00ff9d', fontSize: '12px' },
  insight: { display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' },
  insightText: { color: '#ccc', fontSize: '14px', lineHeight: '1.5' },
  microGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  microCard: { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', textAlign: 'center' },
  microVal: { fontWeight: 'bold', fontSize: '18px', margin: '5px 0' },
  microLabel: { color: '#666', fontSize: '12px' },
  workoutGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' },
  workoutCard: { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', textAlign: 'center' },
  workoutLabel: { color: '#666', fontSize: '12px', marginBottom: '8px' },
  workoutVal: { fontWeight: 'bold', fontSize: '16px' },
  swapGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  swapCard: { background: 'rgba(0,255,157,0.05)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: '10px', padding: '15px' },
  swapText: { color: '#00ff9d', fontWeight: 'bold', fontSize: '14px', marginBottom: '6px' },
  swapBenefit: { color: '#888', fontSize: '13px' },
  cheatSection: { background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.2)', borderRadius: '12px', padding: '20px', marginBottom: '15px' },
  recoveryTip: { display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' },
  tipNum: { color: '#ff4444', fontWeight: 'bold', fontSize: '16px', minWidth: '25px' },
  tipText: { color: '#ccc', fontSize: '14px', lineHeight: '1.5' },
  indianSection: { background: 'rgba(255,165,0,0.05)', border: '1px solid rgba(255,165,0,0.2)', borderRadius: '12px', padding: '20px', marginBottom: '15px' },
  indianGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  indianCard: { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '15px' },
  indianLabel: { color: '#ffaa00', fontSize: '12px', letterSpacing: '1px', marginBottom: '8px' },
  indianText: { color: '#ccc', fontSize: '14px', lineHeight: '1.6' },
  impact: { fontSize: '24px', fontWeight: 'bold', color: '#00ff9d' },
}