import {PressableProps, StyleProp, ViewStyle} from "react-native";
import {RehydrateAction} from "redux-persist";
import {RootState} from "~/core/store/rootReducer";
import {TextInputMaskOptionProp, TextInputMaskTypeProp} from "react-native-masked-text";

export interface ICalendarSpec {
  sameDay: string;
  nextDay: string;
  lastDay: string;
  nextWeek: string;
  lastWeek: string;
  sameElse: string;
}

export interface INavigationPage {
  id: string;
  name: string;
}

export interface IGetOptions {
  title: string;
  screenId?: string;
  optionalButtons?: IGetOptionsOptionalButtons;
}

export interface IGetOptionsOptionalButtons {
  cancelButton?: boolean;
  hideBackButton?: boolean;
  filterTeams?: boolean;
  promotionsHistory?: boolean;
  infoButton?: boolean;
}

export interface IOnboardingData {
  header: string;
  body: string;
  buttons: IOnboardingButton[];
}

export interface IOnboardingButton {
  type: ButtonType;
  text: string;
  actionType: "continue" | "allowPush" | "register" | "login";
}

export enum LoadState {
  needLoad = "needLoad",
  idle = "idle",
  error = "error",
  allIsLoaded = "allIsLoaded",

  pullToRefresh = "pullToRefresh",

  firstLoad = "firstLoad",
  refreshing = "refreshing",
  loadingMore = "loadingMore",
}

export interface TouchablePlatformProps extends Omit<PressableProps, "style"> {
  style?: StyleProp<ViewStyle>;
}

export enum ButtonType {
  solid = "solid",
  borderless = "borderless",
  outline = "outline",
  outlineNegative = "outlineNegative",
}

export interface IReduxMeta<T> {
  requestId: string;
  arg: T;
}

export interface IListState<T> {
  data: T[];
  loadState: LoadState;
  error: string | null;
}

export interface ISection<T> {
  data: T[];
  id: string;
  title: string;
}

export interface RehydrateAppAction extends RehydrateAction {
  payload?: RootState;
}

export enum ErrorRepresentationType {
  input = "input",
  toast = "toast",
  alert = "alert",
}

export interface IErrorResult {
  message: string;
  visualRepresentation: ErrorRepresentationType;
}

export interface ITextInputMask {
  type: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  maxLength?: number;
}

export interface ISize {
  extraSmall: number;
  extraSmallPlus: number;
  small: number;
  smallPlus: number;
  medium: number;
  mediumPlus: number;
  large: number;
  largePlus: number;
  extraLarge: number;
  extraLargePlus: number;
}
