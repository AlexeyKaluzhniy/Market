/* eslint-disable camelcase */
import {Label} from "./components/Label";
import {styledLabels} from "./components/styledLabels";
import {Typography} from "./typography";
import {LabelTypes, LabelSizes} from "./types";

const typography = new Typography();
const Display = styledLabels.Display;
const Headline = styledLabels.Headline;
const Title = styledLabels.Title;
const Body = styledLabels.Body;
const LabelFont = styledLabels.Label;
const Regular = styledLabels.Regular;

export {
    typography,
    Display,
    Headline,
    Title,
    LabelFont,
    Body,
    Regular,
    Label,
    LabelTypes,
    LabelSizes,
};
