import {Pages} from "./pages";
import {LayoutBottomTabs, Navigation} from "react-native-navigation";
import {Tabs} from "./tabs";
import {i18next} from "../common/localization/localization";

import {Dimensions} from "react-native";
import {TabbarInactiveResources, TabbarLightResources} from "~/common/ImageResources.g";

export function setInitialRoot() {
    Navigation.setRoot({
        root: {
            component: {
                name: Pages.splash.name,
                id: Pages.splash.id,
                options: {
                    topBar: {
                        visible: false,
                    },
                },
            },
        },
    });
}

export async function setAuthRoot() {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: Pages.auth.name,
                        id: Pages.auth.id,
                        options: {
                            topBar: {
                                visible: false,
                            },
                        },
                    },
                }],
                options: {
                    animations: {
                        push: {
                            content: {
                                translationX: {
                                    from: Dimensions.get('window').width,
                                    to: 0,
                                    duration: 200
                                }
                            }
                        },
                        pop: {
                            content: {
                                translationX: {
                                    from: 0,
                                    to: Dimensions.get('window').width,
                                    duration: 200
                                }
                            }
                        }
                    }
                }
            },
        }
    });
}

export function bottomTabsLayout(): LayoutBottomTabs {
    return {
        id: Pages.tabs.id,
        options: {
            topBar: {
                visible: false
            },
        },
        children: [
            {
                stack: {
                    id: Tabs.main.id,
                    children: [
                        {
                            component: {
                                id: Pages.main.id,
                                name: Pages.main.name,
                            },
                        },
                    ],
                    options: {
                        bottomTab: {
                            text: i18next.t("pages.main"),
                            icon: TabbarInactiveResources.advertise,
                            selectedIcon: TabbarLightResources.advertise
                        },
                    },
                },
            },
            {
                stack: {
                    id: Tabs.favorite.id,
                    children: [
                        {
                            component: {
                                id: Pages.favorite.id,
                                name: Pages.favorite.name,
                            },
                        },
                    ],
                    options: {
                        bottomTab: {
                            text: i18next.t("pages.favorite"),
                            icon: TabbarInactiveResources.favorite,
                            selectedIcon: TabbarLightResources.favorite
                        },
                    },
                },
            },
            {
                stack: {
                    id: Tabs.profile.id,
                    children: [
                        {
                            component: {
                                id: Pages.profile.id,
                                name: Pages.profile.name,
                            },
                        },
                    ],
                    options: {
                        bottomTab: {
                            text: i18next.t("pages.profile"),
                            icon: TabbarInactiveResources.profile,
                            selectedIcon: TabbarLightResources.profile
                        },
                    }
                }
            }
        ]
    };
}


export const getBottomTabsLayout = () => {
    return {
        root: {
            bottomTabs: bottomTabsLayout(),
        }
    };
};
