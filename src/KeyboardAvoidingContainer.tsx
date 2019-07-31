import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {
  Dimensions,
  findNodeHandle,
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  ScreenRect,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  TextInput as NativeTextInput,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import {NoInfer} from './utils/utility-types'
import {genericMemo} from './utils/react'
import {measureInWindow} from './utils/measureInWindow'
import {hijackTextInputEvents} from './utils/hijackTextInputEvents'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const KEYBOARD_PADDING = 48

export interface ExternalKeyboardAvoidingContainerProps {
  stickyFooter?: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
}
export interface InternalKeyboardAvoidingContainerProps<
  TScrollViewProps extends ScrollViewProps
> {
  ScrollViewComponent: React.ComponentType<NoInfer<TScrollViewProps>>
  scrollViewRef: React.Ref<React.ComponentType<TScrollViewProps>>
  scrollViewProps: TScrollViewProps
  stickyFooterRef: React.Ref<View>
  stickyFooterProps: ViewProps
}
export interface KeyboardAvoidingContainerProps<
  TScrollViewProps extends ScrollViewProps
>
  extends ExternalKeyboardAvoidingContainerProps,
    InternalKeyboardAvoidingContainerProps<TScrollViewProps> {}

export const KeyboardAvoidingContainer = genericMemo(
  <TScrollViewProps extends ScrollViewProps>({
    stickyFooter,
    containerStyle,
    ScrollViewComponent,
    scrollViewRef,
    scrollViewProps,
    stickyFooterRef,
    stickyFooterProps,
  }: KeyboardAvoidingContainerProps<TScrollViewProps>) => {
    return (
      <SafeAreaView style={[styles.container, containerStyle]}>
        <ScrollViewComponent ref={scrollViewRef} {...scrollViewProps} />
        {stickyFooter && (
          <View ref={stickyFooterRef} {...stickyFooterProps}>
            {stickyFooter}
          </View>
        )}
      </SafeAreaView>
    )
  },
)

export function useKeyboardAvoidingContainerProps<
  TScrollViewProps extends ScrollViewProps
>({
  stickyFooter,
  containerStyle,

  onScroll,
  contentContainerStyle: contentContainerStyleProp,
  style: styleProp,
  ...passthroughScrollViewProps
}: TScrollViewProps & ExternalKeyboardAvoidingContainerProps): Omit<
  KeyboardAvoidingContainerProps<TScrollViewProps>,
  'ScrollViewComponent'
> {
  const scrollViewRef = useRef<React.ComponentType<TScrollViewProps>>(null)
  const stickyFooterRef = useRef<View | null>(null)

  const scrollPositionRef = useRef(0)
  const scrollViewOffsetRef = useRef(0)
  const keyboardLayoutRef = useRef<ScreenRect | null>(null)
  const stickyFooterLayoutRef = useRef<ScreenRect | null>(null)
  const focusedTextInputLayoutRef = useRef<ScreenRect | null>(null)
  const layoutAnimationConfiguredRef = useRef(false)

  const [scrollViewOffset, setScrollViewOffset] = useState(0)
  const [
    scrollViewContentBottomInset,
    setScrollViewContentBottomInset,
  ] = useState(0)
  const [scrollViewBottomInset, setScrollViewBottomInset] = useState(0)
  const [stickyFooterOffset, setStickyFooterOffset] = useState(0)

  useEffect(() => {
    requestAnimationFrame(() => {
      if (scrollViewRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const scrollResponder = (scrollViewRef.current as any).getScrollResponder() as ScrollView

        scrollResponder.scrollTo({
          y:
            scrollPositionRef.current +
            (scrollViewOffset - scrollViewOffsetRef.current),
          animated: true,
        })
        scrollViewOffsetRef.current = scrollViewOffset
      }
    })
  }, [scrollViewOffset])

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollPositionRef.current = event.nativeEvent.contentOffset.y

      if (onScroll) {
        onScroll(event)
      }
    },
    [onScroll],
  )
  const handleStickyFooterLayout = useCallback((event: LayoutChangeEvent) => {
    setScrollViewBottomInset(event.nativeEvent.layout.height)
  }, [])

  const updateOffsets = useCallback(
    ({keyboardEvent}: {keyboardEvent?: KeyboardEvent} = {}) => {
      const keyboardAbsoluteTop = keyboardLayoutRef.current
        ? keyboardLayoutRef.current.screenY
        : SCREEN_HEIGHT
      const keyboardAbsoluteTopWithPadding =
        keyboardAbsoluteTop - KEYBOARD_PADDING
      const keyboardHeight = keyboardLayoutRef.current
        ? keyboardLayoutRef.current.height
        : 0
      const focusedTextInputAbsoluteBottom = focusedTextInputLayoutRef.current
        ? focusedTextInputLayoutRef.current.screenY +
          focusedTextInputLayoutRef.current.height
        : keyboardAbsoluteTopWithPadding
      const stickyFooterAbsoluteBottom = stickyFooterLayoutRef.current
        ? stickyFooterLayoutRef.current.screenY +
          stickyFooterLayoutRef.current.height
        : keyboardAbsoluteTopWithPadding
      const stickyFooterHeight = stickyFooterLayoutRef.current
        ? stickyFooterLayoutRef.current.height
        : 0

      const newScrollViewOffset = Math.max(
        0,
        focusedTextInputAbsoluteBottom -
          keyboardAbsoluteTopWithPadding +
          stickyFooterHeight,
      )
      const newScrollViewBottomInset =
        KEYBOARD_PADDING + stickyFooterHeight + keyboardHeight
      const newStickyFooterOffset = Math.max(
        0,
        stickyFooterAbsoluteBottom - keyboardAbsoluteTop,
      )

      if (
        !layoutAnimationConfiguredRef.current &&
        (newScrollViewBottomInset !== scrollViewContentBottomInset ||
          newStickyFooterOffset !== stickyFooterOffset)
      ) {
        LayoutAnimation.configureNext(
          keyboardEvent && keyboardEvent.duration > 10
            ? {
                duration: keyboardEvent.duration,
                update: {
                  duration: keyboardEvent.duration,
                  type:
                    (keyboardEvent.easing != null &&
                      LayoutAnimation.Types[keyboardEvent.easing]) ||
                    'keyboard',
                },
              }
            : LayoutAnimation.Presets.easeInEaseOut,
        )
        requestAnimationFrame(() => {
          setTimeout(
            () => {
              layoutAnimationConfiguredRef.current = false
            },
            keyboardEvent && keyboardEvent.duration > 10
              ? keyboardEvent.duration
              : LayoutAnimation.Presets.easeInEaseOut.duration,
          )
        })
        layoutAnimationConfiguredRef.current = true
      }
      setScrollViewOffset(newScrollViewOffset)
      setScrollViewContentBottomInset(newScrollViewBottomInset)
      setStickyFooterOffset(newStickyFooterOffset)
    },
    [scrollViewContentBottomInset, stickyFooterOffset],
  )

  useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      // Right before the keyboard is shown, we know that a text input is being
      // focused on.
      // Therefore, we calculate the layout of the text input and the layout
      // of the sticky footer and update offsets accordingly.
      async event => {
        // Prevent race conditions
        if (keyboardLayoutRef.current) return

        const {endCoordinates: newKeyboardLayout} = event
        const newFocusedTextInputNodeHandle = NativeTextInput.State.currentlyFocusedField()
        const newStickyFooterNodeHandle = findNodeHandle(
          stickyFooterRef.current,
        )
        const [
          newFocusedTextInputLayout,
          newStickyFooterLayout,
        ] = await Promise.all([
          newFocusedTextInputNodeHandle
            ? measureInWindow(newFocusedTextInputNodeHandle)
            : Promise.resolve(null),
          newStickyFooterNodeHandle
            ? measureInWindow(newStickyFooterNodeHandle)
            : Promise.resolve(null),
        ])

        keyboardLayoutRef.current = newKeyboardLayout
        focusedTextInputLayoutRef.current = newFocusedTextInputLayout
        stickyFooterLayoutRef.current = newStickyFooterLayout

        updateOffsets({keyboardEvent: event})
      },
    )
    const keyboardWillChangeFrameSub = Keyboard.addListener(
      'keyboardWillChangeFrame',
      event => {
        // Avoid overlap with `keyboardWillShow`
        if (!keyboardLayoutRef.current) return

        const {endCoordinates: newKeyboardLayout} = event
        // Avoid overlap with `keyboardWillHide`
        if (
          newKeyboardLayout.height === keyboardLayoutRef.current.height ||
          newKeyboardLayout.height === 0
        ) {
          return
        }

        keyboardLayoutRef.current = newKeyboardLayout
      },
    )
    const keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      // Right before the keyboard is hidden, we know that a text input is being
      // blurred.
      // Therefore, we reset the layouts and update the offsets accordingly.
      event => {
        keyboardLayoutRef.current = null
        focusedTextInputLayoutRef.current = null
        stickyFooterLayoutRef.current = null

        updateOffsets({keyboardEvent: event})
      },
    )

    return () => {
      keyboardWillShowSub.remove()
      keyboardWillChangeFrameSub.remove()
      keyboardWillHideSub.remove()
    }
  }, [updateOffsets])

  useEffect(() => {
    const textInputEvents = hijackTextInputEvents()
    // We watch for the switch between two text inputs and update offsets
    // accordingly.
    // A switch between two text inputs happens when a keyboard is shown
    // and another text input is currently being focused on.
    const sub = textInputEvents.addListener(
      'textInputDidFocus',
      newFocusedTextInputNodeHandle => {
        requestAnimationFrame(async () => {
          if (
            !keyboardLayoutRef.current ||
            !focusedTextInputLayoutRef.current
          ) {
            return
          }

          const newFocusedTextInputLayout = newFocusedTextInputNodeHandle
            ? await measureInWindow(newFocusedTextInputNodeHandle)
            : null

          focusedTextInputLayoutRef.current = newFocusedTextInputLayout
            ? {
                ...newFocusedTextInputLayout,
                screenY:
                  newFocusedTextInputLayout.screenY +
                  scrollViewOffsetRef.current,
              }
            : newFocusedTextInputLayout

          updateOffsets()
        })
      },
    )

    return () => {
      sub.remove()
    }
  }, [scrollViewOffset, updateOffsets])

  const scrollViewContentContainerStyle = useMemo(() => {
    const flatContentContainerStyleProp =
      StyleSheet.flatten(contentContainerStyleProp) || {}

    let scrollViewContentBottomInsetProp = 0
    if ('paddingBottom' in flatContentContainerStyleProp) {
      if (typeof flatContentContainerStyleProp.paddingBottom === 'number') {
        scrollViewContentBottomInsetProp =
          flatContentContainerStyleProp.paddingBottom
      }
    } else if ('padding' in flatContentContainerStyleProp) {
      if (typeof flatContentContainerStyleProp.padding === 'number') {
        scrollViewContentBottomInsetProp = flatContentContainerStyleProp.padding
      }
    }

    return {
      paddingBottom:
        scrollViewContentBottomInset + scrollViewContentBottomInsetProp,
    }
  }, [contentContainerStyleProp, scrollViewContentBottomInset])
  const scrollViewStyle = useMemo(() => {
    const flatStyleProp = StyleSheet.flatten(styleProp) || {}

    let scrollViewBottomInsetProp = 0
    if ('marginBottom' in flatStyleProp) {
      if (typeof flatStyleProp.marginBottom === 'number') {
        scrollViewBottomInsetProp = flatStyleProp.marginBottom
      }
    } else if ('margin' in flatStyleProp) {
      if (typeof flatStyleProp.margin === 'number') {
        scrollViewBottomInsetProp = flatStyleProp.margin
      }
    }

    return {
      marginBottom: scrollViewBottomInset + scrollViewBottomInsetProp,
    }
  }, [scrollViewBottomInset, styleProp])

  const scrollViewProps = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
      ({
        keyboardDismissMode: Platform.OS === 'ios' ? 'interactive' : 'on-drag',
        keyboardShouldPersistTaps: 'handled',
        ...passthroughScrollViewProps,
        onScroll: handleScroll,
        contentContainerStyle: [
          contentContainerStyleProp,
          scrollViewContentContainerStyle,
        ],
        style: [styleProp, scrollViewStyle],
      } as TScrollViewProps),
    [
      contentContainerStyleProp,
      handleScroll,
      passthroughScrollViewProps,
      scrollViewContentContainerStyle,
      scrollViewStyle,
      styleProp,
    ],
  )
  const stickyFooterProps = useMemo(
    () => ({
      onLayout: handleStickyFooterLayout,
      style: [styles.stickyFooter, {bottom: stickyFooterOffset}],
    }),
    [handleStickyFooterLayout, stickyFooterOffset],
  )

  return {
    stickyFooter,
    containerStyle,
    scrollViewProps,
    scrollViewRef,
    stickyFooterProps,
    stickyFooterRef,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})
