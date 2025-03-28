import { Alert, Platform } from "react-native";
import { Camera } from "expo-camera";

import * as FileSystem from "expo-file-system";


import * as ImagePicker from "expo-image-picker";


export let selectedImageUri = "";

export const openCamera = async () => {
    if (Platform.OS === "web") {
        Alert.alert("Not Supported", "Camera functionality is not supported on the web.");
        return;
    }

    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
        Alert.alert(
            "Permission Denied",
            "Camera access is required to take a photo."
        );
        return;
    }

    Alert.alert(
        "Camera Access Granted",
        "You can now implement the camera functionality."
    );
};

export const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        Alert.alert(
            "Permission Denied",
            "Media library access is required to pick an image."
        );
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        if (Platform.OS !== "web") {
            const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
            if (fileInfo.exists && fileInfo.size && fileInfo.size > 2 * 1024 * 1024) {
                Alert.alert("File Too Large", "The selected file exceeds 2 MB.");
                return;
            }
        }

        selectedImageUri = result.assets[0].uri;
        Alert.alert("Image Selected", "You have successfully selected an image.");
        console.log(selectedImageUri);
    }
};

export const saveFile = async () => {
    if (Platform.OS === "web") {
        Alert.alert("Not Supported", "File saving is not supported on the web.");
        return;
    }

    const folderUri = FileSystem.documentDirectory + "exampleFolder/";
    const fileUri = folderUri + "example.txt";

    try {
        const folderInfo = await FileSystem.getInfoAsync(folderUri);
        if (!folderInfo.exists) {
            await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
        }

        await FileSystem.writeAsStringAsync(fileUri, "This is an example file.");
        Alert.alert("File Saved", `File saved to: ${fileUri}`);
        console.log(`File saved to: ${fileUri}`);
    } catch (error) {
        Alert.alert("Error", "Failed to save the file.");
        console.error(error);
    }
};

export const createFolder = async () => {
    if (Platform.OS === "web") {
        Alert.alert("Not Supported", "Folder creation is not supported on the web.");
        return;
    }

    const folderUri = FileSystem.documentDirectory + "exampleFolder/";

    try {
        const folderInfo = await FileSystem.getInfoAsync(folderUri);
        if (!folderInfo.exists) {
            await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
            Alert.alert("Folder Created", `Folder created at: ${folderUri}`);
            console.log(`Folder created at: ${folderUri}`);
        } else {
            Alert.alert("Folder Exists", "The folder already exists.");
        }
    } catch (error) {
        Alert.alert("Error", "Failed to create the folder.");
        console.error(error);
    }
};

export const downloadFile = async () => {
    if (Platform.OS === "web") {
        Alert.alert("Not Supported", "File downloading is not supported on the web.");
        return;
    }

    if (!selectedImageUri) {
        Alert.alert("No Image", "Please select an image first.");
        return;
    }

    try {
        const folderUri = FileSystem.documentDirectory + "downloadedImages/";
        const fileUri = folderUri + "downloadedImage.jpg";

        const folderInfo = await FileSystem.getInfoAsync(folderUri);
        if (!folderInfo.exists) {
            await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
        }

        await FileSystem.copyAsync({
            from: selectedImageUri,
            to: fileUri,
        });

        Alert.alert("File Downloaded", `File saved to: ${fileUri}`);
        console.log(`File saved to: ${fileUri}`);
    } catch (error) {
        Alert.alert("Error", "Failed to download the file.");
        console.error(error);
    }
};
