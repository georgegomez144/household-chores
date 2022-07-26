import {colors, layout, type} from "../../shared/core";
import {Pressable, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Entypo} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export function TopBar(props) {
    const { setIsLoading, setIsInitialized } = props;

    const navigation = useNavigation();

    const logoutOfDevice = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('device-member');
        } catch (e) {
            console.error(e);
        } finally {
            setIsInitialized(false);
            setIsLoading(false);
        }
    }

    return (
        <View
            style={{
                display: 'flex',
                ...layout.rowSB,
                paddingHorizontal: layout.padding,
                marginTop: 40,
                height: 50,
                width: '100%',
            }}
        >
            <Text style={{
                ...type.heading
            }}>Household Chores</Text>
            {/*<Pressable
                onPress={logoutOfDevice}
            >
                <Text>Log Out</Text>
            </Pressable>*/}
            <Pressable
                onPress={() => navigation.navigate({name: 'Settings'})}
            >
                <Entypo name="cog" size={type.icon.large} color={colors.black} />
            </Pressable>
        </View>
    );
}
