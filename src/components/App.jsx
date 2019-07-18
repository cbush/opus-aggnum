import React from "react";
import "../App.css";
import { Game } from "./Game";
import { Provider } from "reakit";
import * as system from "reakit-system-bootstrap";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
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
    $match: 3,
    $group: 1
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
      <Provider unstable_system={system}>
        <div className="welcome">
          <h1>Opus Aggnum</h1>
          <p>
            Drag and drop from the toolbox on the right side to assemble the
            aggregation pipeline that will transform this input collection into
            the expected collection below.
          </p>
        </div>
        <DndProvider backend={HTML5Backend}>
          <Game level={EXAMPLE_LEVEL} />
        </DndProvider>
      </Provider>
    </div>
  );
}

export default App;
