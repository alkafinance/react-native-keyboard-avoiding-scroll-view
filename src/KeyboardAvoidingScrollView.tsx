import React from 'react'
import {ScrollView, ScrollViewProps} from 'react-native'
import {
  ExternalKeyboardAvoidingContainerProps,
  KeyboardAvoidingContainer,
  useKeyboardAvoidingContainerProps,
} from './KeyboardAvoidingContainer'

export interface KeyboardAvoidingScrollViewProps
  extends ScrollViewProps,
    ExternalKeyboardAvoidingContainerProps {}

export const KeyboardAvoidingScrollView: React.FC<
  KeyboardAvoidingScrollViewProps
> = props => {
  const KeyboardAvoidingContainerProps = useKeyboardAvoidingContainerProps(
    props,
  )

  return (
    <KeyboardAvoidingContainer
      {...KeyboardAvoidingContainerProps}
      ScrollViewComponent={ScrollView}
    />
  )
}
