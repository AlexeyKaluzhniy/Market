import {BottomTabSelectedEvent, Layout, LayoutRoot, Navigation, Options} from "react-native-navigation";
import {INavigationPage} from "~/types";
import {logger} from "~/infrastructure/logger";
import {AppOptions, getAnimationOptions} from "~/services/navigationService/getAnimationOptions";
import {Tabs} from "~/navigation/tabs";

type AppNavigationOptions = {params?: object; screenIdSuffix?: string} & {options?: AppOptions} & {postOptions?: Options};

class NavigationService {
  stackId: string | undefined;

  constructor() {
    Navigation.events().registerBottomTabSelectedListener((event: BottomTabSelectedEvent) => {
      const tabIds = [
        Tabs.main,
        Tabs.search,
        Tabs.settings,
        Tabs.menu
      ];

      this.stackId = tabIds[event.selectedTabIndex].id;
    });

    this.pop = this.pop.bind(this);
    this.popAsync = this.popAsync.bind(this);
  }

  async setRootAsync(layout: LayoutRoot | (() => LayoutRoot)): Promise<string> {
    const rootLayout = typeof layout == "function" ? layout() : layout;
    const stackId = rootLayout.root?.component?.id || rootLayout.root.stack?.id;
    const tabsId = rootLayout.root?.bottomTabs?.options?.bottomTabs?.currentTabId || rootLayout.root?.bottomTabs?.children?.[0].stack?.id;

    this.stackId = stackId || tabsId;

    return Navigation.setRoot(rootLayout);
  }

  setRoot(layout: LayoutRoot | (() => LayoutRoot), callback?: () => void) {
    this.setRootAsync(layout).then(callback);
  }

  async navigateInStackAsync(
    stackId: string,
    page: INavigationPage,
    navPrams?: AppNavigationOptions,
  ): Promise<void> {
    const passOptions = {
      sideMenu: {
        left: {visible: false},
        right: {visible: false},
      },
      ...getAnimationOptions(navPrams?.options?.itemsToAnimate || []),
      ...navPrams?.options,
      itemsToAnimate: undefined,
    };

    if (passOptions?.itemsToAnimate != null) {
      delete passOptions.itemsToAnimate;
    }

    try {
      if (navPrams?.params) {
        Navigation.updateProps(page.id, passOptions);
      }
      await Navigation.popTo(page.id);
    } catch (error) {
      const navProps = {
        component: {
          id: navPrams?.screenIdSuffix ? page.id + navPrams.screenIdSuffix : page.id,
          name: page.name,
          passProps: navPrams?.params,
          options: passOptions,
        },
      };

      await Navigation.push(stackId, navProps);
      if (navPrams?.postOptions) {
        Navigation.mergeOptions(page.id, navPrams?.postOptions);
      }

      this.stackId = stackId;
    }
  }

  async navigateInStack(
    stackId: string,
    page: INavigationPage,
    navPrams?: AppNavigationOptions,
    callback?: () => void,
  ): Promise<void> {
    this.navigateInStackAsync(stackId, page, navPrams).then(callback);
  }

  async navigateAsync(page: INavigationPage, navPrams?: AppNavigationOptions): Promise<void> {
    if (this.stackId) {
      return this.navigateInStackAsync(this.stackId, page, navPrams);
    } else {
      logger.log("navigateAsync: no stack id found", {stackId: this.stackId});
    }
  }

  navigateFunc(page: INavigationPage, navPrams?: AppNavigationOptions, callback?: () => void) {
    return async () => this.navigateAsync(page, navPrams).then(callback);
  }

  navigate(page: INavigationPage, navPrams?: AppNavigationOptions, callback?: () => void) {
    this.navigateAsync(page, navPrams).then(callback);
  }

  async navigateWithoutTabsAsync(page: INavigationPage, navParams?: AppNavigationOptions): Promise<void> {
    return this.navigateAsync(page, {...navParams, options: {...navParams?.options, bottomTabs: {visible: false}}});
  }

  navigateWithoutTabsFunc(page: INavigationPage, navParams?: AppNavigationOptions, callback?: () => void) {
    return async () => this.navigateWithoutTabsAsync(page, navParams).then(callback);
  }

  navigateWithoutTabs(page: INavigationPage, navParams?: AppNavigationOptions, callback?: () => void) {
    this.navigateWithoutTabsAsync(page, navParams).then(callback);
  }

  updateOptions(options: Options, page?: INavigationPage) {
    const currentPage = page?.id || this.stackId;

    if (currentPage) {
      Navigation.mergeOptions(currentPage, options);
      if (options?.bottomTabs?.currentTabId) {
        this.stackId = options?.bottomTabs?.currentTabId;
      }
    } else {
      logger.log("updateOptions: no stack id found", {stackId: this.stackId});
    }
  }

  updateProps(props: object, callback?: () => void, page?: INavigationPage) {
    const currentPage = page?.id || this.stackId;

    if (currentPage) {
      Navigation.updateProps(currentPage, props, callback);
    } else {
      logger.log("updateProps: no stack id found", {stackId: this.stackId});
    }
  }

  async showModalAsync(page: INavigationPage, navParams?: AppNavigationOptions) {
    const data: Layout = {
      component: {
        name: page.name,
        id: page.id,
        options: {
          topBar: {
            visible: false,
          },
          ...navParams?.options,
        },
        passProps: navParams?.params,
      },
    };

    await Navigation.showModal({stack: {children: [data]}});

    if (navParams?.postOptions) {
      Navigation.mergeOptions(page.id, navParams?.postOptions);
    }
  }

  showModal(page: INavigationPage, navParams?: AppNavigationOptions, callback?: () => void) {
    this.showModalAsync(page, navParams).then(callback);
  }

  async popAsync(options?: Options, pageId?: string): Promise<string | void> {
    const componentId = this.stackId || pageId;
    if (componentId) {
      return Navigation.pop(componentId, options);
    } else {
      logger.log("pop: no stack id found", {stackId: this.stackId});
    }
  }

  pop(options?: Options, pageId?: string, callback?: () => void) {
    this.popAsync(options, pageId).then(callback);
  }

  async popToRootAsync(pageId?: string): Promise<string | void> {
    const componentId = this.stackId || pageId;
    if (componentId) {
      return Navigation.popToRoot(componentId);
    } else {
      logger.log("pop to root: no stack id found", {stackId: this.stackId});
    }
  }

  popToRoot(pageId?: string, callback?: () => void) {
    this.popToRootAsync(pageId).then(callback);
  }

  async showOverlayAsync(page: INavigationPage, navPrams: AppNavigationOptions) {
    await Navigation.showOverlay({
      component: {
        id: page.id,
        name: page.name,
        passProps: navPrams?.params,
        options: navPrams?.options,
      },
    });

    if (navPrams?.postOptions) {
      Navigation.mergeOptions(page.id, navPrams?.postOptions);
    }
  }

  showOverlay(page: INavigationPage, navPrams: AppNavigationOptions, callback?: () => void) {
    this.showOverlayAsync(page, navPrams).then(callback);
  }
}

export const navigation = new NavigationService();
