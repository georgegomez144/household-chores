import {useState, useEffect} from 'react';
import {Pressable, Text} from "react-native";
import {colors, layout, type} from "../../shared/core";
import Elevations from "react-native-elevation";

export default function MemberView(props) {
    const {
        member_id,
        name,
        chores,
        goToMember,
        clearSelection
    } = props;

    const [isSelected, setSelected] = useState(false);

    const numberOfChores = Array.isArray(chores) ? chores.length : 1;

    function selectMember() {
        setSelected(false);
        goToMember(member_id)
        setSelected(true);
    }

    useEffect(() => {
        if(clearSelection) setSelected(false);
    }, [clearSelection])

    return (
        <Pressable
            onPress={selectMember}
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
                borderWidth: isSelected ? 1 : 0,
                borderColor: colors.accent,
                ...Elevations[pressed ? 2 : 4]
            }]}
        >
            <>
                <Text
                    style={{
                        ...type.h3,
                        textTransform: 'capitalize',
                    }}
                >{name}</Text>
                <Text>{numberOfChores} chores</Text>
            </>
        </Pressable>
    );
}
