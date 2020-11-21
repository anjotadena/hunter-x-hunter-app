import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import FancyInput from "./components/FancyInput";

import AppStyle from "./AppStyle";
import ButtonStyle from "./styles/buttons";

const styles = StyleSheet.create({
  ...AppStyle,
  ...ButtonStyle,
});

function App(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* INPUT */}
      <FancyInput
        label={"Email address"}
        style={styles.input}
        item={'email'}
        value={email}
        onSetItem={(key, value) => setEmail(value)}
      />

      <FancyInput
        label={"Password"}
        style={styles.input}
        item={'password'}
        value={password}
        onSetItem={(key, value) => setPassword(value)}
        secure={true}
      />

      {/* BUTTON */}
      <TouchableOpacity style={[styles.commonButton, styles.loginButton]}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;
