import {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import ChoreItem from "./ChoreItem";

import {getDay} from "../../services/api/days";

import {type, colors, layout} from "../../shared/core";

export default function TodaysChoresList() {
    const [isLoading, setLoading] = useState(true);
    const [chores, setChores] = useState();

    const getTodaysChoresAsync = async () => {
        try {
            const today = new Date().getDay() + 1;
            const response = await getDay(today);
            const data = await response.json();
            setChores(data.chores);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            getTodaysChoresAsync();
    }, [])

    return isLoading ? (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 50,
                width: '100%'
            }}
        >
            <ActivityIndicator size="small"/>
        </View>
    ) : (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 50,
                width: '100%'
            }}
        >
            <Text style={{
                ...type.h3,
                textAlign: 'center',
                padding: layout.padding,
                width: '100%',
            }}>Today's Chores:</Text>
            {chores && chores.map(chore => <ChoreItem key={chore.chore_id} {...chore} />)}
        </View>
    );
}
