import PollOption from "./PollOption";

function PollList({ options, vote, deleteOption, totalVotes, hasVoted }) {
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
            deleteOption={deleteOption}
            hasVoted={hasVoted}
            percentage={percentage}   
          />
        );
      })}
    </div>
  );
}

export default PollList;