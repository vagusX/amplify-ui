import * as React from 'react';
import {
  RadioGroupFieldProps,
  SelectField,
  RadioProps,
  Flex,
  TextField,
  SwitchField,
} from '@aws-amplify/ui-react';

export interface RadioGroupFieldPropControlsProps extends RadioGroupFieldProps {
  setDirection: (
    value: React.SetStateAction<RadioGroupFieldProps['direction']>
  ) => void;
  setIsDisabled: (
    value: React.SetStateAction<RadioGroupFieldProps['isDisabled']>
  ) => void;
  setLabel: (
    value: React.SetStateAction<RadioGroupFieldProps['label']>
  ) => void;
  setName: (value: React.SetStateAction<RadioGroupFieldProps['name']>) => void;
  setSize: (value: React.SetStateAction<RadioGroupFieldProps['size']>) => void;
  setLabelPosition: (
    value: React.SetStateAction<RadioProps['labelPosition']>
  ) => void;
  labelPosition: RadioProps['labelPosition'];
}

interface RadioGroupFieldPropControlsInterface {
  (props: RadioGroupFieldPropControlsProps): JSX.Element;
}

export const RadioGroupFieldPropControls: RadioGroupFieldPropControlsInterface =
  ({
    setDirection,
    direction,
    label,
    setLabel,
    setLabelPosition,
    labelPosition,
    isDisabled,
    setIsDisabled,
    name,
    setName,
    setSize,
  }) => {
    return (
      <Flex direction="column">
        <TextField
          label="label"
          name="label"
          value={label as string}
          onChange={(event) => {
            setLabel(event.target.value as RadioGroupFieldProps['label']);
          }}
        />

        <TextField
          label="name"
          name="name"
          value={name as string}
          onChange={(event) => {
            setName(event.target.value as RadioGroupFieldProps['name']);
          }}
        />

        <SelectField
          label="direction"
          name="direction"
          value={direction}
          onChange={(event) =>
            setDirection(
              event.target.value as RadioGroupFieldProps['direction']
            )
          }
        >
          <option value="column">column</option>
          <option value="row">row</option>
        </SelectField>

        <SelectField
          label="size"
          name="size"
          placeholder="default"
          onChange={(event) =>
            setSize(event.target.value as RadioGroupFieldProps['size'])
          }
        >
          <option value="small">small</option>
          <option value="large">large</option>
        </SelectField>

        <SelectField
          id="labelPosition"
          name="labelPosition"
          label="labelPosition"
          placeholder="default"
          value={labelPosition}
          onChange={(e) =>
            setLabelPosition(e.target.value as RadioProps['labelPosition'])
          }
        >
          <option value="start">start</option>
          <option value="end">end</option>
          <option value="top">top</option>
          <option value="bottom">bottom</option>
        </SelectField>

        <SwitchField
          label="isDisabled"
          name="isDisabled"
          id="isDisabled"
          checked={isDisabled}
          onChange={(event) => {
            setIsDisabled(
              Boolean(
                event.target.checked
              ) as RadioGroupFieldProps['isDisabled']
            );
          }}
        />
      </Flex>
    );
  };
