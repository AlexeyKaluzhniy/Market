import {IDatePickerProps} from "../../common/components/DatePickerOverlay";
import {Pages} from "../../navigation/pages";
import {Layout, Navigation} from "react-native-navigation";
import {isIos} from "../../core/theme/commonConsts";
import {i18next} from "../../common/localization/localization";

export function showDatePicker(params: IDatePickerProps) {
  const data: Layout<IDatePickerProps> = {
    component: {
      name: Pages.datePicker.name,
      id: Pages.datePicker.id,
      passProps: params,
      options: {
        topBar: {
          title: {
            text: i18next.t("pages.selectDate"),
          },
        },
      },
    },
  };

  if (isIos) {
    Navigation.showModal<IDatePickerProps>({
      stack: {
        children: [data],
      },
    });
  } else {
    Navigation.showOverlay<IDatePickerProps>(data);
  }
}
