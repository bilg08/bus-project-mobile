import {
    View, TextInput, StyleSheet,
  } from 'react-native';
  import React from 'react';
  
  type Props = {
    label: string;
    value: string;
    editable: boolean;
    isEditing: boolean;
    error: boolean;
    onChange: any;
  };
  function InputWithLabel({
    label, value, editable, isEditing, onChange, error,
  }: Props)
    : JSX.Element {
    function getColor() {
      if (!isEditing && editable) {
        if (!error) {
          return 'black';
        }
        return 'red';
      }
      return 'green';
    }
  
    const styles1 = StyleSheet.create({
      body: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: getColor(),
      },
      label: {
      },
      input: {
        fontWeight: 'bold',
        color: 'black',
      },
    });
    return (
      <View style={styles1.body}>
        <TextInput
          value={value}
          editable={editable}
          placeholderTextColor="black"
          style={styles1.input}
          onChangeText={onChange}
        />
      </View>
    );
  }
  
  export default InputWithLabel;