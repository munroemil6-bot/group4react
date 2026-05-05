import { useState, useEffect } from "react";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";

function App() {
  const defaultStudents = [
    { id: 1, text: "Myles ", votes: 9 },
    { id: 2, text: "Enoch ", votes: 14 },
    { id: 3, text: "Jane ", votes: 7 },
  ];

  const [options, setOptions] = useState(() => {
    const saved = localStorage.getItem("studentPoll");
    return saved ? JSON.parse(saved) : defaultStudents;
  });

  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    localStorage.setItem("studentPoll", JSON.stringify(options));
  }, [options]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "studentPoll") {
        const updatedOptions = JSON.parse(e.newValue);
        setOptions(updatedOptions);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
    const reset = [
      { id: 1, text: "Myles ", votes: 0 },
      { id: 2, text: "Enoch ", votes: 0 },
      { id: 3, text: "Jane ", votes: 0 },
    ];

    setOptions(reset);
    setHasVoted(false);

    localStorage.setItem("studentPoll", JSON.stringify(reset));
  };

  return (
      <div className="min-h-screen bg-blue-50 p-4">
        <h1 className="mb-6 text-center text-3xl font-bold text-orange-500">
          Student Council Voting
        </h1>

        <div className="mx-auto max-w-xl">
          <PollForm addOption={addOption} options={options} />

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
  );
}

export default App;