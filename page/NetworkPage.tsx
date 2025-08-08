import Button from "@/components/atom/Button";
import * as Network from "expo-network";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NetworkPage() {
  // Hook *******************************
  const networkState = Network.useNetworkState();
  const [state, setState] = useState<Network.NetworkState>();
  const [ip, setIP] = useState("");
  const subscription = Network.addNetworkStateListener((value) => {
    setState(value);
  });
  // Event function *********************
  useEffect(() => {
    onReface();
  }, []);
  const onGetIP = async () => {
    const res = await Network.getIpAddressAsync();
    setIP(res);
  };
  const onReface = async () => {
    const res = await Network.getNetworkStateAsync();
    setState(res);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Network screen.</Text>
      <Button label="Reface" onClick={onReface} />
      <Text style={styles.text}>{`Type: ${state?.type}`}.</Text>
      <Text style={styles.text}>{`Connected: ${state?.isConnected}`}.</Text>
      <Text style={styles.text}>
        {`InternetReachable: ${state?.isInternetReachable}`}.
      </Text>
      <Button label="Get IP Address" onClick={onGetIP} />
      <Text style={styles.text}>{`IP Address: ${ip}`}.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    //fontSize: 20,
    //textDecorationLine: "underline",
    //color: "#fff",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
