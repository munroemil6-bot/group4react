function PollOption({ option, vote, hasVoted }) {
	return (
		<li className="flex items-center justify-between rounded bg-white p-3 shadow-sm">
			<div>
				<p className="font-medium text-gray-800">{option.text}</p>
				<p className="text-sm text-gray-500">Votes: {option.votes}</p>
			</div>

			<button
				onClick={() => vote(option.id)}
				disabled={hasVoted}
				className="rounded bg-green-500 px-3 py-1 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
			>
				Vote
			</button>
		</li>
	);
}

export default PollOption;
