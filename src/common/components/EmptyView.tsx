import React, {FC, memo} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";
import {CommonSizes} from "../../core/theme/commonSizes";
import {CommonStyles} from "../../core/theme/commonStyles";
import {Roboto} from "../../infrastructure";

interface IProps {
    title: string;
    description: string;
}

export const EmptyView: FC<IProps> = memo(({title, description}) => {
    return (
        <View style={styles.container}>
            <Roboto.Title.Medium>{title}</Roboto.Title.Medium>
            <Roboto.Label.Medium text={description}/>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.flexCenter,
        padding: CommonSizes.spacing.medium,
    } as ViewStyle,
});
