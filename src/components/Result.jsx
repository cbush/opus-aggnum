import React from "react";
import { Collection } from "./Collection";
import { Document } from "./Document";
export function Result({ inputEqualsExpected, input, expected, name }) {
  const flowStatus =
    inputEqualsExpected == null
      ? undefined
      : inputEqualsExpected
      ? "working"
      : "broken";
  let status;
  if (inputEqualsExpected != null) {
    status = {
      message:
        inputEqualsExpected === true
          ? "Success! The result matches the output."
          : "This result does not match the expected output.",
      type: inputEqualsExpected === true ? "success" : "warning"
    };
  }
  return (
    <div className="result">
      {Array.isArray(input) ? (
        <Collection
          status={status}
          flowStatus={flowStatus}
          name={name || "Results"}
          documents={input}
        />
      ) : (
        <Document document={input} />
      )}
      {expected ? <Collection name={"Expected"} documents={expected} /> : null}
    </div>
  );
}
