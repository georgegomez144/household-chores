import {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import ChoreItem from "./ChoreItem";

import {getChores} from "../../services/api/chores";

import {type, colors, layout} from "../../shared/core";

export default function ChoresList() {
    const [isLoading, setLoading] = useState(true);
    const [chores, setChores] = useState();

    const getChoresAsync = async () => {
        try {
            const response = await getChores();
            const data = await response.json();
            console.log({data})
            setChores(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            getChoresAsync();
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
            }}>Chores:</Text>
            {chores && chores.map(chore => <ChoreItem key={chore.chore_id} {...chore} />)}
        </View>
    );
}
