import {TouchableOpacity} from "react-native";
import CameraIcon from "../../../resources/icons/camera.svg";
import GalleryIcon from "../../../resources/icons/gallery.svg";
import {CommonStyles} from "~/core/theme/commonStyles";
import ImagePicker, {ImageOrVideo, Options} from "react-native-image-crop-picker";

interface IProps {
    isCamera?: boolean;
    images: ImageOrVideo[];
    setImage: (image: ImageOrVideo[]) => void;
}

const pickerOptions: Options = {
    height: 1000,
    width: 1000,
    cropping: true,
    compressImageQuality: 0.5,
    multiple: false,
    mediaType: "photo",
    includeBase64: true,
};

export function ImagePickerButton({isCamera, setImage, images}: IProps) {
    const openCamera = () => {
        ImagePicker.openCamera(pickerOptions)
            .then(image => setImage([...images, image]))
            .catch(error => console.warn(error));
    };

    const openGallery = () => {
        ImagePicker.openPicker(pickerOptions)
            .then(image => setImage([...images, image]))
            .catch(error => console.warn(error));
    };

    return (
        <TouchableOpacity style={CommonStyles.iconPadding} onPress={isCamera ? openCamera : openGallery}>
            {isCamera ? <CameraIcon/> : <GalleryIcon/>}
        </TouchableOpacity>
    );
}
