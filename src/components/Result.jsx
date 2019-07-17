import React from "react";
import { Collection } from "./Collection";
export function Result({ resultEqualsExpected, input, expected }) {
  return (
    <div className="result">
      <Collection
        flowStatus={resultEqualsExpected ? "working" : "starving"}
        name={"Output"}
        documents={input}
      />
      <Collection name={"Expected"} documents={expected} />
    </div>
  );
}
