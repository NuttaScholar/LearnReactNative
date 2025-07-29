import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [tile, setTitle] = React.useState("Home screen.")
  const loginWithFacebook = ()=>{
    setTitle((prev)=>{return prev==="facebook"?"Home screen.":"facebook"});
  }
  return (
    <View style={styles.container}>
      <Text style={styles.tile}>{tile}</Text>     
      <Link href="/test" style={styles.button}>
          Go to TCP page!
        </Link>
      <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={loginWithFacebook}>
        Login with Facebook
      </FontAwesome.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tile: {
    color: "#fff",
    width: "100%",
    paddingTop: 40,
    paddingLeft: 8,
    paddingBottom: 8,

    fontSize: 24,
    fontWeight: 800
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
