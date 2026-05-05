import { useState } from "react";

function PollForm({ addOption }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addOption(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new option..."
        className="w-full rounded border p-2"
      />

      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}

export default PollForm;