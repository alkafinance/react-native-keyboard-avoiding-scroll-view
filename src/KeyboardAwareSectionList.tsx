import React from 'react';
import {SectionList, SectionListProps} from 'react-native';
import {
  ExternalKeyboardAwareContainerProps,
  KeyboardAwareContainer,
  useKeyboardAwareContainerProps,
} from './KeyboardAwareContainer';
import {generic} from './utils/react';

export interface KeyboardAwareSectionListProps<TItem extends {id: string}>
  extends SectionListProps<TItem>,
    ExternalKeyboardAwareContainerProps {}

export const KeyboardAwareSectionList = generic(
  <TItem extends {id: string}>(props: KeyboardAwareSectionListProps<TItem>) => {
    const keyboardAwareContainerProps = useKeyboardAwareContainerProps(props);

    return (
      <KeyboardAwareContainer
        {...keyboardAwareContainerProps}
        ScrollViewComponent={SectionList}
      />
    );
  },
);
