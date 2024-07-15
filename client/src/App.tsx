import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io(`http://localhost:8080`);

const App: React.FC = () => {
  const [command, setCommand] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("message", command);
    setCommand("");
  };

  useEffect(() => {
    socket.on("content", (data: string) => {
      setError("");
      setContent(data);
    });

    socket.on("error", (errorMessage: string) => {
      setError(errorMessage);
      setContent("");
    });

    return () => {
      socket.off("content");
      socket.off("error");
    };
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter ls command"
          required
        />
        <button type="submit">Enter</button>
      </form>
      <div id="content">
        <pre>{content}</pre>
      </div>
      {error && (
        <div id="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default App;
