import React, { useState } from "react";
import "../App.css";
import Select from "react-select";
import { Game } from "./Game";
import { Provider } from "reakit";
import * as system from "reakit-system-bootstrap";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { withStitch } from "./withStitch";

function App({ levels }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const level = selectedLevel && levels ? levels[selectedLevel.value] : null;
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
          {levels == null ? (
            <p>Loading...</p>
          ) : (
            <div className="levelSelect">
              <label>Level select</label>
              <Select
                options={levels.map((level, index) => ({
                  value: index,
                  label: level.name
                }))}
                value={selectedLevel}
                onChange={option => setSelectedLevel(option)}
              />
            </div>
          )}
        </div>
        {level ? (
          <DndProvider backend={HTML5Backend}>
            <Game key={level.index} level={level} />
          </DndProvider>
        ) : null}
      </Provider>
    </div>
  );
}

export default withStitch(App);
