import React from 'react'
import { View, Text } from 'react-native'
import { FONT } from '../../constants/theme'
const Calls = () => {
    return (
        <View style={{ flex: 1, flexWrap: 'wrap', justifyContent: 'center', marginHorizontal: 'auto' }}>
            <Text style={{ fontFamily: FONT.medium, fontSize: 19 }}>
                Feature will be rolled out soon
            </Text>
        </View>
    )
}

export default Calls
