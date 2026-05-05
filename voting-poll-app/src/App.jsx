import { useState, useEffect } from 'react'
import LoginPage from './components/LoginPage'
import PollForm from './components/PollForm'
import PollList from './components/PollList'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [options, setOptions] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/options")
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (!currentUser) {
    return <LoginPage onLogin={(username) => setCurrentUser(username)} />
  }

  const addOption = async (text) => {
    const newOption = {
      text,
      votes: 0,
      isCustom: true,
    };

    try {
      const res = await fetch("http://localhost:3000/options", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOption),
      });

      const data = await res.json();
      setOptions((prev) => [...prev, data]);
    } catch (err) {
      console.error("Error adding option:", err);
    }
  };

  const vote = async (id) => {
    if (hasVoted) return;

    const option = options.find((opt) => opt.id === id);
    if (!option) return;

    try {
      const res = await fetch(`http://localhost:3000/options/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          votes: option.votes + 1,
        }),
      });

      const updated = await res.json();

      setOptions((prev) =>
        prev.map((opt) => (opt.id === id ? updated : opt))
      );

      setHasVoted(true);
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  const deleteOption = async (id) => {
    try {
      await fetch(`http://localhost:3000/options/${id}`, {
        method: "DELETE",
      });

      setOptions((prev) => prev.filter((opt) => opt.id !== id));
    } catch (err) {
      console.error("Error deleting option:", err);
    }
  };

  const resetVotes = async () => {
    try {
      const resetOptions = options.map((opt) => ({
        ...opt,
        votes: 0,
      }));

      await Promise.all(
        resetOptions.map((opt) =>
          fetch(`http://localhost:3000/options/${opt.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ votes: 0 }),
          })
        )
      );

      setOptions(resetOptions);
      setHasVoted(false);
    } catch (err) {
      console.error("Error resetting votes:", err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
        Student Council Voting
      </h1>

      <div className="mx-auto max-w-xl">
        <div className="mb-4 flex items-center justify-between">
          <span>Signed in as <strong>{currentUser}</strong></span>
          <button
            className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
            onClick={() => setCurrentUser(null)}
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
        />

        {hasVoted && (
          <p className="mt-4 text-center text-green-600">
            Thanks for voting, {currentUser}!
          </p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={resetVotes}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Reset Votes
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
