import { StyleSheet, Text } from "react-native";

import Colors from "../../constants/colors";

const Hint = ({ children, style }) => {
  return <Text style={[styles.hint, style]}>{children}</Text>;
};
export default Hint;

const styles = StyleSheet.create({
  hint: {
    color: Colors.accent500,
    fontSize: 24,
    fontFamily: "open-sans",
  },
});
