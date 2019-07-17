import React from "react";
import "../App.css";
import { Game } from "./Game";

const EXAMPLE_LEVEL = {
  name: "Example Level",
  input: [
    {
      shape: "square",
      color: "blue"
    },
    {
      shape: "triangle",
      color: "green"
    }
  ],
  tools: {
    $match: 1
  },
  expectedOutput: [
    {
      shape: "triangle",
      color: "green"
    }
  ]
};

function App() {
  return (
    <div className="App">
      <Game level={EXAMPLE_LEVEL} />
    </div>
  );
}

export default App;
