import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router';
import { COLORS, FONT } from '../../constants/theme';
import { Avatar, IconButton, TextInput } from 'react-native-paper';
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
                                <Text style={{ paddingLeft: 10, fontSize: 16, fontFamily: FONT.medium }} width={200} numberOfLines={1}>{item.name}</Text>
                            </>
                        )
                    },
                    headerBackVisible: false,
                    headerRight: () => {
                        return <IconButton icon="dots-vertical"
                            size={27}
                            onPress={() => console.log('Pressed')} />
                    },

                    headerLeft: () => {
                        return <Avatar.Image style={{ marginVertical: 10 }}
                            source={{ uri: item.avatar }} size={40}
                        />
                    }

                }} />
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {messages.map((message) => {
                        return <Message message={message} />
                    })}
                </View>
            </ScrollView>
            <View>
                <TextInput
                    placeholder="Enter Message to Send"
                    value={value}
                    onChangeText={(text) => setValue(text)}
                    right={<TextInput.Icon icon="send" />}
                />
            </View>
        </>
    );
}

export default ChatScreen
