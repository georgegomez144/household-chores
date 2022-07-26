import {View, ScrollView, Text} from 'react-native'
import {layout, type} from "../shared/core";
import ChoresList from "../components/Chores/ChoreList";

export default function Chores() {

    return (
        <ScrollView
            style={{
                flex: 1
            }}
        >
            <View
                style={{
                    flex: 1,
                    ...layout.center,
                    paddingBottom: layout.margin * 5
                }}
            >

                <Text style={{...type.heading}}>Chores Page</Text>
                <ChoresList />
            </View>
        </ScrollView>
    );
}
