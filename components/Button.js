import { Pressable, StyleSheet } from "react-native";

export default function Button({ children, onPressFunction }) {
  return (
    <Pressable onPress={() => onPressFunction()}>
      <button style={styles.button}>{children}</button>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#32c256",
    border: "1px solid transparent",
    borderRadius: 3,
    boxShadow: "rgba(255, 255, 255, .4) 0 1px 0 0 inset",
    boxSizing: "border-box",
    color: "#fff",
    cursor: "pointer",
    display: "inline-block",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.15385,
    margin: 0,
    outline: "none",
    padding: 8,
    textAlign: "center",
    textDecoration: "none",
    userSelect: "none",
  },
});
