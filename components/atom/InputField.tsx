import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";

interface myProps {
  label: string;
  onChange?: (text: string) => void;
  value?: string; 
  style_label?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
}

const InputField: React.FC<myProps> = (props) => {
  return (
    <View style={props.style||styles.container}>
      <Text style={props.style_label||styles.text}>{`${props.label}:`}</Text>
      <TextInput
        style={styles.input}
        onChangeText={props.onChange}
        value={props.value}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines||4}
        editable={props.editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  container: {
    gap: 8, justifyContent: "center", alignItems: "center", flexDirection: "row", margin: 8
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
  },
  input: {
    width: 200,
    borderWidth: 1,
    padding: 10,
  },
});
export default InputField;
