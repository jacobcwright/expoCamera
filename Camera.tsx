import { Camera, CameraPictureOptions } from "expo-camera";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import React from "react";
import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
// @ts-ignore
import Loading from "./assets/loading.gif";

export default function MyCamera() {
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(2);
  const [lastPhotoURI, setLastPhotoURI] = useState(null);
  const cameraRef = useRef(null);

  if (!status?.granted) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Text style={{ textAlign: "center" }}>
          We need access to your camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  if (lastPhotoURI !== null && lastPhotoURI !== "loading") {
    return (
      <ImageBackground
        source={{ uri: lastPhotoURI }}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#666",
            marginBottom: 40,
            marginLeft: 20,
          }}
          onPress={() => {
            setLastPhotoURI(null as any);
          }}
        >
          <Text style={{ fontSize: 30, padding: 10, color: "white" }}>❌</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  return (
    <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
      {lastPhotoURI === "loading" ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.loading}>Checking for 🍜...</Text>
          <Image source={Loading} style={styles.gif} />
        </View>
      ) : (
        <></>
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#666",
            marginBottom: 40,
            marginLeft: 20,
          }}
          onPress={() => {
            setType(type === 1 ? 2 : 1);
          }}
        >
          <Text style={{ fontSize: 30, padding: 10, color: "white" }}>🔄</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#666",
            marginBottom: 40,
            marginLeft: 20,
          }}
          onPress={async () => {
            setLastPhotoURI("loading" as any);
            if (cameraRef.current) {
              let photo = await (cameraRef.current as any).takePictureAsync();
              if (type === 2) {
                photo = await manipulateAsync(
                  photo.localUri || photo.uri,
                  [{ rotate: 180 }, { flip: FlipType.Vertical }],
                  { compress: 1, format: SaveFormat.PNG }
                );
              }
              setLastPhotoURI(photo.uri);
            }
          }}
        >
          <Text style={{ fontSize: 30, padding: 10, color: "white" }}>📸</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  loading: {
    fontSize: 30,
    alignSelf: "center",
    color: "black",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  gif: {
    width: 50,
    height: 50,
  },
});
