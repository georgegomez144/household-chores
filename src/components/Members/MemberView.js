import {View, Text} from "react-native";
import {colors, layout, type} from "../../shared/core";
import Elevations from "react-native-elevation";

export default function MemberView(props) {
    const {
        name,
        chores,
    } = props;

    const numberOfChores = Array.isArray(chores) ? chores.length : 1;

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 110,
                width: '30.3%',
                marginVertical: layout.margin / 4,
                marginHorizontal: '1.5%',
                backgroundColor: colors.white,
                borderRadius: layout.margin / 3,
                ...Elevations[4]
            }}
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
        </View>
    );
}
