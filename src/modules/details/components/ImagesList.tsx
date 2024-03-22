import {FlatList, Image, StyleSheet, View} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import React, {useMemo} from "react";
import {ImageResources} from "~/common/ImageResources.g";
import {windowWidth} from "~/core/theme/commonConsts";
import {CommonStyles} from "~/core/theme/commonStyles";

interface IImagesListProps {
    images: ImageResources[];
}

export function ImagesList({images}: IImagesListProps) {
    const imageStyle = useMemo(() => {
        return (index: number) => ({
            width: images.length == 1 ? '100%' : windowWidth / 390 * 294,
            marginRight: index == (images.length - 1) ? 0 : CommonSizes.margin.small
        });
    }, [images.length]);

    const containerStyle = useMemo(() => {
        return images.length === 1 ? CommonStyles.flex1 : {};
    }, [images.length]);

    const renderItem = (image: ImageResources, index: number) => {
        return (
            <Image
                source={image}
                style={[styles.image, imageStyle(index)]}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={({item, index}) => renderItem(item, index)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={containerStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: CommonSizes.margin.largePlus,
        overflow: 'hidden',
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
    },
    image: {
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
    }
});
