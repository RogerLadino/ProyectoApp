import { TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../constant/theme";
import { Ionicons } from '@expo/vector-icons';

const FloatingPlusButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button]}
    >
      <Ionicons name="add-outline" size={32} color={colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // sombra en Android
    shadowColor: "#000", // sombra en iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: colors.accent
  },
  plus: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: -2,
    color: colors.text,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 'auto',
    width: 'auto'
  },
});

export default FloatingPlusButton;
