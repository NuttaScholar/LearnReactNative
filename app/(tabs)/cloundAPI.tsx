import Button from "@/components/atom/Button";
import InputField from "@/components/atom/InputField";
import SelectField from "@/components/atom/SelectField";
import axios from "axios";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import JSONTree from "react-native-json-tree";

enum HttpMethod_e {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
type form_t = {
  url: string;
  method: HttpMethod_e;
  client_id?: string;
  token?: string;
  data?: string;
};

export default function AboutScreen() {
  // Hook ************************************
  const [form, setForm] = useState<form_t>({
    url: "",
    method: HttpMethod_e.GET,
  });
  const [response, setResponse] = useState<any>();
  // local variable ****************************
  const methodList = ["GET", "POST", "PUT", "DELETE"];
  const theme = useMemo(
    () => ({
      scheme: "customDark",
      author: "you",
      base00: "#1e1e1e",
      base01: "#252526",
      base02: "#373737",
      base03: "#808080",
      base04: "#d4d4d4",
      base05: "#e0e0e0",
      base06: "#f2f2f2",
      base07: "#ffffff",
      base08: "#d19a66",
      base09: "#d19a66",
      base0A: "#e5c07b",
      base0B: "#98c379",
      base0C: "#56b6c2",
      base0D: "#61afef",
      base0E: "#c678dd",
      base0F: "#be5046",
    }),
    []
  );
  // function *********************************
  const onSend = () => {
    const Axios = axios.create({
      baseURL: form.url,
      headers: { Authorization: `Device ${form.client_id}:${form.token}` },
    });
    switch (form.method) {
      case HttpMethod_e.DELETE:
        Axios.delete("")
          .then((val) => {
            setResponse(val.data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case HttpMethod_e.GET:
        Axios.get("")
          .then((val) => {
            setResponse(val.data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case HttpMethod_e.POST:
        Axios.post("", form.data)
          .then((val) => {
            setResponse(val.data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case HttpMethod_e.PUT:
        Axios.put("", form.data).then((val) => {
            setResponse(val.data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
    axios
      .get(form.url, {
        headers: { Authorization: `Device ${form.client_id}:${form.token}` },
      })
      .then((val) => {
        setResponse(val.data);
      })
      .catch((err) => {
        console.log(err);
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
        <InputField
          label="URL"
          onChange={(val) => {
            setForm({ ...form, url: val });
          }}
          value={form?.url}
          style_label={styles.text}
          style_field={styles.field}
        />

        <SelectField
          label="Method"
          list={methodList}
          value={form.method}
          style_label={styles.text}
          onChange={(text) => {
            setForm({ ...form, method: text as HttpMethod_e });
          }}
        />
        <InputField
          label="Client ID"
          onChange={(val) => {
            setForm({ ...form, client_id: val });
          }}
          value={form?.client_id}
          style_label={styles.text}
          style_field={styles.field}
        />
        <InputField
          label="Token"
          onChange={(val) => {
            setForm({ ...form, token: val });
          }}
          value={form?.token}
          style_label={styles.text}
          style_field={styles.field}
        />
        <InputField
          label="Data"
          onChange={(val) => {
            setForm({ ...form, data: val });
          }}
          value={form?.data}
          style_label={styles.text}
          style_field={styles.field}
        />
        <Button style={styles.button} label={"Send"} onClick={onSend} />
        <JSONTree data={response} theme={theme} />
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
  },
  field: {
    backgroundColor: "#DDDDDD",
    width: 200,
    borderWidth: 1,
    padding: 10,
    color: "#000",
  },
  selector: {
    width: 200,
    backgroundColor: "#DDDDDD",
    borderWidth: 1,
    margin: 4,
    color: "#000",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    width: 100,
    height: 40,
    justifyContent: "center",
    marginBottom: 8,
  },
});
