import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router';
import { COLORS, FONT } from '../../constants/theme';
import { Avatar, Icon, IconButton, TextInput } from 'react-native-paper';
import Message from '../components/Message';
import messages from '../../sample/Messages';
const ChatScreen = () => {
    const item = useLocalSearchParams();
    const [value, setValue] = useState();
    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.topBar },
                    headerTitle: props => {
                        return (
                            <>
                                <TouchableOpacity>
                                    <Text style={{ paddingLeft: 10, fontSize: 16, fontFamily: FONT.medium }} width={160} numberOfLines={1}>{item.name}</Text>
                                </TouchableOpacity>
                            </>
                        )
                    },
                    headerBackVisible: false,
                    headerRight: () => {
                        return <>
                            <IconButton icon="video" style={{ margin: 0 }}
                                size={27} />
                            <IconButton icon="phone" style={{ margin: 0 }}
                                size={23} />
                            <IconButton icon="dots-vertical" style={{ margin: 0 }}
                                size={27} />
                        </>
                    },

                    headerLeft: () => {
                        return <Avatar.Image style={{ marginVertical: 10 }}
                            source={{ uri: item.avatar }} size={40}
                        />
                    }

                }} />
            <ScrollView style={{ backgroundColor: COLORS.lightWhite }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginVertical: 20, backgroundColor: 'pink', marginHorizontal: 40, borderRadius: 5 }}>
                    <Text style={{ paddingVertical: 10, paddingHorizontal: 10, textAlign: 'center' }}> <Icon source='lock' size={15} /> Calls & Messages are end to end encrypted. No one outside this can read or listen to them</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {messages.map((message) => {
                        return <Message message={message} />
                    })}
                </View>
            </ScrollView>
            <View style={{ paddingVertical: 10, paddingHorizontal: 5, backgroundColor: COLORS.lightWhite }}>
                <TextInput
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                    placeholder="Enter Message to Send"
                    value={value}
                    style={{ borderRadius: 99, borderTopLeftRadius: 99, borderTopRightRadius: 99 }}
                    onChangeText={(text) => setValue(text)}
                    right={<TextInput.Icon icon="send" />}
                />
            </View>
        </>
    );
}

export default ChatScreen
