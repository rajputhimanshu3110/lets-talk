import React from 'react'
import { View, Text } from 'react-native'
import { FONT } from '../../constants/theme'
const Groups = () => {
    return (
        <View style={{ flex: 1, flexWrap: 'wrap', justifyContent: 'center', marginHorizontal: 'auto' }}>
            <Text style={{ fontFamily: FONT.medium, fontSize: 16 }}>
                Groups Feature will be rolled out soon
            </Text>
        </View>
    )
}

export default Groups