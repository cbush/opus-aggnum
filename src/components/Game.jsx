import React, { useState } from "react";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop
} from "reakit";
import deepEqual from "deep-equal";
import uuidv1 from "uuid/v1";
import { Flipper, Flipped } from "react-flip-toolkit";

import { InputCollections } from "./InputCollections";
import { Pipeline } from "./Pipeline";
import { Result } from "./Result";
import { runPipeline } from "../runPipeline";
import { Toolbox } from "./Toolbox";

export function Game({ level }) {
  const [stages, setStages] = useState([]);
  const { input, expectedOutput, flavor } = level;
  const [tools, setTools] = useState(
    (function() {
      const tools = [];
      Object.keys(level.tools).forEach(name => {
        for (let i = 0; i < level.tools[name]; ++i) {
          tools.push({
            id: uuidv1(),
            name: `$${name}`,
            type: "stage"
          });
        }
      });
      return tools;
    })()
  );
  let resultEqualsExpected = false;
  let result = [];
  try {
    result = runPipeline({ input, stages });
    resultEqualsExpected = deepEqual(result, expectedOutput);
  } catch (error) {
    // do nothing
  }
  const dialog = useDialogState();
  return (
    <>
      <Flipper flipKey={stages} spring="wobbly">
        <div className="flavor">
          <label>Client says...</label>
          <p>"{flavor}"</p>
        </div>
        <Flipped flipId="viewport">
          <div className="viewport">
            <div className="section">
              <InputCollections input={input} />
            </div>
            <div className="arrowDown" />
            <Pipeline
              input={input}
              stages={stages}
              setStages={setStages}
              releaseTool={({ id, name, type }) => {
                setTools([...tools, { id, name, type }]);
              }}
            />
            <div className="section">
              <Result
                inputEqualsExpected={resultEqualsExpected}
                input={result}
                expected={expectedOutput}
              />
              <>
                <p>
                  {resultEqualsExpected
                    ? "Your results match the expected output. Click Submit to continue."
                    : "Your results do not match the expected output. Keep configuring your pipeline to continue."}
                </p>
                <DialogDisclosure disabled={!resultEqualsExpected} {...dialog}>
                  Submit
                </DialogDisclosure>
                <DialogBackdrop {...dialog} />
                <Dialog {...dialog}>Success!</Dialog>
              </>
            </div>
          </div>
        </Flipped>
      </Flipper>
      <Toolbox tools={tools} setTools={setTools} />
    </>
  );
}
