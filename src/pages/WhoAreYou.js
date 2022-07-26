import {useState, useEffect} from 'react';
import {View, Pressable, Text} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getMembers} from "../services/api/members";
import {colors, layout, type} from "../shared/core";
import Elevations from "react-native-elevation";

export default function WhoAreYou({handleReloadApp}) {
    const [members, setMembers] = useState({})

    const getMembersAsync = async () => {
        try {
            const response = await getMembers();
            const data = await response.json();
            setMembers(data);
        } catch (e) {
            console.error(e);
        }
    }

    const setMemberInStorage = async member => {
        try {
            const jsonValue = JSON.stringify(member);
            await AsyncStorage.setItem('device-member', jsonValue);
        } catch (e) {
            console.error(e)
        } finally {
            handleReloadApp()
        }
    }

    useEffect(() => {
        getMembersAsync();
    }, [])

    return (
        <View
            style={{
                ...layout.center,
                flex: 1,
                backgroundColor: colors.backgroundColor
            }}
        >
            <Text style={{...type.mediumText}}>Welcome to your</Text>
            <Text style={{
                ...type.heading,
                marginBottom: layout.margin * 4,
            }}>Household Chores</Text>
            <Text style={{
                ...type.title,
                marginBottom: layout.margin,
            }}>So, who are you?</Text>
            <View
                style={{
                    ...layout.center,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                {members.length && members.map(member => {
                    const {member_id, name} = member;
                    return (
                        <Pressable
                            key={`${member_id}_${name}`}
                            onPress={() => setMemberInStorage(member)}
                            style={{
                                ...layout.center,
                                height: '20%',
                                width: '45%',
                                margin: layout.margin / 4,
                                backgroundColor: colors.white,
                                borderRadius: layout.margin / 4,
                                ...Elevations[2]
                            }}
                        >
                            <Text style={{...type.capitalize, fontWeight: 'bold'}}>{name}</Text>
                        </Pressable>
                    )
                })}
            </View>
        </View>
    )
}
