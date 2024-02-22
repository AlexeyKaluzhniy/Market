import {TFuncKeyApp} from "~/common/localization/localization";
import {Options} from "react-native-navigation";
import {IGetOptions, IGetOptionsOptionalButtons, INavigationPage} from "~/types";
import {isIos} from "~/core/theme/commonConsts";
import {Components} from "~/navigation/components";

function getOptions({title, screenId, optionalButtons}: IGetOptions) {
  const options: Options = {
    topBar: {
      backButton: {
        visible: isIos,
      },
      title: {
        text: title,
        component: {
          id: Components.topBarTitle.id + screenId,
          name: Components.topBarTitle.name,
          passProps: {
            title,
            cancelButton: optionalButtons?.cancelButton,
            filterTeams: optionalButtons?.filterTeams,
            promotionsHistory: optionalButtons?.promotionsHistory,
            hideBackButton: isIos || optionalButtons?.hideBackButton,
            infoButton: optionalButtons?.infoButton,
          },
        },
      },
    },
  };

  return options;
}

export const getStackOptions = (
  i18nKey: TFuncKeyApp | null,
  screen: INavigationPage,
  optionalButtons?: IGetOptionsOptionalButtons,
) => (): Options => getOptions(
  {
    title: i18nKey as string || "",
    screenId: screen.id,
    optionalButtons,
  },
);
