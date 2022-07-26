import {useState, useEffect} from "react";
import {RefreshControl, ScrollView, Text, View} from "react-native";
import {layout, type} from "../shared/core";


export default function Settings(props) {
    const [refreshing, setRefreshing] = useState(false);

    function onRefresh() {
        setRefreshing(true);
    }

    function handleFinishedRefresh(status) {
        setRefreshing(false);
    }

    useEffect(() => {
    }, [handleFinishedRefresh])

    return (
        <>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                style={{flex: 1}}
            >
                <View style={{
                    flex: 1,
                    ...layout.center,
                    paddingBottom: layout.margin * 5
                }}>
                    <Text style={{...type.heading}}>Settings Page</Text>

                    {/*
                        Add controls for basic settings like:
                        - Show DateTime Bar
                        - Color theme?
                        - Dark/Light theme
                     */
                    }
                </View>
            </ScrollView>
        </>
    );
}
