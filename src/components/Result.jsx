import React from "react";
import { Collection } from "./Collection";
export function Result({ resultEqualsExpected, input, expected }) {
  return (
    <div className="result">
      <Collection
        flowStatus={
          input.length === 0
            ? "starving"
            : resultEqualsExpected
            ? "working"
            : "broken"
        }
        name={"Result"}
        documents={input}
      />
      <Collection name={"Expected"} documents={expected} />
    </div>
  );
}
