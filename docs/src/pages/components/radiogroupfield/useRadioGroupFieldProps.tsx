import { RadioGroupFieldProps, RadioProps } from '@aws-amplify/ui-react';
import { useState } from 'react';

import { RadioGroupFieldPropControlsProps } from './RadioGroupFieldPropControls';

interface UseRadioGroupFieldProps {
  (
    initialValues?: RadioGroupFieldProps & {
      labelPosition?: RadioProps['labelPosition'];
    }
  ): RadioGroupFieldPropControlsProps;
}

export const useRadioGroupFieldProps: UseRadioGroupFieldProps = (
  initialValues
) => {
  const [direction, setDirection] = useState<RadioGroupFieldProps['direction']>(
    initialValues.direction
  );
  const [isDisabled, setIsDisabled] = useState<
    RadioGroupFieldProps['isDisabled']
  >(initialValues.isDisabled);
  const [label, setLabel] = useState<RadioGroupFieldProps['label']>(
    initialValues.label
  );
  const [name, setName] = useState<RadioGroupFieldProps['name']>(
    initialValues.name
  );
  const [size, setSize] = useState<RadioGroupFieldProps['size']>(
    initialValues.size
  );
  const [labelPosition, setLabelPosition] = useState<
    RadioProps['labelPosition']
  >(initialValues.labelPosition);

  return {
    ...initialValues,
    direction,
    label,
    labelPosition,
    name,
    size,
    isDisabled,
    setDirection,
    setIsDisabled,
    setLabel,
    setLabelPosition,
    setName,
    setSize,
  };
};
