import { Radio, RadioGroupField, View } from '@aws-amplify/ui-react';

import {
  RadioGroupFieldPropControls,
  RadioGroupFieldPropControlsProps,
} from './RadioGroupFieldPropControls';
import { useRadioGroupFieldProps } from './useRadioGroupFieldProps';

import { Demo } from '@/components/Demo';

const options = ['html', 'css', 'javascript'];

const propsToCode = ({
  label,
  labelPosition,
  labelHidden,
  name,
  defaultValue,
  size,
  isDisabled,
}: RadioGroupFieldPropControlsProps) => {
  return (
    `<RadioGroupField` +
    (label ? `\n  label=${JSON.stringify(label)}` : '') +
    (isDisabled ? `\n  isDisabled={${isDisabled}}` : '') +
    (labelHidden ? `\n  labelHidden={${labelHidden}}` : '') +
    (size ? `\n  size=${JSON.stringify(size)}` : '') +
    `\n/>\n` +
    options
      .map((option) => {
        return `    <Radio value="${option}">${option}</Radio>`;
      })
      .join('\n') +
    `\n</RadioGroupField>`
  );
};

export const RadioGroupFieldDemo = () => {
  const props = useRadioGroupFieldProps({
    label: 'Language',
    name: 'language',
    defaultValue: 'html',
  });
  return (
    <Demo
      code={propsToCode(props)}
      propControls={<RadioGroupFieldPropControls {...props} />}
    >
      <RadioGroupField
        name={props.name}
        value={props.value}
        isDisabled={props.isDisabled}
        size={props.size}
        label={props.label}
        labelHidden={props.labelHidden}
        direction={props.direction}
      >
        <Radio labelPosition={props.labelPosition} value="html">
          html
        </Radio>
        <Radio labelPosition={props.labelPosition} value="css">
          css
        </Radio>
        <Radio labelPosition={props.labelPosition} value="javascript">
          javascript
        </Radio>
      </RadioGroupField>
    </Demo>
  );
};
