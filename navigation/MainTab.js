import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../view/start/dashboard";

const Tab = createBottomTabNavigator();

const MainTab = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="dashboard" component={Dashboard}/>
        </Tab.Navigator>
    )

}

export default MainTab
