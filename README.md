# react-native-keyboard-avoiding-scroll-view

[![npm version](https://img.shields.io/npm/v/react-native-keyboard-avoiding-scroll-view.svg)](https://www.npmjs.org/package/react-native-keyboard-avoiding-scroll-view)
[![CircleCI Status](https://img.shields.io/circleci/project/github/alkafinance/react-native-keyboard-avoiding-scroll-view/master.svg)](https://circleci.com/gh/alkafinance/workflows/react-native-keyboard-avoiding-scroll-view/tree/master)
![license: MIT](https://img.shields.io/npm/l/react-native-keyboard-avoiding-scroll-view.svg)
![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

React Native ScrollView extension that prevents inputs from being covered by the keyboard.

<img src="./.github/demo.gif" width="auto" height="640">

## Getting started

`$ npm install react-native-keyboard-avoiding-scroll-view --save`

## Usage

Import `KeyboardAvoidingScrollView`, `KeyboardAvoidingFlatList`, or `KeyboardAvoidingSectionList` and use them like the regular `ScrollView`, `FlatList` or `SectionList` components from React Native core. Internally, these components are wrapped in another custom component called `KeyboardAvoidingContainer`, which is also exported for advanced use cases.

```javascript
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

function MyComponent() {
  return (
    <KeyboardAvoidingScrollView stickyFooter={<Button />}>
      <TextInput />
      <TextInput />
      <TextInput />
    </KeyboardAvoidingScrollView>
  )
}
```

## Props

- [Inherited `ScrollView` props...](https://facebook.github.io/react-native/docs/scrollview.html#props)
  - or [inherited `FlatList` props...](https://facebook.github.io/react-native/docs/flatlist#props)
  - or [inherited `SectionList` props...](https://facebook.github.io/react-native/docs/sectionlist#props)

- [`stickyFooter`](#stickyFooter)
- [`containerStyle`](#containerStyle)

---

# Reference

## Props

### `stickyFooter`

Used to display a fixed view under the scrollable content. Sticky footer is always shown above the keyboard, which could, for example, be the desired behaviour for a submit button.

| Type              | Required |
| ----------------- | -------- |
| `React.ReactNode` | No       |

---

### `containerStyle`

Used to style the container component.

| Type                   | Required |
| ---------------------- | -------- |
| `StyleProp<ViewStyle>` | No       |

## License

[MIT License](./LICENSE) © Alka, Inc
