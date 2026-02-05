import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Stats.css'

function Stats() {
  const [stats, setStats] = useState({ totalUses: 0, lastUsed: null })

  useEffect(() => {
    const storedStats = JSON.parse(localStorage.getItem('humanizerStats') || '{"totalUses":0,"lastUsed":null}')
    setStats(storedStats)
  }, [])

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the counter?')) {
      localStorage.setItem('humanizerStats', JSON.stringify({ totalUses: 0, lastUsed: null }))
      setStats({ totalUses: 0, lastUsed: null })
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="stats-page">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="nav-link">Humanizer</Link>
          <Link to="/stats" className="nav-link active">Stats</Link>
        </nav>

        <h1>📊 Usage Statistics</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{stats.totalUses.toLocaleString()}</div>
            <div className="stat-label">Total Humanizations</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🕐</div>
            <div className="stat-value">{formatDate(stats.lastUsed)}</div>
            <div className="stat-label">Last Used</div>
          </div>
        </div>

        <div className="info-box">
          <h3>ℹ️ About This Tracker</h3>
          <p>This counter tracks how many times you've used the AI Text Humanizer functionality. The data is stored locally in your browser and persists between sessions.</p>
          <p><strong>Note:</strong> This is a personal counter. Different browsers or devices will have separate counts.</p>
        </div>

        <button onClick={handleReset} className="reset-btn">
          🔄 Reset Counter
        </button>
      </div>
    </div>
  )
}

export default Stats
