/* eslint-disable camelcase */
import {styledLabels} from "./components/styledLabels";
import {Typography} from "./typography";
import {LabelTypes, LabelSizes} from "./types";
import * as Roboto from './components/Roboto';

const typography = new Typography();
const Regular = styledLabels.Regular;

export {
    typography,
    Roboto,
    Regular,
    LabelTypes,
    LabelSizes,
};
