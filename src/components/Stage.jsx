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
import { parseArgument } from "../parseArgument";
import { useLiveRef } from "../useLiveRef";

const validate = (values, input, operator) => {
  const errors = {};
  const { argument } = values;
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
  const { operator, argument, className, onRequestDelete } = props;
  const propsRef = useLiveRef(props);
  const form = useFormState({
    values: { operator, argument },
    onValidate: values => {
      const { setStage, input, operator, id } = propsRef.current;
      setStage({ id, operator });
      const result = validate(values, input, operator);
      setStage({ ...result, id });
    }
  });

  return (
    <div className={`stage ${className}`}>
      <div className="column">
        <h2>{operator}</h2>
        <Form {...form}>
          <FormMessage {...form} name="operator" />
          <FormLabel {...form} name="argument">
            Argument JSON
          </FormLabel>
          <FormInput
            {...form}
            name="argument"
            placeholder={`{shape: "triangle"}`}
          />
          <FormMessage {...form} name="argument" />
          <FormSubmitButton {...form}>Update</FormSubmitButton>
        </Form>
      </div>
      <Button className="deleter" onClick={onRequestDelete}>
        x
      </Button>
    </div>
  );
});
