import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {
  ExternalKeyboardAwareContainerProps,
  KeyboardAwareContainer,
  useKeyboardAwareContainerProps,
} from './KeyboardAwareContainer';
import {generic} from './utils/react';

export interface KeyboardAwareFlatListProps<TItem extends {id: string}>
  extends FlatListProps<TItem>,
    ExternalKeyboardAwareContainerProps {}

export const KeyboardAwareFlatList = generic(
  <TItem extends {id: string}>(props: KeyboardAwareFlatListProps<TItem>) => {
    const keyboardAwareContainerProps = useKeyboardAwareContainerProps(props);

    return (
      <KeyboardAwareContainer
        {...keyboardAwareContainerProps}
        ScrollViewComponent={FlatList}
      />
    );
  },
);
