import {Image, StyleSheet, View} from "react-native";
import {CommonSizes} from "~/core/theme/commonSizes";
import {ImageResources} from "~/common/ImageResources.g";
import {windowWidth} from "~/core/theme/commonConsts";
import Carousel from "react-native-snap-carousel";

interface IImagesListProps {
    images: ImageResources[];
}

interface IRenderItem {
    item: ImageResources;
}

export function ImagesSlider({images}: IImagesListProps) {
    const itemWidth = windowWidth / 390 * 294;
    const sliderWidth = windowWidth - CommonSizes.margin.largePlus * 2;

    const renderItem = ({item}: IRenderItem) => {
        return <Image source={item} style={styles.image}/>
    };

    return (
        <View style={styles.container}>
            {images.length > 1 ?
                <Carousel
                    data={images}
                    renderItem={renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    scrollEnabled
                    vertical={false}
                    slideStyle={{alignItems: 'center'}}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={1}
                /> : <Image source={images[0]} style={styles.image}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: CommonSizes.margin.largePlus
    },
    image: {
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
        width: '100%',
    }
});
