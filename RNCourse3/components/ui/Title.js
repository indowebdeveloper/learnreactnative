import { StyleSheet, Text } from "react-native";

const Title = ({ children }) => {
  return <Text style={style.title}>{children}</Text>;
};

const style = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
  },
});
export default Title;
