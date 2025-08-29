import Button from "@/components/atom/Button";
import InputField from "@/components/atom/InputField";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import TcpSocket from "react-native-tcp-socket";

type endpoint = {
  ip: string;
  port: number;
};

export default function App() {
  // Hook ************************************
  const [endpoint, setEndpoint] = useState<endpoint>({ ip: "", port: 0 });
  const [data, setData] = useState("");
  const [recive, setRecive] = useState("");
  const [socket, setSocket] = useState<TcpSocket.Socket>();
  const [connected, setConnected] = useState(false);
  // Local Function **************************
  const onConnect = () => {
    const tcpSocket = TcpSocket.createConnection(
      { port: endpoint.port, host: endpoint.ip },
      () => {
        console.log("✅ Connected to server");
        setConnected(true);
        // เมื่อได้รับข้อมูล
        tcpSocket.on("data", (data) => {
          const res = data.toString();
          console.log("📩 Server says: " + res);
          setRecive(res);
        });

        // เมื่อปิดการเชื่อมต่อ
        tcpSocket.on("close", () => {
          console.log("🔌 Connection closed");
        });
      }
    );
    // เมื่อเกิดข้อผิดพลาด
    tcpSocket.on("error", (error) => {
      console.log("❌ Error: " + error);
    });
    // จัดการเมื่อ timeout เกิดขึ้น
    tcpSocket.on("timeout", () => {
      console.log("⏱️ Connection timed out");
      tcpSocket.destroy(); // ปิด connection
      setConnected(false);
    });

    tcpSocket.setTimeout(5000);
    setSocket(tcpSocket);
  };
  const onDisconnect = () => {
    socket?.destroy();
    setConnected(false);
  };
  const onSend = () => {
    if (connected) {
      socket?.write(data);
    }
  };

  return (
    <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
      <InputField
        label="IP"
        onChange={(val) => {
          setEndpoint({ ...endpoint, ip: val });
        }}
        value={endpoint?.ip}
        style_label={styles.text}
      />
      <InputField
        label="Port"
        onChange={(val) => {
          if (!isNaN(Number(val))) {
            setEndpoint({ ...endpoint, port: Number(val) });
          }
        }}
        value={endpoint.port.toString()}
        style_label={styles.text}
      />
      <Button
        style={styles.button}
        label={connected ? "Disconnect" : "Connect"}
        onClick={connected ? onDisconnect : onConnect}
      />
      <InputField
        label="Recive"
        value={recive}
        style_label={styles.text}
        multiline
        editable={false}
      />
      <InputField
        label="Data"
        onChange={setData}
        value={data}
        style_label={styles.text}
      />
      <Button style={styles.button} label="Send" onClick={onSend} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
    width: 60,
    textAlign: "right",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    width: 100,
    height: 40,
    justifyContent: "center",
  },
});
