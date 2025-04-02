import React, { useState, useEffect, useRef } from "react";
import { View, Button, Image, Alert, Platform, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export let selectedImageUri = "";

// Dummy-Funktion für openCamera
export const openCamera = async () => {
    Alert.alert("Dummy Function", "openCamera function called.");
};

// Dummy-Funktion für pickImage
export const pickImage = async () => {
    Alert.alert("Dummy Function", "pickImage function called.");
};

// Dummy-Funktion für saveFile
export const saveFile = async () => {
    Alert.alert("Dummy Function", "saveFile function called.");
};

// Dummy-Funktion für createFolder
export const createFolder = async () => {
    Alert.alert("Dummy Function", "createFolder function called.");
};

// Dummy-Funktion für downloadFile
export const downloadFile = async () => {
    Alert.alert("Dummy Function", "downloadFile function called.");
};
