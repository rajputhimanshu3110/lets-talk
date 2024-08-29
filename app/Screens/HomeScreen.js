import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, Alert } from 'react-native'
import { useRouter, Stack } from 'expo-router'
import { COLORS, FONT } from '../../constants/theme'
import { Avatar, BottomNavigation, Icon, IconButton } from 'react-native-paper'
import Chats from '../tabs/Chats'
import Groups from '../tabs/Groups'
import Calls from '../tabs/Calls'
import SessionService from '../../services/SessionService';
import Profile from './Profile';
import { io } from 'socket.io-client';

const HomeScreen = () => {

    const socket = useMemo(() => io('http://192.168.117.152:3000'), []);
    const [index, setIndex] = useState(3);
    const [user, setUser] = useState();
    const [showSearchBar, setShowSearchBar] = useState(false);
    const router = useRouter();
    const [routes] = React.useState([
        { key: 'chats', title: 'Chats', focusedIcon: 'message' },
        { key: 'groups', title: 'Groups', focusedIcon: 'account-group' },
        { key: 'calls', title: 'Call', focusedIcon: 'phone' },
        { key: 'profile', title: 'Profile', focusedIcon: 'account' },
    ]);



    useEffect(() => {
        const getToken = async () => {
            const token = await SessionService.get.token();
            const userInfo = await SessionService.get.userInfo();
            setUser(userInfo);
            if (!token) {
                router.push('./Screens/Login');
            }
            socket.emit('addSocket', { mobile: userInfo.mobile, socketID: socket.id });

        }
        getToken();
    }, [])

    const renderScene = BottomNavigation.SceneMap({
        chats: () => {
            return <Chats showSearchBar={showSearchBar} />
        },
        groups: () => {
            return <Groups />
        },
        calls: () => {
            return <Calls />
        },
        profile: () => {
            return <Profile />
        },
    });




    const logOut = () => {
        Alert.alert('Confirmation', 'Are you sure want to log out', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    SessionService.signout();
                    const value = await SessionService.getAllkeys();
                    console.log(value);
                    router.push('./Screens/Login');

                }
            },
        ]);
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.topBar },
                    headerTitle: "Let's Talk",
                    headerBackVisible: false,
                    headerRight: () => {
                        return <>
                            <IconButton icon="account-search"
                                size={27}
                                onPress={() => setShowSearchBar((value) => !value)} />
                            <IconButton icon="logout"
                                size={27}
                                onPress={() => logOut()} />
                            <IconButton icon="account-plus"
                                size={27}
                                onPress={() => router.push('./Screens/AddUser')} />
                        </>
                    },
                }} />
            <BottomNavigation
                style={{ height: 10 }}
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </>
    )
}

export default HomeScreen
