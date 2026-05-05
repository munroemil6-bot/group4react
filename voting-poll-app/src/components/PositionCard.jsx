function PositionCard({ position, candidates, onVote, hasVoted }) {
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        {position.title}
      </h2>
      
      <div className="space-y-4">
        {candidates.map((candidate) => {
          const percentage = totalVotes === 0 
            ? 0 
            : Math.round((candidate.votes / totalVotes) * 100);
          
          return (
            <div key={candidate.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-gray-500">{candidate.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-blue-600">
                    {candidate.votes} votes
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {percentage}% of votes
                </span>
                <button
                  onClick={() => onVote(position.id, candidate.id)}
                  disabled={hasVoted[position.id]}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    hasVoted[position.id]
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {hasVoted[position.id] ? "✓ Voted" : "Vote"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {hasVoted[position.id] && (
        <div className="mt-4 p-2 bg-green-100 rounded-lg text-center">
          <p className="text-green-700 text-sm">
            ✓ You have voted for this position
          </p>
        </div>
      )}
    </div>
  );
}

export default PositionCard;