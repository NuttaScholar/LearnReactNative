import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

interface myProps {
    label: string;
    onClick: ()=>void;
}

const Button: React.FC<myProps> = (props) => {
  return (
    <TouchableHighlight onPress={props.onClick}>
      <View style={styles.button}>
        <Text>{props.label}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
export default Button;
