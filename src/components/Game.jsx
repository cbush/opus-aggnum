import React, { useState } from "react";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop
} from "reakit";
import deepEqual from "deep-equal";

import { InputCollections } from "./InputCollections";
import { Pipeline } from "./Pipeline";
import { Result } from "./Result";
import { runPipeline } from "../runPipeline";
import { Toolbox } from "./Toolbox";

export function Game({ level }) {
  const [stages, setStages] = useState([]);
  const { input, expectedOutput, tools } = level;
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
          <Pipeline input={input} stages={stages} setStages={setStages} />
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
      <Toolbox toolsSpec={tools} />
    </>
  );
}
