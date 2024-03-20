import {FlatList, Image, StyleSheet, View} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import React, {useMemo} from "react";
import {ImageResources} from "~/common/ImageResources.g";

interface IImagesListProps {
    images: ImageResources[];
}

export function ImagesList({images}: IImagesListProps) {
    const imageStyle = useMemo(() => {
        return images.length === 1 ? {width: '100%'} : {width: 294};
    }, [images.length]);

    const containerStyle = useMemo(() => {
        return images.length === 1 ? {flex: 1} : {};
    }, [images.length]);

    const renderItem = (image: ImageResources, index: number) => {
        return (
            <Image
                source={image}
                style={[styles.image, imageStyle, {marginRight: index == (images.length - 1) ? 0 : CommonSizes.margin.small}]}
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
