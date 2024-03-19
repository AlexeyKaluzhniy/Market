import {ImageOrVideo} from "react-native-image-crop-picker";

export interface IAdvertise {
    title: string;
    price: string;
    priceType: string;
    city: string;
    description: string;
    images: ImageOrVideo[];
}
