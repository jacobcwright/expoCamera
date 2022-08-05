import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyCamera from "./Camera";
import React from "react";

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>REAL</Text>
      <Button
        title="Log in"
        onPress={() => {
          navigation.navigate("Camera");
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={MyCamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
