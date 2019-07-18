import React, { useState } from "react";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop
} from "reakit";
import deepEqual from "deep-equal";
import uuidv1 from "uuid/v1";

import { InputCollections } from "./InputCollections";
import { Pipeline } from "./Pipeline";
import { Result } from "./Result";
import { runPipeline } from "../runPipeline";
import { Toolbox } from "./Toolbox";

export function Game({ level }) {
  const [stages, setStages] = useState([]);
  const { input, expectedOutput } = level;
  const [tools, setTools] = useState(
    (function() {
      const tools = [];
      Object.keys(level.tools).forEach(name => {
        for (let i = 0; i < level.tools[name]; ++i) {
          tools.push({
            id: uuidv1(),
            name,
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
      <div className="viewport">
        <div className="section">
          <InputCollections input={input} />
        </div>
        <div className="arrowDown" />
        <div className="section">
          <Pipeline
            input={input}
            stages={stages}
            setStages={setStages}
            releaseTool={({ id, name, type }) => {
              setTools([...tools, { id, name, type }]);
            }}
          />
        </div>
        <div className="section">
          <Result
            resultEqualsExpected={resultEqualsExpected}
            input={result}
            expected={expectedOutput}
          />
          <>
            <DialogDisclosure disabled={!resultEqualsExpected} {...dialog}>
              {resultEqualsExpected
                ? "Result === expected"
                : "Result does not match expected"}
            </DialogDisclosure>
            <DialogBackdrop {...dialog} />
            <Dialog {...dialog}>Success!</Dialog>
          </>
        </div>
      </div>
      <Toolbox tools={tools} setTools={setTools} />
    </>
  );
}
