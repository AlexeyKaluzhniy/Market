import {NavigationFunctionComponent} from "react-native-navigation";
import {Text, View} from "react-native";
import React from "react";

export const Main: NavigationFunctionComponent = (props): JSX.Element => {
  return (
      <View>
        <Text>Главная страница</Text>
      </View>
  );
};
