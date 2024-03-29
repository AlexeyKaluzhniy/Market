import {CommonStyles} from "~/core/theme/commonStyles";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {ImageOrVideo} from "react-native-image-crop-picker";
import DeleteIcon from "../../../../resources/icons/delete_x.svg";
import {Colors, LightThemeColors} from "~/core/theme/colors";
import {CommonSizes} from "~/core/theme/commonSizes";
import {windowHeight, windowWidth} from "~/core/theme/commonConsts";

interface IImageProps {
    images: ImageOrVideo[];
    setImages: ({images}: { images: ImageOrVideo[] }) => void;
}

export function AdvertiseImage({images, setImages}: IImageProps) {
    const removeImage = (image: ImageOrVideo) => {
        setImages({images: images.filter(i => i !== image)});
    };

    return (
        <View style={styles.container}>
            {images && images.map((image) => {
                return (
                    <View style={styles.imageContainer}>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => removeImage(image)}
                            activeOpacity={0.8}>
                            <DeleteIcon/>
                        </TouchableOpacity>
                        <Image source={{uri: image.path}} style={styles.image}/>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.row,
        ...CommonStyles.flex1,
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    image: {
        width: windowWidth / 390 * 166.5,
        height: windowHeight / 792 * 125,
        borderRadius: CommonSizes.borderRadius.extraSmall
    },
    imageContainer: {
        marginBottom: CommonSizes.margin.smallPlus,
        marginRight: CommonSizes.margin.smallPlus,
        marginTop: CommonSizes.margin.largePlus
    },
    deleteButton: {
        backgroundColor: LightThemeColors.outline,
        padding: CommonSizes.padding.extraSmallPlus,
        borderRadius: CommonSizes.borderRadius.extraLargePlus,
        borderWidth: CommonSizes.borderWidth.extraThin,
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'flex-end',
        borderColor: Colors.white,
        top: -CommonSizes.margin.smallPlus,
        right: -CommonSizes.margin.smallPlus
    }
});
