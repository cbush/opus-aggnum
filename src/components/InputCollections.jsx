import React from "react";
import { Collection } from "./Collection";

export function InputCollections({ input }) {
  return (
    <div className="inputCollections">
      <Collection name="Input" documents={input} />
    </div>
  );
}
