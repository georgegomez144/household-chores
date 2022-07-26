import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationBar from "../components/NavigationBar";

import WhoAreYou from './WhoAreYou'
import Home from './Home'
import Schedule from './Schedule'
import Chores from './Chores'
import Admin from './Admin'
import Settings from './Settings'

const Tab = createBottomTabNavigator();

function FirstTimeLoadScreen(props) {
    return (
        <WhoAreYou {...props} />
    )
}

function PrivatePageToLoad(props) {
    return (
        <>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    cardShadowEnabled: false,
                    gestureEnabled: true,
                }}
                tabBar={tbProps => <NavigationBar {...tbProps} />}
            >
                <Tab.Screen name="Home">
                    {screenProps => <Home {...{...screenProps, ...props}} />}
                </Tab.Screen>
                <Tab.Screen name="Schedule">
                    {screenProps => <Schedule {...{...screenProps, ...props}} />}
                </Tab.Screen>
                <Tab.Screen name="Chores">
                    {screenProps => <Chores {...{...screenProps, ...props}} />}
                </Tab.Screen>
                <Tab.Screen name="Admin">
                    {screenProps => <Admin {...{...screenProps, ...props}} />}
                </Tab.Screen>
                <Tab.Screen name="Settings">
                    {screenProps => <Settings {...{...screenProps, ...props}} />}
                </Tab.Screen>
            </Tab.Navigator>
        </>
    )
}

export {
    PrivatePageToLoad,
    FirstTimeLoadScreen,
}
