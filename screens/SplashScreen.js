import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export function SplashScreen() {
  return (
    <View style={[styles.container, {backgroundColor: "#E2e2e2"}]}>
      <Image
        style={styles.stretch}
        source={require('../img/a.png')}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stretch: {
    width: 100,
    height: 200,
    resizeMode: 'stretch',
  },
});