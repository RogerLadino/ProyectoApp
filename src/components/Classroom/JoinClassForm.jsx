import React, { useState, useContext } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { ClassroomContext } from "../../context/ClassroomProvider";
import { ArrowRightCircleIcon } from 'react-native-heroicons/solid';

export default function JoinClassForm() {
  const [code, setCode] = useState("");
  const { joinClassroom } = useContext(ClassroomContext);

  const handleSubmit = async () => {
    if (!code.trim()) return;
    try {
      await joinClassroom(code.trim());
      setCode("");
    } catch (err) {
      console.error("Error al unirse a la clase:", err);
      // el context ya maneja los alerts
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Código del aula"
          placeholderTextColor="#888"
          value={code}
          onChangeText={setCode}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <ArrowRightCircleIcon size={20} color="#FBFBFB" />
          <Text style={styles.buttonText}>Unirse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    maxWidth: 400,
    width: "100%",
  },
  input: {
    flex: 1,
    backgroundColor: "#363031",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#FBFBFB",
  },
  button: {
    backgroundColor: "#F97E72",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    color: "#FBFBFB",
    fontSize: 16,
    fontWeight: "bold",
  },
});