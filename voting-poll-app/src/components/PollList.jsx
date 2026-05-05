import PollOption from './PollOption';

function PollList({ options, vote, hasVoted, deleteOption }) {
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <PollOption
          key={option.id}
          option={option}
          vote={vote}
          hasVoted={hasVoted}
          totalVotes={totalVotes}
          onDelete={deleteOption}
        />
      ))}
    </div>
  );
}

export default PollList;