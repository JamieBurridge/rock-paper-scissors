import { Image, Pressable, StyleSheet, View } from "react-native";

export default function Hand({
  handImage,
  hand,
  selectedHand,
  setSelectedHand,
  opponentSelectedHand,
}) {
  // Change styling if opponent or player has selected a hand
  const imageSelectedStyling =
    opponentSelectedHand && hand.name == opponentSelectedHand.name
      ? [styles.imageSelected, styles.opponentImageSelected]
      : selectedHand && hand.name == selectedHand.name
      ? [styles.imageSelected, styles.playerImageSelected]
      : styles.imageNotSelected;

  return (
    <Pressable onPress={() => setSelectedHand(hand)}>
      <View style={styles.imageContainer}>
        <Image
          source={handImage}
          style={[styles.image, imageSelectedStyling]}
          contentFit="cover"
          resizeMode="contain"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 80,
    height: 80,
  },

  image: {
    flex: 1,
    borderRadius: "4px",
  },

  imageSelected: {
    opacity: "1",
  },

  imageNotSelected: {
    opacity: "0.5",
  },

  playerImageSelected: {
    backgroundColor: "rgba(0, 255, 0, 0.5)",
  },

  opponentImageSelected: {
    backgroundColor: "rgba(255, 0, 0, 0.5)",
  },
});
