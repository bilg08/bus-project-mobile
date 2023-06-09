import React from 'react';
import {View, Text} from 'react-native';

type Props = {
  title: string;
};
export function Header({title}: Props) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
