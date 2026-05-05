import { useState } from "react";


function PollForm({ addOption, options }) {
 const [input, setInput] = useState("");
 const [error, setError] = useState("");


 const handleSubmit = (e) => {
   e.preventDefault();
   const trimmed = input.trim();
   if (!trimmed) {
     setError("Please enter a candidate name.");
     return;
   }

   if (/\d/.test(trimmed)) {
     setError("Candidate names cannot contain numbers.");
     return;
   }

   const normalized = trimmed.toLowerCase();
   if (options.some((opt) => opt.text.trim().toLowerCase() === normalized)) {
     setError("That candidate already exists.");
     return;
   }

   addOption(trimmed);
   setInput("");
   setError("");
 };

 return (
   <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
     <div className="flex gap-2">
       <input
         type="text"
         placeholder="Add student candidate"
         value={input}
         onChange={(e) => {
           setInput(e.target.value);
           if (error) setError("");
         }}
         className="flex-1 p-2 border rounded"
       />
       <button className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
         Add
       </button>
     </div>
     {error && <p className="text-sm text-red-600">{error}</p>}
   </form>
 );
}


export default PollForm;

