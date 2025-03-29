import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
  Entypo,
} from "@expo/vector-icons";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  openCamera,
  pickImage,
  saveFile,
  createFolder,
  downloadFile,
} from "./buttonFunctions";

export default function HomeScreen() {
  const [text, setText] = useState(""); // State to store the input text

  const saveText = () => {
    if (text.trim() === "") {
      Alert.alert("Empty Input", "Please enter some text before saving.");
      return;
    }
    console.log("Saved Text:", text); // Replace this with file saving logic if needed
    Alert.alert("Text Saved", "Your text has been saved successfully!");
    setText(""); // Clear the input field after saving
  };

  const platformName = Platform.select({
    ios: "iOS",
    android: "Android",
    default: "Web",
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/logoexample.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.welcomeContainer}>
        <ThemedText style={styles.welcomeContainer} type="title">
          Willkommen in der {platformName}-Version der App!
        </ThemedText>
      </ThemedView>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem} onPress={openCamera}>
          <Ionicons name="camera" size={32} color="#1D3D47" />
          <ThemedText style={styles.gridItemText}>Open Camera</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={pickImage}>
          <MaterialIcons name="photo-library" size={32} color="#1D3D47" />
          <ThemedText style={styles.gridItemText}>Pick Image</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={saveFile}>
          <FontAwesome5 name="file-alt" size={32} color="#1D3D47" />
          <ThemedText style={styles.gridItemText}>Save File</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={createFolder}>
          <Feather name="folder-plus" size={32} color="#1D3D47" />
          <ThemedText style={styles.gridItemText}>Create Folder</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={downloadFile}>
          <Entypo name="download" size={32} color="#1D3D47" />
          <ThemedText style={styles.gridItemText}>Download File</ThemedText>
        </TouchableOpacity>
      </View>
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type something here..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveText}>
          <ThemedText style={styles.saveButtonText}>Save Text</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    padding: 5,
    alignItems: "center",
    backgroundColor: "#A1CEDC",
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 16,
    color: "#1D3D47",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  gridItem: {
    width: "45%",
    maxWidth: Platform.OS === "web" ? 200 : "45%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#A1CEDC",
    borderRadius: 8,
  },
  gridItemText: {
    marginTop: 8,
    fontSize: 14,
    color: "#1D3D47",
    textAlign: "center",
  },
  inputContainer: {
    padding: 16,
    marginTop: 16,
    backgroundColor: "#A1CEDC",
    borderRadius: 8,
  },
  textInput: {
    height: 40,
    borderColor: "#1D3D47",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#1D3D47",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1.2 }],
  },
});
