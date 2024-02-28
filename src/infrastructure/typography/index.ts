/* eslint-disable camelcase */
import {Label} from "~/infrastructure";
import {styledLabels} from "./components/styledLabels";
import {Typography} from "./typography";
import {LabelTypes, LabelSizes} from "./types";

const typography = new Typography();

const Roboto = {
    Display: styledLabels.Display,
    Headline: styledLabels.Headline,
    Title: styledLabels.Title,
    LabelFont: styledLabels.Label,
    Body: styledLabels.Body,
};
const Regular = styledLabels.Regular;

export {
    typography,
    Roboto,
    Regular,
    Label,
    LabelTypes,
    LabelSizes,
};
