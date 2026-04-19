import { useState, useRef } from 'react'

export default function UploadScreen({ onAnalyze }) {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [goal, setGoal] = useState('Lose Weight')
  const [activity, setActivity] = useState('Moderate')
  const fileRef = useRef()

  const handleImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    if (!image || !weight || !height || !age) return alert('Fill all fields')
    onAnalyze({ image, weight, height, age, goal, activity })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.logo}>⚡ PhysioSync AI</span>
        <span style={styles.subtitle}>METABOLISM SIMULATOR</span>
      </div>

      <div style={styles.card}>
        <p style={styles.step}>STEP 1 OF 3 · MEAL UPLOAD</p>
        <h1 style={styles.title}>Upload Your <span style={styles.accent}>Meal Photo</span></h1>
        <p style={styles.desc}>AI will analyse nutrition and simulate your body's response</p>

        <div style={styles.grid}>
          <div>
            <div style={styles.uploadBox} onClick={() => fileRef.current.click()}>
              {preview ? (
                <img src={preview} alt="meal" style={styles.preview} />
              ) : (
                <>
                  <div style={styles.uploadIcon}>🖼️</div>
                  <p style={styles.uploadText}>Drag & drop your meal photo</p>
                  <p style={styles.uploadSub}>or click to browse files</p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
            <button style={styles.uploadBtn} onClick={() => fileRef.current.click()}>
              📸 Upload Meal Photo
            </button>
          </div>

          <div>
            <div style={styles.section}>
              <p style={styles.sectionTitle}>BODY PROFILE</p>
              <div style={styles.inputGrid}>
                <div>
                  <label style={styles.label}>Weight (kg)</label>
                  <input style={styles.input} type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="72" />
                </div>
                <div>
                  <label style={styles.label}>Height (cm)</label>
                  <input style={styles.input} type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" />
                </div>
                <div>
                  <label style={styles.label}>Age</label>
                  <input style={styles.input} type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="22" />
                </div>
                <div>
                  <label style={styles.label}>Activity Level</label>
                  <select style={styles.input} value={activity} onChange={e => setActivity(e.target.value)}>
                    <option>Sedentary</option>
                    <option>Light</option>
                    <option>Moderate</option>
                    <option>Active</option>
                    <option>Very Active</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <p style={styles.sectionTitle}>YOUR GOAL</p>
              <div style={styles.goalGrid}>
                {['Lose Weight', 'Build Muscle', 'Maintain', 'Performance'].map(g => (
                  <button key={g} style={goal === g ? styles.goalActive : styles.goalBtn} onClick={() => setGoal(g)}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <button style={styles.analyzeBtn} onClick={handleSubmit}>
              Analyse with AI →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0f0d', padding: '20px' },
  header: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' },
  logo: { color: '#00ff9d', fontWeight: 'bold', fontSize: '18px' },
  subtitle: { color: '#666', fontSize: '12px', letterSpacing: '2px' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,157,0.15)', borderRadius: '16px', padding: '30px', backdropFilter: 'blur(10px)' },
  step: { color: '#00ff9d', fontSize: '12px', letterSpacing: '2px', marginBottom: '8px' },
  title: { fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' },
  accent: { color: '#00ff9d' },
  desc: { color: '#666', marginBottom: '30px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' },
  uploadBox: { border: '2px dashed rgba(0,255,157,0.3)', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer', marginBottom: '15px', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  uploadIcon: { fontSize: '40px', marginBottom: '10px' },
  uploadText: { color: '#fff', fontWeight: 'bold', marginBottom: '5px' },
  uploadSub: { color: '#666', fontSize: '14px' },
  preview: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' },
  uploadBtn: { width: '100%', padding: '12px', background: 'rgba(0,255,157,0.1)', border: '1px solid rgba(0,255,157,0.3)', borderRadius: '8px', color: '#00ff9d', cursor: 'pointer', fontSize: '15px' },
  section: { marginBottom: '20px' },
  sectionTitle: { color: '#00ff9d', fontSize: '12px', letterSpacing: '2px', marginBottom: '12px' },
  inputGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  label: { color: '#666', fontSize: '13px', display: 'block', marginBottom: '5px' },
  input: { width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '15px' },
  goalGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  goalBtn: { padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', cursor: 'pointer' },
  goalActive: { padding: '12px', background: 'rgba(0,255,157,0.15)', border: '1px solid #00ff9d', borderRadius: '8px', color: '#00ff9d', cursor: 'pointer', fontWeight: 'bold' },
  analyzeBtn: { width: '100%', padding: '15px', background: '#00ff9d', border: 'none', borderRadius: '8px', color: '#0a0f0d', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
}