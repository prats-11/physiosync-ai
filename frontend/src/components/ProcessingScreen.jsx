import { useEffect } from 'react'
import axios from 'axios'

export default function ProcessingScreen({ formData, onDone }) {
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
        onDone(res.data)
      } catch (err) {
        console.error(err)
        alert('Error analyzing meal. Try again.')
      }
    }
    analyze()
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>⚡ PhysioSync AI</span>
        <span style={styles.badge}>● AI Processing</span>
      </div>

      <div style={styles.card}>
        <div style={styles.circle}>
          <div style={styles.spinner} />
          <span style={styles.percent}>AI</span>
        </div>

        <h2 style={styles.title}>Analysing your meal <span style={styles.accent}>using AI...</span></h2>
        <p style={styles.desc}>Gemini multimodal vision is identifying ingredients and estimating portions</p>

        <div style={styles.steps}>
          <div style={styles.step}>
            <span>🧠</span>
            <p style={styles.stepLabel}>Image parsed</p>
            <p style={styles.stepStatus}>✓ Done</p>
          </div>
          <div style={styles.step}>
            <span>🤖</span>
            <p style={styles.stepLabel}>AI analysis</p>
            <p style={styles.stepStatus}>Running...</p>
          </div>
          <div style={styles.step}>
            <span>📊</span>
            <p style={styles.stepLabel}>Simulation</p>
            <p style={styles.stepStatus}>Queued</p>
          </div>
        </div>

        <div style={styles.poweredBy}>
          Powered by Google Gemini AI · Multimodal Vision + Reasoning
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0f0d', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  header: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', width: '100%' },
  logo: { color: '#00ff9d', fontWeight: 'bold', fontSize: '18px' },
  badge: { marginLeft: 'auto', color: '#00ff9d', background: 'rgba(0,255,157,0.1)', border: '1px solid rgba(0,255,157,0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: '16px', padding: '50px', backdropFilter: 'blur(10px)', textAlign: 'center', maxWidth: '600px', width: '100%' },
  circle: { width: '120px', height: '120px', borderRadius: '50%', border: '4px solid rgba(0,255,157,0.2)', borderTop: '4px solid #00ff9d', animation: 'spin 1s linear infinite', margin: '0 auto 30px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  spinner: { position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '4px solid transparent', borderTop: '4px solid #00ff9d', animation: 'spin 1s linear infinite' },
  percent: { color: '#00ff9d', fontSize: '20px', fontWeight: 'bold' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' },
  accent: { color: '#00ff9d' },
  desc: { color: '#666', marginBottom: '30px' },
  steps: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '30px' },
  step: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: '10px', padding: '15px', fontSize: '13px' },
  stepLabel: { color: '#00ff9d', fontWeight: 'bold', margin: '8px 0 4px' },
  stepStatus: { color: '#666' },
  poweredBy: { background: 'rgba(0,255,157,0.05)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: '20px', padding: '10px 20px', color: '#666', fontSize: '13px' },
}