import React from "react";
export function Document({ document }) {
  const entries = Object.entries(document);
  return (
    <div className="document">
      {entries.map(([key, value], index) => (
        <p key={index}>
          <span className="key">{key}:</span>
          <span className="value">{value}</span>
        </p>
      ))}
    </div>
  );
}
