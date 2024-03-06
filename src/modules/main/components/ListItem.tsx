import {Text, View} from "react-native";
import React from "react";

export function ListItem({item}) {
    return (
        <View>
            <Text>{item.title}</Text>
        </View>
    );
}
