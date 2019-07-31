import React from 'react'
import {FlatList, FlatListProps} from 'react-native'
import {
  ExternalKeyboardAvoidingContainerProps,
  KeyboardAvoidingContainer,
  useKeyboardAvoidingContainerProps,
} from './KeyboardAvoidingContainer'
import {generic} from './utils/react'

export interface KeyboardAvoidingFlatListProps<TItem extends {id: string}>
  extends FlatListProps<TItem>,
    ExternalKeyboardAvoidingContainerProps {}

export const KeyboardAvoidingFlatList = generic(
  <TItem extends {id: string}>(props: KeyboardAvoidingFlatListProps<TItem>) => {
    const KeyboardAvoidingContainerProps = useKeyboardAvoidingContainerProps(
      props,
    )

    return (
      <KeyboardAvoidingContainer
        {...KeyboardAvoidingContainerProps}
        ScrollViewComponent={FlatList}
      />
    )
  },
)
