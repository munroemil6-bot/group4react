import PollOption from "./PollOption";

function PollList({ options, vote, deleteOption, totalVotes }) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <PollOption
          key={option.id}
          option={option}
          vote={vote}
          deleteOption={deleteOption}
          totalVotes={totalVotes}
        />
      ))}
    </div>
  );
}

export default PollList;