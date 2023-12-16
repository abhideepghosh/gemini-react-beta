import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiPath = `https://gemini-beta-backend.onrender.com/geminiapi`;

  const sendPromptToAI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: prompt,
        }),
      });

      const data = await response.json();
      const formattedData = data.response.split("\n");
      setResult([...result, [prompt], formattedData]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult([...result, [prompt]]);
    sendPromptToAI();
    setPrompt("");
  };

  useEffect(() => {
    console.log("UseEffect Called");
    document
      .querySelector(".container")
      .scrollIntoView({ behavior: "smooth", block: "end" });
  }, [result]);

  return (
    <>
      <div className="bg-dark">
        <div className="container text-white">
          {result.map((ans, key) => (
            <div key={key} className="prompt-container">
              {ans.map((line, id) => (
                <div key={id * 0.1}>{line}</div>
              ))}
            </div>
          ))}
          {isLoading ? <div className="prompt-container">Thinking...</div> : ""}
        </div>

        <form className="prompt-form bg-dark" onSubmit={handleSubmit}>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            className="prompt-input text-white"
            placeholder="Enter your prompt"
          />
          <button className="btn btn-dark" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
