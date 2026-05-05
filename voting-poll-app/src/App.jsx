import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import PositionCard from './components/PositionCard';
import { useAuth } from './hooks/useAuth';
import './App.css';

// Fixed positions and candidates data
const initialPositions = [
  {
    id: 1,
    title: "🎓 President",
    candidates: [
      { id: 1, name: "Myles M.", description: "Leadership & Innovation", votes: 0 },
      { id: 2, name: "Enoch K.", description: "Community First", votes: 0 },
      { id: 3, name: "Jane W.", description: "Student Voice", votes: 0 }
    ]
  },
  {
    id: 2,
    title: "📚 Vice President",
    candidates: [
      { id: 4, name: "Sarah J.", description: "Academic Excellence", votes: 0 },
      { id: 5, name: "John D.", description: "Student Welfare", votes: 0 },
      { id: 6, name: "Mary A.", description: "Innovation & Change", votes: 0 }
    ]
  },
  {
    id: 3,
    title: "💰 Treasurer",
    candidates: [
      { id: 7, name: "Peter O.", description: "Financial Accountability", votes: 0 },
      { id: 8, name: "Lucy M.", description: "Budget Management", votes: 0 },
      { id: 9, name: "James K.", description: "Transparency First", votes: 0 }
    ]
  }
];

function App() {
  const { user, loading, logout } = useAuth();
  const [positions, setPositions] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('votingData');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialPositions;
  });
  
  // Track which positions the user has voted for
  const [hasVoted, setHasVoted] = useState({});

  // Load user's vote status from localStorage when user logs in
  useEffect(() => {
    if (user) {
      const savedVotes = localStorage.getItem(`votes_${user.uid}`);
      if (savedVotes) {
        setHasVoted(JSON.parse(savedVotes));
      } else {
        setHasVoted({});
      }
    }
  }, [user]);

  // Save voting data to localStorage whenever positions change
  useEffect(() => {
    localStorage.setItem('votingData', JSON.stringify(positions));
  }, [positions]);

  // Save user's vote status to localStorage
  useEffect(() => {
    if (user && Object.keys(hasVoted).length > 0) {
      localStorage.setItem(`votes_${user.uid}`, JSON.stringify(hasVoted));
    }
  }, [hasVoted, user]);

  const handleVote = (positionId, candidateId) => {
    // Check if user already voted for this position
    if (hasVoted[positionId]) {
      alert("You have already voted for this position!");
      return;
    }

    // Update the vote count
    setPositions(prevPositions =>
      prevPositions.map(position => {
        if (position.id === positionId) {
          return {
            ...position,
            candidates: position.candidates.map(candidate =>
              candidate.id === candidateId
                ? { ...candidate, votes: candidate.votes + 1 }
                : candidate
            )
          };
        }
        return position;
      })
    );

    // Mark this position as voted
    setHasVoted(prev => ({
      ...prev,
      [positionId]: true
    }));

    // Success message
    const position = positions.find(p => p.id === positionId);
    const candidate = position?.candidates.find(c => c.id === candidateId);
    alert(`✓ You voted for ${candidate?.name} as ${position?.title}!`);
  };

  const getTotalVotes = () => {
    let total = 0;
    positions.forEach(position => {
      position.candidates.forEach(candidate => {
        total += candidate.votes;
      });
    });
    return total;
  };

  const getVotedCount = () => {
    return Object.keys(hasVoted).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const totalVotes = getTotalVotes();
  const votedCount = getVotedCount();
  const totalPositions = positions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with User Info */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {user?.photoURL && (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="w-12 h-12 rounded-full border-2 border-blue-500"
              />
            )}
            <div>
              <p className="font-bold text-gray-800">{user?.displayName || user?.email}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Title and Progress */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">
            🗳️ Student Council Elections
          </h1>
          <p className="text-gray-600">
            Total votes cast: {totalVotes} | 
            Positions voted: {votedCount}/{totalPositions}
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-3 max-w-md mx-auto">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(votedCount / totalPositions) * 100}%` }}
            />
          </div>
        </div>

        {/* Positions */}
        {positions.map((position) => (
          <PositionCard
            key={position.id}
            position={position}
            candidates={position.candidates}
            onVote={handleVote}
            hasVoted={hasVoted}
          />
        ))}

        {/* Completion Message */}
        {votedCount === totalPositions && (
          <div className="bg-green-100 border border-green-400 rounded-lg p-4 text-center mt-6">
            <p className="text-green-700 font-semibold">
              🎉 Congratulations! You have voted for all positions! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;