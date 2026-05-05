import { useState } from 'react'
import LoginPage from './components/LoginPage'
import PollForm from './components/PollForm'
import PollList from './components/PollList'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [options, setOptions] = useState([
    { id: 1, text: 'Option A', votes: 0 },
    { id: 2, text: 'Option B', votes: 0 },
  ])
  const [hasVoted, setHasVoted] = useState(false)

  if (!currentUser) {
    return <LoginPage onLogin={(username) => setCurrentUser(username)} />
  }

  function addOption(text) {
    setOptions((prev) => [...prev, { id: Date.now(), text, votes: 0 }])
  }

  function vote(id) {
    if (hasVoted) return
    setOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, votes: o.votes + 1 } : o))
    )
    setHasVoted(true)
  }

  function deleteOption(id) {
    setOptions((prev) => prev.filter((o) => o.id !== id))
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>Voting Poll App</h1>
        <div className="user-info">
          <span>Signed in as <strong>{currentUser}</strong></span>
          <button className="logout-btn" onClick={() => setCurrentUser(null)}>
            Sign Out
          </button>
        </div>
      </header>

      <main className="app-main">
        <PollForm addOption={addOption} />
        <PollList
          options={options}
          vote={vote}
          hasVoted={hasVoted}
          deleteOption={deleteOption}
        />
        {hasVoted && <p className="voted-msg">Thanks for voting, {currentUser}!</p>}
      </main>
    </div>
  )
}

export default App
