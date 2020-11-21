import React from "react";
import { Text, TextInput } from "react-native";

const FancyInput = (props) => {
  return (
    <>
      <Text>{props.label} </Text>
      <TextInput
        style={props.style}
        onChangeText={(value) => props.onSetItem([props.item], value)}
        value={props.value}
        secureTextEntry={!!props.secure}
      />
    </>
  );
};

export default FancyInput;