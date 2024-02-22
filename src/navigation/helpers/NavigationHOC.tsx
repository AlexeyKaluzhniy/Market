import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {
  ComponentWillAppearEvent,
  Navigation,
  NavigationComponentListener,
  NavigationComponentProps,
  NavigationFunctionComponent,
  Options,
} from "react-native-navigation";
import {gestureHandlerRootHOC} from "react-native-gesture-handler";
import {INavigationPage} from "~/types";
import {navigation} from "~/services";
import {reduxProvider} from "~/core/store/store";
import {getStackOptions} from "~/services/navigationService/getStackOptions";
import {TFuncKeyApp} from "~/common/localization/localization";
import {AppScreenContainer} from "~/components/AppScreenContainer";
import {LoadingComponent} from "~/common/components/LoadingComponent";

export interface AppNavigationComponentProps extends NavigationComponentProps {
  itemId?: string;
  updateProps: (props: object, callback?: () => void) => void;
  updateOptions: (options: Options, callback?: () => void) => void;
}

interface INavigationHOCProps<P extends NavigationComponentProps> {
  Component: AppNavigationComponent<any>;
  page: INavigationPage;
  useRedux?: boolean;
  useLazyRendering?: boolean;
  titleKey?: TFuncKeyApp | null;
}

export type NavigationHOCProps<P extends AppNavigationComponentProps> = INavigationHOCProps<P>;

export interface AppNavigationComponent<Props = {}> extends React.FunctionComponent<Props & AppNavigationComponentProps> {
  optionsMigrator?: (customOptions: Options) => Options;
  options?: ((props: Props & NavigationComponentProps) => Options) | Options;
}

export function NavigationHOC<P extends AppNavigationComponentProps>(
  {Component, titleKey, page, useRedux, useLazyRendering}: INavigationHOCProps<P>,
): NavigationFunctionComponent<P> {
  if (titleKey) {
    Component.options = getStackOptions(titleKey, page);
  }

  const WrappingComponent = useRedux ? gestureHandlerRootHOC(reduxProvider(Component)) : Component;

  const updatePropsLocal = (props: object, callback?: () => void) => navigation.updateProps(props, callback, page);
  const updateOptionsLocal = (props: Options) => navigation.updateOptions(props, page);

  // noinspection JSUnusedGlobalSymbols
  function Wrapper(props: P) {
    const [isDisplayed, setIsDisplayed] = useState<boolean | undefined>(undefined);

    useEffect(() => {
      // let focused = 0;
      const listener: NavigationComponentListener = {
        componentDidAppear: () => {
          /*focused = */Date.now();
        },
        componentDidDisappear: () => {
          // const time = Math.floor((Date.now() - focused) / 1000);
          // analytics.logEvent("screen_leave", {...props, time});
          //todo add analytics
        },
      };
      const appearListener = (event: ComponentWillAppearEvent) => {
        if (event.componentId == props.componentId && !isDisplayed) {
          setIsDisplayed(true);
        }
      };
      const unsubscribe = Navigation.events().registerComponentListener(listener, props.componentId);
      const willAppearUnsubscriber = useLazyRendering
        ? Navigation.events().registerComponentWillAppearListener(appearListener)
        : {
          remove: () => {
            /*ignore*/
          },
        };

      return () => {
        unsubscribe.remove();
        willAppearUnsubscriber.remove();
      };
    }, [isDisplayed, props]);

    if (useLazyRendering && isDisplayed == null) {
      return reduxProvider(AppScreenContainer)({Component: View, children: <LoadingComponent size={"large"} />});
    }

    return (
      <WrappingComponent
        {...props}
        updateProps={updatePropsLocal}
        updateOptions={updateOptionsLocal}
      />
    );
  }

  Wrapper.displayName = `NavigationHOC(${
    Component.displayName || Component.name
  })`;

  return Wrapper;
}
