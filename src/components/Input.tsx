import { StyleSheet, TextInput,View  } from "react-native";

function Input() {
    return (
      <View style={styles.body}>
        <TextInput 
            style={styles.input} 
            placeholderTextColor={'silver'} 
            placeholder="И-Майл"
        />
      </View>
    )
}

export default Input;
const styles = StyleSheet.create({
    body: {
        borderWidth: 1,
        width: 250,
        height: 40,
        borderColor: 'silver',
        borderRadius: 5,
    },
    input: {
        fontSize: 15,
        textAlign: 'left',
        justifyContent: 'center',
        fontWeight: 'bold',
    }
  })
  