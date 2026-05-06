import { useState } from "react";

function PollForm({ addOption }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!input.trim()) return; // prevent empty

        addOption(input);          // 🔥 send text to App
        setInput("");              // clear input
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                type="text"
                placeholder="Add student candidate"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded border px-3 py-2"
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