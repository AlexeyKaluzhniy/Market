import {Image, StyleSheet, View} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ImageResources} from "~/common/ImageResources.g";
import {windowWidth} from "~/core/theme/commonConsts";
import Carousel from "react-native-snap-carousel";

interface IImagesListProps {
    images: ImageResources[];
}

export function ImagesList({images}: IImagesListProps) {
    const size = windowWidth / 390 * 294;

    return (
        <View style={styles.container}>
            {images.length > 1 ?
                <Carousel
                    data={images}
                    renderItem={(baseData) => {
                        return <Image source={baseData.item} style={styles.image}/>
                    }}
                    sliderWidth={size}
                    itemWidth={size}
                    scrollEnabled
                    vertical={false}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={1}
                /> : <Image source={images[0]} style={styles.image}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: CommonSizes.margin.largePlus,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
        width: '100%',
    }
});
