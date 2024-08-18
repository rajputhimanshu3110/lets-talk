import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { COLORS, FONT } from '../../constants/theme'
import { Avatar, BottomNavigation, Icon, IconButton } from 'react-native-paper'
import Chats from '../tabs/Chats'
import Groups from '../tabs/Groups'
import Calls from '../tabs/Calls'

const HomeScreen = () => {
    const [index, setIndex] = useState(0);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [routes] = React.useState([
        { key: 'chats', title: 'Chats', focusedIcon: 'message' },
        { key: 'groups', title: 'Groups', focusedIcon: 'account-group' },
        { key: 'calls', title: 'Call', focusedIcon: 'phone' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        chats: Chats,
        groups: Groups,
        calls: Calls,
    });

    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.topBar },
                    headerTitle: "Let's Talk",
                    headerBackVisible: false,
                    headerRight: () => {
                        return <IconButton icon="account-search"
                            size={27}
                            onPress={() => console.log('Pressed')} />
                    },
                }} />
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </>
    )
}

export default HomeScreen
