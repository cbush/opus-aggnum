import React from "react";
// Workaround for https://github.com/reakit/reakit/issues/400
export function useLiveRef(value) {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref;
}
