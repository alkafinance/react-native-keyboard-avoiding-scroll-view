import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import {Button, Colors, TextInput, Title} from 'react-native-paper'
import {KeyboardAvoidingScrollView} from '../src'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingScrollView
        containerStyle={styles.container}
        contentContainerStyle={styles.content}
        stickyFooter={
          <View style={styles.footer}>
            <Button
              mode="contained"
              onPress={() => {
                // noop
              }}>
              Sign up
            </Button>
          </View>
        }>
        <Title style={styles.title}>Sign up with your email address</Title>
        <TextInput
          style={styles.textInput}
          placeholder="First name"
          textContentType="givenName"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last name"
          textContentType="familyName"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          style={styles.textInput}
          placeholder="What should we call you?"
          textContentType="nickname"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Address"
          textContentType="fullStreetAddress"
        />
        <TextInput
          style={styles.textInput}
          placeholder="City"
          textContentType="addressCity"
        />
        <TextInput
          style={styles.textInput}
          placeholder="State"
          textContentType="addressState"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Postal code"
          textContentType="postalCode"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone number"
          textContentType="telephoneNumber"
        />
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 16,
  },
  title: {},
  textInput: {
    marginTop: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
})
