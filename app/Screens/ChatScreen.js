import React, { useState, useContext, useEffect, useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router';
import { COLORS, FONT } from '../../constants/theme';
import { Avatar, Icon, IconButton, TextInput } from 'react-native-paper';
import Message from '../components/Message';
import { SocketContext } from '../../context/SocketContext';
import SessionService from '../../services/SessionService';
import { DBContext } from '../../services/main/SQL';


const ChatScreen = () => {
    const { saveMessage, getMessages } = useContext(DBContext);
    const { socket } = useContext(SocketContext);
    const [user, setUser] = useState();
    const item = useLocalSearchParams();
    const [value, setValue] = useState();
    const [messagesList, setMessagesList] = useState([]);
    const scrollViewRef = useRef();
    // console.log(item)

    useEffect(() => {
        const getToken = async () => {
            const userInfo = await SessionService.get.userInfo();
            setUser(userInfo);
            msgs = await getMessages(item.mobile);
            setMessagesList(msgs);
        }
        getToken();
    }, [])


    useEffect(() => {
        socket.on('message', async (data, callback) => {
            console.log("user is online");
            if (data.sender == item.mobile) {
                var today = new Date;
                var time = today.getHours() + ":" + (today.getMinutes() < 9 ? '0' + today.getMinutes() : today.getMinutes());
                setMessagesList(prevMessages => [
                    ...prevMessages,
                    { isReceived: true, message: data.message, time: time }
                ]);
            }
            else {
                console.log("wrong user")
            }
            callback({ status: true });
        })

        return () => {
            socket.off('message');
        };
    }, [socket])

    const sendMessage = () => {
        var today = new Date;
        var time = today.getHours() + ":" + (today.getMinutes() < 9 ? '0' + today.getMinutes() : today.getMinutes());
        socket.emit('message', { receiver: item.mobile, message: value, sender: user.mobile }, (res) => {
            if (res.status) {
                setValue('');
                setMessagesList([...messagesList, { isReceived: false, message: value, time: time }]);
                //save to local DB
                saveMessage({
                    user: item.mobile,
                    message: value,
                    isReceived: false,
                });
            }
        });
    }
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
            <ScrollView style={{ backgroundColor: COLORS.lightWhite }}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginVertical: 20, backgroundColor: 'pink', marginHorizontal: 40, borderRadius: 5 }}>
                    <Text style={{ paddingVertical: 10, paddingHorizontal: 10, textAlign: 'center' }}> <Icon source='lock' size={15} /> Calls & Messages are end to end encrypted. No one outside this can read or listen to them</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {messagesList.map((message, index) => {
                        return <Message key={message + index} message={message} />
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
                    right={<TextInput.Icon icon="send" disabled={value == '' ? true : false} onPress={sendMessage} />}
                />
            </View>
        </>
    );
}

export default ChatScreen
