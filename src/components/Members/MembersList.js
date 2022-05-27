import {useState, useEffect} from 'react';
import {Text, View, Pressable, ActivityIndicator} from 'react-native';

import {getMembers} from "../../services/api/members";

import Elevations from 'react-native-elevation';
import {colors, type, layout} from "../../shared/core";

export default function MemberList(props) {

    const [isLoading, setLoading] = useState(true);
    const [members, setMembers] = useState();

    const getMembersAsync = async () => {
        setLoading(true);
        try {
            const response = await getMembers();
            const data = await response.json();
            setMembers(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMembersAsync();
    }, [])

    function goToMember(id) {
        console.log(`Go to member page by member id: ${id}`);
    }

    function MemberView(member) {
        const {member_id, name, chores} = member;
        const numberOfChores = Array.isArray(chores) ? chores.length : 1;
        return (
            <Pressable
                onPress={() => goToMember(member_id)}
                style={({pressed}) => [{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 110,
                    width: '30.3%',
                    marginVertical: layout.margin / 4,
                    marginHorizontal: '1.5%',
                    backgroundColor: pressed ? colors.primaryTransparency(0.2) : colors.white,
                    borderRadius: layout.margin / 3,
                    ...Elevations[pressed ? 2 : 4]
                }]}
            >
                <>
                    <Text
                        style={({pressed}) => [{
                            fontSize: 16,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            color: pressed ? color.white : color.textColor
                        }]}
                    >{name}</Text>
                    <Text>{numberOfChores} chores</Text>
                </>
            </Pressable>
        );
    }

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
                minHeight: 50,
                width: '100%',
                marginVertical: layout.margin
            }}
        >
            <Text style={{
                ...type.h3,
                textAlign: 'center',
                padding: layout.padding,
                width: '100%',
            }}>{members.length} Members:</Text>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    padding: layout.padding
                }}
            >
                {members && members.map(member => (
                    <MemberView
                        key={member.member_id}
                        {...member} />
                ))}
            </View>
        </View>
    );
}
