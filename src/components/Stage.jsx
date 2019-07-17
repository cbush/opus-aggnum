import React from "react";
import JSON5 from "json5";
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

const validate = (values, input) => {
  const errors = {};
  const { operator, argument } = values;
  const stage = {
    operator
  };

  if (!argument) {
    errors.argument = "Argument required";
  } else {
    try {
      stage.argument = JSON5.parse(argument);
    } catch (error) {
      errors.argument = error.message;
      stage.argument = {};
    }
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
        errors.argument = message;
      }
    }
  }

  if (Object.keys(errors).length !== 0) {
    throw errors;
  }
  return stage;
};

export const Stage = withFlow(
  ({ operator, argument, className, onRequestDelete, input, setStage }) => {
    const form = useFormState({
      values: { operator, argument: JSON5.stringify(argument) },
      onValidate: values => {
        setStage({});
        const result = validate(values, input);
        setStage(result);
      }
    });
    return (
      <>
        <div className={`stage ${className}`}>
          <Form {...form}>
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
          <Button className="deleter" onClick={onRequestDelete}>
            x
          </Button>
        </div>
        <div className="arrowDown" />
      </>
    );
  }
);
