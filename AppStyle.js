import { StyleSheet } from "react-native";
import Colors from "./styles/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        height: 50,
    },
    loginButton: {
        textAlign: "center",
        borderColor: "lightblue",
        alignItems: "center",
        padding: 15,
        backgroundColor: Colors.blue,
    },
});