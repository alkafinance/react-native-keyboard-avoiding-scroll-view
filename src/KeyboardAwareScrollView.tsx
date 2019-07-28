import React from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import {
  ExternalKeyboardAwareContainerProps,
  KeyboardAwareContainer,
  useKeyboardAwareContainerProps,
} from './KeyboardAwareContainer';

export interface KeyboardAwareScrollViewProps
  extends ScrollViewProps,
    ExternalKeyboardAwareContainerProps {}

export const KeyboardAwareScrollView: React.FC<
  KeyboardAwareScrollViewProps
> = props => {
  const keyboardAwareContainerProps = useKeyboardAwareContainerProps(props);

  return (
    <KeyboardAwareContainer
      {...keyboardAwareContainerProps}
      ScrollViewComponent={ScrollView}
    />
  );
};
