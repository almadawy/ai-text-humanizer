import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Stats from './Stats'

function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const humanizeText = (text) => {
    if (!text.trim()) return ''

    // Track usage
    const stats = JSON.parse(localStorage.getItem('humanizerStats') || '{"totalUses":0,"lastUsed":null}')
    stats.totalUses += 1
    stats.lastUsed = new Date().toISOString()
    localStorage.setItem('humanizerStats', JSON.stringify(stats))

    let result = text
      // Vary sentence structure by splitting and recombining
      .split(/(?<=[.!?])\s+/)
      .map(sentence => {
        // Add occasional hesitation markers
        if (Math.random() > 0.85) {
          const hesitation = ['...', 'hmm', 'well', 'actually', 'you know'][Math.floor(Math.random() * 5)]
          return `${hesitation} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`
        }

        // Vary punctuation occasionally
        if (Math.random() > 0.9) {
          const punct = ['!', '~', '...'][Math.floor(Math.random() * 3)]
          return sentence.replace(/[.!?]$/, punct)
        }

        return sentence
      })
      .join(' ')
      // Add occasional conversational fillers
      .replace(/\b(very|really|quite)\b/g, () => {
        const intensifiers = ['pretty', 'kinda', 'sorta', 'honestly', 'tbh']
        return intensifiers[Math.floor(Math.random() * intensifiers.length)]
      })
      // Add some natural "imperfections"
      .replace(/\b(because|therefore|however|moreover)\b/gi, (match) => {
        const casual = ['cuz', 'so', 'but', 'plus'][Math.floor(Math.random() * 4)]
        return casual
      })
      // Remove overly formal words
      .replace(/\b(utilize|leverage|optimize|facilitate)\b/gi, (match) => {
        const simple = ['use', 'use', 'improve', 'help'][Math.floor(Math.random() * 4)]
        return simple
      })
      // Add contractions where natural
      .replace(/\b(do not|does not|did not|cannot|will not)\b/gi, (match) => {
        const contractions = { 'do not': "don't", 'does not': "doesn't", 'did not': "didn't", 'cannot': "can't", 'will not': "won't" }
        return contractions[match.toLowerCase()]
      })

    return result
  }

  const handleScan = () => {
    setOutput(humanizeText(input))
  }

  return (
    <div className="app">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="nav-link active">Humanizer</Link>
          <Link to="/stats" className="nav-link">Stats</Link>
        </nav>

        <h1>🤖 AI Text Humanizer</h1>
        <p className="subtitle">Make your AI-generated text sound naturally human</p>

        <div className="input-section">
          <label htmlFor="input-text">Paste your AI-generated text below:</label>
          <textarea
            id="input-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            rows={10}
          />
          <button onClick={handleScan} className="scan-btn">
            🔍 Humanize Text
          </button>
        </div>

        {output && (
          <div className="output-section">
            <label>Humanized output:</label>
            <div className="output-box">{output}</div>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="copy-btn"
            >
              📋 Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename="/ai-text-humanizer">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
