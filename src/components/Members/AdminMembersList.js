import {useState, useEffect} from 'react';
import {Text, View, Switch, Pressable, ActivityIndicator} from 'react-native';

import {getMembers, editMember, deleteMember} from "../../services/api/members";

import {colors, type, layout} from "../../shared/core";
import {Entypo} from "@expo/vector-icons";

export default function AdminMemberList({refreshRequested, handleFinishedRefresh}) {

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
            if (refreshRequested) handleFinishedRefresh();
        }
    };

    useEffect(() => {
        if (isLoading) getMembersAsync();
        if (refreshRequested) getMembersAsync()
    }, [refreshRequested])

    function handleEditMember(member) {
        alert(`Edit member: ${member.name}`);
    }

    function handleDeleteMember(member) {
        alert(`Delete member: ${member.name}`);
    }

    const handleToggleAdmin = async (member) => {
        try {
            const {member_id: id, admin} = member;
            const updatedMember = {
                ...member,
                admin: admin === '1' ? '0' : '1'
            }
            const response = await editMember(id, updatedMember);
            const data = await response.json();
            console.log({data})
        } catch (e) {
            console.error(e);
        } finally {
            alert('Member updated successfully');
        }
    }

    function RowHeaders({headers, headerSizes}) {
        return (
            <View
                style={{
                    ...layout.row,
                    paddingVertical: layout.padding / 2,
                    backgroundColor: colors.lightestGray
                }}
            >
                {headers && headers.map((header, index) => (
                    <View
                        key={`header-${index}`}
                        style={{
                            ...headerSizes[index] || 'auto',
                            paddingHorizontal: layout.padding / 2
                        }}
                    >
                        <Text style={{
                            ...type.h5,
                            ...type.uppercase
                        }}>{header}</Text>
                    </View>
                ))}
            </View>
        );
    }

    function MemberRow({member, index}) {
        const {name, admin} = member;
        return (
            <View
                style={{
                    ...layout.row,
                    paddingVertical: layout.padding / 1.3,
                    paddingHorizontal: layout.padding,
                    borderTopWidth: index === 0 && 1,
                    borderBottomWidth: 1,
                    borderColor: colors.lightestGray,
                }}
            >
                <View style={{...layout.center}}>
                    <Switch
                        trackColor={{false: colors.lightGray, true: colors.primary}}
                        thumbColor={colors.white}
                        iosBackgroundColor={colors.lightGray}
                        onValueChange={() => handleToggleAdmin(member)}
                        value={admin === '1'}
                    />
                </View>
                <Text
                    style={{
                        flex: 1,
                        paddingHorizontal: layout.padding,
                        ...type.capitalize
                    }}
                >{name}</Text>
                <View
                    style={{
                        ...layout.rowSB,
                        width: 60
                    }}
                >
                    <Pressable
                        onPress={() => editMember(member)}
                    >
                        <Entypo name="edit" size={type.icon.medium} color={colors.primary}/>
                    </Pressable>
                    <Pressable
                        onPress={() => deleteMember(member)}
                    >
                        <Entypo name="trash" size={type.icon.medium} color={colors.danger}/>
                    </Pressable>
                </View>
            </View>
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
                width: '100%',
                marginVertical: layout.margin
            }}
        >
            <Text style={{
                ...type.title,
                textAlign: 'center',
                padding: layout.padding,
                width: '100%',
            }}>{members && members.length} Members:</Text>
            <RowHeaders headers={['admin', 'name', 'actions']}
                        headerSizes={[{width: 75}, {flex: 1}, {width: 80}]}/>
            {members && members.sort((a, b) => a.name > b.name).map((member, index) => (
                <MemberRow key={`member_${member.member_id}`} {...{member, index}}/>
            ))}
        </View>
    );
}
