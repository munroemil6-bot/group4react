import { useState, useEffect } from 'react'
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";
// import Login from "./components/Login";
/**import LogoutButton from "./components/LogoutButton";**/
import { useAuth } from "./hooks/useAuth";
import './App.css'

function App() {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  
  const defaultStudents = [
    { id: 1, text: "Myles (president)", votes: 9},
    { id: 2, text: "Enoch (Vice resident)", votes: 14},
    { id: 3, text: "Jane (Secretary)", votes: 7},
  ];

  const [options, setOptions] = useState(() => {
    const saved = localStorage.getItem("studentPoll");
    return saved ? JSON.parse(saved) : defaultStudents;
  });

  const [hasVoted, setHasVoted] = useState(false);

  // Load user's voting status when user changes
  useEffect(() => {
    if (user) {
      const userVoteStatus = localStorage.getItem(`hasVoted_${user.uid}`);
      setHasVoted(userVoteStatus === "true");
    } else {
      setHasVoted(false);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("studentPoll", JSON.stringify(options));
  }, [options]);

  // Save user's vote status separately per user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`hasVoted_${user.uid}`, hasVoted);
    }
  }, [hasVoted, user]);

  const addOption = (text) => {
    const newOption = {
      id: Date.now(),
      text,
      votes: 0,
      isCustom: true,
    };
    setOptions([...options, newOption]);
  };

  const vote = (id) => {
    if (hasVoted) return;

    const updated = options.map((opt) =>
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
    );

    setOptions(updated);
    setHasVoted(true);
  };

  const deleteOption = (id) => {
    const updated = options.filter((opt) => opt.id !== id);
    setOptions(updated);
  };

  const resetVotes = () => {
    const reset = options.map((opt) => ({ ...opt, votes: 0 }));
    setOptions(reset);
    setHasVoted(false);
    if (user) {
      localStorage.setItem(`hasVoted_${user.uid}`, "false");
    }
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!user) {
    return <Login onLogin={signInWithGoogle} />;
  }

  // Show voting app if authenticated
  return (
    <>
      <div className="min-h-screen bg-blue-50 p-4">
        <div className="mx-auto max-w-xl">
          <LogoutButton user={user} onLogout={logout} />
          
          <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
            Student Council Voting
          </h1>

          <PollForm addOption={addOption} />

          <PollList
            options={options}
            vote={vote}
            hasVoted={hasVoted}
            deleteOption={deleteOption}
          />

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
    </>
  );
}

export default App;