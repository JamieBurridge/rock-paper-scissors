import { StyleSheet, Text, View } from "react-native";

export default function ScoresText({ playerScore, opponentScore }) {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>Your score: {playerScore}</Text>
      <Text style={styles.scoreText}>Opponents score: {opponentScore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 50,
  },

  scoreText: {
    fontSize: 20,
  },
});
