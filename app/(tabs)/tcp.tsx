import Button from "@/components/atom/Button";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import TcpSocket from "react-native-tcp-socket";

type endpoint = {
  ip: string;
  port: number;
};
function send(target: endpoint, data: string) {
  // สร้าง TCP Client
  const client = TcpSocket.createConnection(
    { port: target.port, host: target.ip }, // เปลี่ยนเป็น IP ของ Server
    () => {
      console.log("✅ Connected to server");
      client.write(data);
    }
  );

  // เมื่อได้รับข้อมูล
  client.on("data", (data) => {
    console.log("📩 Server says: " + data.toString());
    // Close socket
    client.destroy();
  });

  // เมื่อเกิดข้อผิดพลาด
  client.on("error", (error) => {
    console.log("❌ Error: " + error);
  });

  // เมื่อปิดการเชื่อมต่อ
  client.on("close", () => {
    console.log("🔌 Connection closed");
  });
}
function connect(target: endpoint) {
  // สร้าง TCP Client
  const client = TcpSocket.connect(
    { port: target.port, host: target.ip }, // เปลี่ยนเป็น IP ของ Server
    () => {
      console.log("✅ Connected to server");      
    }
  );

  // เมื่อได้รับข้อมูล
  client.on("data", (data) => {
    console.log("📩 Server says: " + data.toString());
  });

  // เมื่อเกิดข้อผิดพลาด
  client.on("error", (error) => {
    console.log("❌ Error: " + error);
  });

  // เมื่อปิดการเชื่อมต่อ
  client.on("close", () => {
    console.log("🔌 Connection closed");
  });
}
export default function App() {
  // Hook ************************************
  const [endpoint, setEndpoint] = useState<endpoint>({ ip: "", port: 0 });

  // Local Function **************************
  const onConnect = () => {
    connect(endpoint);
  };

  return (
    <View style={styles.container}>
      <Text>IP:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => {
          setEndpoint({ ...endpoint, ip: val });
        }}
        value={endpoint?.ip}
      />
      <Text>Port:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => {
          setEndpoint({ ...endpoint, port: Number(val) });
        }}
        value={endpoint?.port.toString()}
      />
      <Button label="Connect" onClick={onConnect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: {
    color: "#fff",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
