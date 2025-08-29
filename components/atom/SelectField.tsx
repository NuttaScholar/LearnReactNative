import { Picker } from "@react-native-picker/picker";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from "react-native";

interface myProps {
  label: string;
  list: string[];
  onChange?: (text: string, index:number) => void;
  value?: string;  
  style_label?: StyleProp<TextStyle>;
  style_field?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
}

const SelectField: React.FC<myProps> = (props) => {
  return (
    <View style={props.style || styles.container}>
      <Text style={props.style_label || styles.text}>{`${props.label}:`}</Text>
      <Picker
        selectedValue={props.value}
        onValueChange={props.onChange}
        style={props.style_field||styles.selector}
        enabled={props.editable !== false}
      >
        {props.list.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}        
      </Picker>
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
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
  },
  selector: {
    width: 200,
    borderWidth: 1,
    margin: 4,
    backgroundColor: "#DDDDDD",
  },
});
export default SelectField;
