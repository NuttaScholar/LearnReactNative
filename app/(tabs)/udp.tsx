import Button from "@/components/atom/Button";
import InputField from "@/components/atom/InputField";
import { Buffer } from "buffer";
import * as Network from "expo-network";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";
import dgram from "react-native-udp";
import UdpSocket from "react-native-udp/lib/types/UdpSocket";

(global as any).Buffer = (global as any).Buffer || Buffer;
// Type ***************************************
type Packets = {
  ip: string;
  port: number;
  data?: string;
};
// Function Component ************************
export default function Udp() {
  // Hook ************************************
  const [receive, setReceive] = useState<Packets>({ ip: "", port: 0 });
  const [send, setSend] = useState<Packets>({ ip: "", port: 0 });
  const [socket, setSocket] = useState<UdpSocket>();
  const [open, setOpen] = useState(false);
  // Get IP Address ***************************
  useEffect(() => {
    Network.getIpAddressAsync().then((res) => {
      setReceive({ ...receive, ip: res || "" });
    });
  }, []);
  // Local Function **************************
  const onSend = () => {
    socket?.send(
      send.data || "",
      undefined,
      undefined,
      send.port,
      send.ip,
      function (err) {
        if (err) throw err;
        console.log("Message sent!");
      }
    );
  };
  const onOpen = () => {
    const newSocket = dgram.createSocket({ type: "udp4", debug: false });
    setSocket(newSocket);
    newSocket.bind(receive.port);
    newSocket.once("listening", () => {
      console.log("Socket is listening");
      setOpen(true);
    });
    newSocket.on("message", function (msg, rinfo) {
      console.log("Message received", msg);
      setReceive({ ...receive, data: msg.toString() });
    });
  };
  const onClose = () => {
    socket?.close(() => {
      setOpen(false);
      console.log("Socket closed");
    });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true} // ✅ แสดง scrollbar
      >
        <Text style={styles.text}>Receive Packets</Text>
        <InputField
          label="IP"
          editable={false}
          value={receive.ip}
          style_label={styles.label}
          style_field={styles.field}
        />
        <InputField
          label="Port"
          onChange={(val) => {
            if (!isNaN(Number(val))) {
              setReceive({ ...receive, port: Number(val) });
            }
          }}
          value={receive.port.toString()}
          style_label={styles.label}
          style_field={styles.field}
        />
        <InputField
          label="Data"
          editable={false}
          value={receive.data}
          style_label={styles.label}
          style_field={styles.field}
        />
        <Button
          style={styles.button}
          label={open ? "CloseSocket" : "OpenSocket"}
          onClick={open ? onClose : onOpen}
        />
        <Text style={styles.text}>Send Packets</Text>
        <InputField
          label="IP"
          onChange={(val) => {
            setSend({ ...send, ip: val });
          }}
          value={send.ip}
          style_label={styles.label}
          style_field={styles.field}
        />
        <InputField
          label="Port"
          onChange={(val) => {
            if (!isNaN(Number(val))) {
              setSend({ ...send, port: Number(val) });
            }
          }}
          value={send.port.toString()}
          style_label={styles.label}
          style_field={styles.field}
        />
        <InputField
          label="Data"
          onChange={(val) => {
            setSend({ ...send, data: val });
          }}
          value={send.data}
          style_label={styles.label}
          style_field={styles.field}
        />
        <Button style={styles.button} label="Send" onClick={onSend} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    marginTop: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    width: 60,
    textAlign: "right",
  },
  field: {
    backgroundColor: "#DDDDDD",
    width: 200,
    borderWidth: 1,
    padding: 10,
    color: "#000",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    width: 100,
    height: 40,
    justifyContent: "center",
  },
});
