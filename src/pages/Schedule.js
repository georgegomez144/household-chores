import {View, Text} from 'react-native'

import {layout, type} from '../shared/core'

export default function Schedule() {

    return (
        <View
            style={{
                ...layout.center
            }}
        >
            <Text style={{...type.heading}}>Schedule Page</Text>
        </View>
    );
}
