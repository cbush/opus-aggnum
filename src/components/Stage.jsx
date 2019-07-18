import React from "react";
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton
} from "reakit";
import { Button } from "reakit";
import { withFlow } from "./withFlow";
import { runPipeline } from "../runPipeline";
import { Result } from "./Result";
import { parseArgument } from "../parseArgument";

// Workaround for https://github.com/reakit/reakit/issues/400
function useLiveRef(value) {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref;
}

const validate = (values, input) => {
  const errors = {};
  const { operator, argument } = values;
  const stage = {
    operator,
    argument
  };

  if (!argument) {
    errors.argument = "Argument required";
  } else {
    try {
      parseArgument(argument);
    } catch (error) {
      errors.argument = error.message;
    }
  }

  if (input == null) {
    input = [];
  }

  if (!operator) {
    errors.operator = "Operator required";
  } else {
    try {
      runPipeline({ stages: [stage], input });
    } catch (error) {
      const { message } = error;
      // HACK to route the message to the right field
      if (message.match(/^invalid aggregation operator/)) {
        errors.operator = message;
      } else {
        errors.argument = `Pipeline error: ${message}`;
      }
    }
  }

  if (Object.keys(errors).length !== 0) {
    throw errors;
  }
  return stage;
};

export const Stage = withFlow(props => {
  const { operator, argument, className, onRequestDelete, results } = props;
  const propsRef = useLiveRef(props);
  const form = useFormState({
    values: { operator, argument },
    onValidate: values => {
      const { setStage, input, id } = propsRef.current;
      setStage({ id });
      const result = validate(values, input);
      setStage({ ...result, id });
    }
  });

  return (
    <>
      <div className={`stage ${className}`}>
        <div className="column">
          <Form {...form}>
            <FormMessage {...form} name="main" />
            <FormLabel {...form} name="operator">
              Operator
            </FormLabel>
            <FormInput {...form} name="operator" placeholder="Operator" />
            <FormMessage {...form} name="operator" />
            <FormLabel {...form} name="argument">
              Argument
            </FormLabel>
            <FormInput {...form} name="argument" placeholder="Argument" />
            <FormMessage {...form} name="argument" />
            <FormSubmitButton {...form}>></FormSubmitButton>
          </Form>
          {results ? <Result input={results} /> : null}
        </div>
        <Button className="deleter" onClick={onRequestDelete}>
          x
        </Button>
      </div>
      <div className="arrowDown" />
    </>
  );
});
