import React from "react";
import { Document } from "./Document";
import { withFlow } from "./withFlow";

export const Collection = withFlow(({ documents, name, className, status }) => {
  return (
    <div className={`collection ${className}`}>
      {name != null ? <label>{name}</label> : null}
      {status != null ? (
        <div className={`admonition ${status.type}`}>
          <p>
            {status.type === "warning"
              ? "️⚠️"
              : status.type === "success"
              ? "✅"
              : null}
            {status.message}
          </p>
        </div>
      ) : null}
      <div className="documents">
        {documents.length === 0 ? (
          <p>
            <i>(Nothing yet)</i>
          </p>
        ) : (
          documents.map((document, index) => (
            <Document key={index} document={document} />
          ))
        )}
      </div>
    </div>
  );
});
