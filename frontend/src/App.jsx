import { useState } from 'react'
import UploadScreen from './components/UploadScreen'
import ProcessingScreen from './components/ProcessingScreen'
import ResultsScreen from './components/ResultsScreen'
import DashboardScreen from './components/DashboardScreen'

function App() {
  const [screen, setScreen] = useState('upload')
  const [formData, setFormData] = useState(null)
  const [result, setResult] = useState(null)

  return (
    <div>
      {screen === 'upload' && (
        <UploadScreen
          onAnalyze={(data) => {
            setFormData(data)
            setScreen('processing')
          }}
        />
      )}
      {screen === 'processing' && (
        <ProcessingScreen
          formData={formData}
          onDone={(data) => {
            setResult(data)
            setScreen('results')
          }}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          result={result}
          onDashboard={() => setScreen('dashboard')}
        />
      )}
      {screen === 'dashboard' && (
        <DashboardScreen result={result} />
      )}
    </div>
  )
}

export default App