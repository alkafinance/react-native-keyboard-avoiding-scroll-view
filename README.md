# react-native-keyboard-avoiding-scroll-view

[![npm package](https://img.shields.io/npm/v/react-native-keyboard-avoiding-scroll-view.svg)](https://www.npmjs.org/package/react-native-keyboard-avoiding-scroll-view)
[![CircleCI Status](https://img.shields.io/circleci/project/github/alkafinance/react-native-keyboard-avoiding-scroll-view/master.svg)](https://circleci.com/gh/alkafinance/workflows/react-native-keyboard-avoiding-scroll-view/tree/master)
![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg)
![MIT License](https://img.shields.io/npm/l/react-native-keyboard-avoiding-scroll-view.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

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

## API

In addition to the regular `ScrollView`, `FlatList` or `SectionList` props, you can also provide the following props for extra customization:

### Props

- [`stickyFooter`](#stickyFooter)
- [`containerStyle`](#containerStyle)

---

# Reference

## Props

### `stickyFooter`

Used to display a persisted view under the scrollable content. Sticky footer is always shown above the keyboard, which could be the desired behaviour for a submit button.

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
