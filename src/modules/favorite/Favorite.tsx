import {FlatList, StyleSheet, View} from "react-native";
import {NavigationFunctionComponent} from "react-native-navigation";
import React from "react";
import {CustomHeader} from "~/components/CustomHeader";
import {AddButton} from "~/components/AddButton";
import {CommonStyles} from "~/core/theme/commonStyles";
import {EmptyScreen} from "~/components/EmptyScreen";
import {ImageResources} from "~/common/ImageResources.g";
import {ThemeColors} from "~/core/theme/colors";
import {useThemedStyles} from "~/core/theme/hooks";

export const Favorite: NavigationFunctionComponent = (props): JSX.Element => {
    const images = null;
    const styles = useThemedStyles(stylesG);

    return (
        <View style={styles.container}>
            <CustomHeader id={props.componentId} headerTitle="pages.favorite"/>
            <FlatList
                data={images}
                renderItem={({item}) => {
                    return <View></View>;
                }}
                ListEmptyComponent={() =>
                    <EmptyScreen
                        image={ImageResources.heart}
                        title={"emptyScreen.favorite.title"}
                        text={"emptyScreen.favorite.text"}
                    />
                }
                contentContainerStyle={CommonStyles.flex1}
            />
            <AddButton/>
        </View>
    );
};

const stylesG = (colors: ThemeColors) => StyleSheet.create({
    container: {
        ...CommonStyles.flex1,
        backgroundColor: colors.background
    }
});
