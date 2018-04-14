import React from "react";
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";

import Contacts from "./screens/Contacts";
import Favorites from "./screens/Favorites";
import Profile from "./screens/Profile";
import User from "./screens/User";
import Options from "./screens/Options";

import colors from "./utils/colors";


// ****************************************************************************
// Tab bar style
// ****************************************************************************
const getTabBarIcon = (icon) => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const ContactScreens = StackNavigator(
  {
    Contacts: {
      screen: Contacts
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Contacts",
    navigationOptions: {
      // tabBarIcon expects a function and will pass an object with `focused`
      // and tintColor properties
      tabBarIcon: getTabBarIcon("list")
    }
  }
);

const FavoritesScreens = StackNavigator(
  {
    Favorites: {
      screen: Favorites
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Favorites",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("star")
    }
  }
);

const UserScreens = StackNavigator(
  {
    User: {
      screen: User
    },
    Options: {
      screen: Options
    }
  },
  {
    mode: "modal",
    initialRouteName: "User",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("person")
    }
  }
);

const tabs = TabNavigator(
  {
    Contacts: {
      screen: ContactScreens
    },
    Favorites: {
      screen: FavoritesScreens
    },
    User: {
      screen: UserScreens
    }
  },
  {
    initialRouteName: "Contacts",
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight
      },
      showLabel: false,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark,
      renderIndicator: () => null
    }
  }
);

// ****************************************************************************
// Tab bar style
// ****************************************************************************

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
);

const DrawerContactScreens = StackNavigator(
  {
    Contacts: {
      screen: Contacts
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Contacts",
    navigationOptions: {
      drawerIcon: getDrawerItemIcon("list")
    }
  }
);

const DrawerFavoritesScreens = StackNavigator(
  {
    Favorites: {
      screen: Favorites
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Favorites",
    navigationOptions: {
      drawerIcon: getDrawerItemIcon("star")
    }
  }
);

const DrawerUserScreens = StackNavigator(
  {
    User: {
      screen: User
    },
    Options: {
      screen: Options
    }
  },
  {
    mode: "modal",
    initialRouteName: "User",
    navigationOptions: {
      drawerIcon: getDrawerItemIcon("person")
    }
  }
);

const drawer = DrawerNavigator(
  {
    Contacts: {
      screen: DrawerContactScreens
    },
    Favorite: {
      screen: DrawerFavoritesScreens
    },
    User: {
      screen: DrawerUserScreens
    }
  },
  {
    initialRouteName: "Contacts"
  }
);

export default tabs;
