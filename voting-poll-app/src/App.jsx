import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import LoginPage from './components/LoginPage'
import PollForm from './components/PollForm'
import PollList from './components/PollList'
import { auth } from './firebase'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [options, setOptions] = useState([])

  const userKey = currentUser?.uid

  const votedOption = userKey
    ? options.find((option) => option.votedBy?.includes(userKey))
    : null

  const hasVoted = Boolean(votedOption)

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0)

  // 🔐 AUTH LISTENER
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      console.log("USER:", user)
      setCurrentUser(user)
      setAuthLoading(false)
    })
  }, [])

  // 📡 FETCH OPTIONS
   useEffect(() => {
    fetch("http://localhost:3000/options")
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (authLoading) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <p className="text-center">Checking account status...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return <LoginPage />
  }

  const addOption = async (text) => {
    const newOption = {
      text,
      votes: 0,
      votedBy: [],
      isCustom: true,
    }

    try {
      const res = await fetch("http://localhost:3000/options", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOption),
      })

      const data = await res.json()
      console.log("ADDED:", data)

      setOptions((prev) => [...prev, data])
    } catch (err) {
      console.error("Error adding option:", err)
    }
  }
  
  
  const vote = async (id) => {
    if (!userKey || hasVoted) return

    const option = options.find((opt) => String(opt.id) === String(id))
    if (!option) return

    const votedBy = option.votedBy ?? []
    if (votedBy.includes(userKey)) return

    const res = await fetch(`http://localhost:3000/options/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes: option.votes + 1,
        votedBy: [...votedBy, userKey],
      }),
    })

    const updated = await res.json()

    setOptions((prev) =>
      prev.map((opt) => (String(opt.id) === String(id) ? updated : opt))
    )
  }

  const deleteOption = async (id) => {
    try {
      await fetch(`http://localhost:3000/options/${id}`, {
        method: "DELETE",
      })

      setOptions((prev) =>
        prev.filter((opt) => String(opt.id) !== String(id))
      )
    } catch (err) {
      console.error("Error deleting option:", err)
    }
  }

  const resetVote = async () => {
    if (!userKey || !votedOption) return

    const votedBy = votedOption.votedBy ?? []

    const res = await fetch(
      `http://localhost:3000/options/${votedOption.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          votes: Math.max(0, votedOption.votes - 1),
          votedBy: votedBy.filter((id) => id !== userKey),
        }),
      }
    )

    const updated = await res.json()

    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === votedOption.id ? updated : opt
      )
    )
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
        Student Council Voting
      </h1>

      <div className="mx-auto max-w-xl">
        <div className="mb-4 flex items-center justify-between">
          <span>
            Signed in as <strong>{currentUser.email}</strong>
          </span>
          <button
            className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
            onClick={() => signOut(auth)}
          >
            Sign Out
          </button>
        </div>

        <PollForm addOption={addOption} options={options} />

        <PollList
          options={options}
          vote={vote}
          hasVoted={hasVoted}
          deleteOption={deleteOption}
          totalVotes={totalVotes}
        />

        {hasVoted && (
          <div className="mt-4 text-center">
            <p className="text-green-600">
              Thanks for voting, {currentUser.email}! You voted for{" "}
              {votedOption.text}.
            </p>
            <button
              onClick={resetVote}
              className="mt-3 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Reset My Vote
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App