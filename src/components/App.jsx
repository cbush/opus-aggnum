import React from "react";
import "../App.css";
import { Game } from "./Game";
import { Provider } from "reakit";
import * as system from "reakit-system-bootstrap";
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton,
  Button
} from "reakit";
import { useState } from "react";
const EXAMPLE_LEVEL = {
  name: "Example Level",
  input: [
    {
      shape: "square",
      color: "blue"
    },
    {
      shape: "triangle",
      color: "green"
    }
  ],
  tools: {
    $match: 1
  },
  expectedOutput: [
    {
      shape: "triangle",
      color: "green"
    }
  ]
};

function App() {
  return (
    <div className="App">
      <Provider unstable_system={system}>
        <Game level={EXAMPLE_LEVEL} />
      </Provider>
    </div>
  );
}

export default App;
