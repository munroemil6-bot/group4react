function PollOption({ option, vote, hasVoted, deleteOption, percentage }) {
  return (
    <li className="flex items-center justify-between rounded bg-white p-3 shadow-sm">
      <div className="w-full">
        <p className="font-medium text-gray-800">{option.text}</p>

        <p className="text-sm text-gray-500">
          Votes: {option.votes}
        </p>

        {/* Percentage  */}
        <p className="text-sm font-semibold text-black-600">
          {percentage.toFixed(1)}%
        </p>

        {/*  bar  */}
        <div className="mt-1 h-2 w-full rounded bg-gray-200">
          <div
            className="h-2 rounded bg-green-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => vote(option.id)}
        disabled={hasVoted}
        className="ml-4 rounded bg-green-500 px-3 py-1 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Vote
      </button>
    </li>
  );
}

export default PollOption;
