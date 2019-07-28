# @alkafinance/react-native-keyboard-aware-scroll-view

[![npm package](https://img.shields.io/npm/v/@alkafinance/react-native-keyboard-aware-scroll-view.svg)](https://www.npmjs.org/package/@alkafinance/react-native-keyboard-aware-scroll-view)
[![CircleCI Status](https://img.shields.io/circleci/project/github/alkafinance/react-native-keyboard-aware-scroll-view/master.svg)](https://circleci.com/gh/alkafinance/workflows/react-native-keyboard-aware-scroll-view/tree/master)
![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg)
![MIT License](https://img.shields.io/npm/l/@alkafinance/react-native-keyboard-aware-scroll-view.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Extension to React Native ScrollView that prevents inputs from being covered by the keyboard.

<img src="./.github/demo.gif" width="auto" height="640">

## Getting started

`$ npm install @alkafinance/react-native-keyboard-aware-scroll-view --save`

## Usage

Import `KeyboardAwareScrollView`, `KeyboardAwareFlatList`, or `KeyboardAwareSectionList` and use them like the regular `ScrollView`, `FlatList` or `SectionList` components from React Native core. Internally, these components are wrapped in another custom component called `KeyboardAwareContainer`, which is also exported for advanced use cases.

```javascript
import {KeyboardAwareScrollView} from '@alkafinance/react-native-keyboard-aware-scroll-view';

function MyComponent() {
  return (
    <KeyboardAwareScrollView stickyFooter={<Button />}>
      <TextInput />
      <TextInput />
      <TextInput />
    </KeyboardAwareScrollView>
  )
}
```

## API

In addition to the regular `ScrollView`, `FlatList` or `SectionList` props, you can also provide the following props for extra customization:

### Props

- [`stickyHeader`](#stickyHeader)
- [`stickyFooter`](#stickyFooter)
- [`containerStyle`](#containerStyle)

---

# Reference

## Props

### `stickyHeader`

Used to display a persisted view above the scrollable content.

| Type              | Required |
| ----------------- | -------- |
| `React.ReactNode` | No       |

---

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
