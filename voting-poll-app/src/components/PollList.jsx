import PollOption from "./PollOption";

function PollList({ options, vote, hasVoted, deleteOption }) {
  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <div className="space-y-4">
      {options.map((option) => {
        const percentage =
          totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100;

        return (
          <PollOption
            key={option.id}
            option={option}
            vote={vote}
            hasVoted={hasVoted}
            deleteOption={deleteOption}
            percentage={percentage}
          />
        );
      })}
    </div>
  );
}

export default PollList;