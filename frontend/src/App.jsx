import { useState } from 'react'
import LandingPage from './components/LandingPage'
import UploadScreen from './components/UploadScreen'
import ProcessingScreen from './components/ProcessingScreen'
import ResultsScreen from './components/ResultsScreen'
import DashboardScreen from './components/DashboardScreen'

function App() {
  const [screen, setScreen] = useState('landing')
  const [formData, setFormData] = useState(null)
  const [result, setResult] = useState(null)

  return (
    <div>
      {screen === 'landing' && (
        <LandingPage onStart={() => setScreen('upload')} />
      )}
      {screen === 'upload' && (
        <UploadScreen onAnalyze={(data) => { setFormData(data); setScreen('processing') }} />
      )}
      {screen === 'processing' && (
        <ProcessingScreen formData={formData} onDone={(data) => { setResult(data); setScreen('results') }} />
      )}
      {screen === 'results' && (
        <ResultsScreen result={result} onDashboard={() => setScreen('dashboard')} />
      )}
      {screen === 'dashboard' && (
        <DashboardScreen result={result} onBack={() => setScreen('upload')} />
      )}
    </div>
  )
}

export default App