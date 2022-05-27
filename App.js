import {StatusBar} from 'expo-status-bar';
import {Text, View, ScrollView} from 'react-native';

import MembersList from './src/components/Members/MembersList';
import TodaysChoresList from "./src/components/Chores/TodaysChoreList";

import {type, colors, layout} from "./src/shared/core";

export default function App() {

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.backgroundColor
        }}>
            {/*<SafeAreaView style={{flex: 1}}>*/}
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: layout.padding,
                    marginTop: 40,
                    height: 50,
                    width: '100%',
                }}
            >
                <Text style={{
                    ...type.h2
                }}>Household Chores</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    ...layout.center,
                    paddingBottom: layout.margin * 4
                }}>
                    <TodaysChoresList />
                    <MembersList/>
                </View>
            </ScrollView>
            {/*</SafeAreaView>*/}
            <StatusBar style="auto" backgroundColor={colors.primary}/>
        </View>
    );
}
