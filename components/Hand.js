import { Image, Pressable, StyleSheet, View } from "react-native";

export default function Hand({ handImage, hand, setSelectedHand }) {
  return (
    <Pressable onPress={() => setSelectedHand(hand)}>
      <View style={styles.imageContainer}>
        <Image
          source={handImage}
          style={styles.image}
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
  },
});
