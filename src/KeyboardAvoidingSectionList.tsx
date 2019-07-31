import React from 'react'
import {SectionList, SectionListProps} from 'react-native'
import {
  ExternalKeyboardAvoidingContainerProps,
  KeyboardAvoidingContainer,
  useKeyboardAvoidingContainerProps,
} from './KeyboardAvoidingContainer'
import {generic} from './utils/react'

export interface KeyboardAvoidingSectionListProps<TItem extends {id: string}>
  extends SectionListProps<TItem>,
    ExternalKeyboardAvoidingContainerProps {}

export const KeyboardAvoidingSectionList = generic(
  <TItem extends {id: string}>(
    props: KeyboardAvoidingSectionListProps<TItem>,
  ) => {
    const KeyboardAvoidingContainerProps = useKeyboardAvoidingContainerProps(
      props,
    )

    return (
      <KeyboardAvoidingContainer
        {...KeyboardAvoidingContainerProps}
        ScrollViewComponent={SectionList}
      />
    )
  },
)
