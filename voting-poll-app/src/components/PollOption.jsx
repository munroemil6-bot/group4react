function PollOption({ option, vote, deleteOption, totalVotes }) {
  const percentage =
    totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100;

  return (
    <li className="flex items-center justify-between rounded bg-white p-3 shadow-sm">
      <div className="w-full">
        <p className="font-medium text-gray-800">{option.text}</p>

        <p className="text-sm text-gray-500">Votes: {option.votes}</p>

        <p className="text-sm font-semibold text-blue-600">
          {percentage.toFixed(1)}%
        </p>

        <div className="mt-1 h-2 w-full rounded bg-gray-200">
          <div
            className="h-2 rounded bg-blue-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="ml-4 flex flex-col gap-2">
        <button
          onClick={() => vote(option.id)}
          className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
        >
          Vote
        </button>

        <button
          onClick={() => deleteOption(option.id)}
          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default PollOption;