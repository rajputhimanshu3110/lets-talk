import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, BackHandler, Alert, ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { COLORS, FONT } from '../../constants/theme'
import { IconButton, Text, Searchbar } from 'react-native-paper'
import Chat from '../components/Chat'
import users from '../../sample/Users'

const AddUser = () => {
    const [user, setUser] = useState(users);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');


    const onSearch = (text) => {
        setSearchQuery(text);
        var filteredUser = users.filter(item => item.name && item.name.includes(text));
        setUser(filteredUser);
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.topBar },
                    headerTitle: props => {
                        return (
                            <>
                                {showSearchBar ?
                                    <Searchbar
                                        style={{ backgroundColor: 'transparent', marginRight: 25 }}
                                        placeholder="Enter name to serach"
                                        onChangeText={onSearch}
                                        value={searchQuery}
                                    />

                                    :
                                    <Text style={{ paddingLeft: 10, fontSize: 14, fontFamily: FONT.medium }} width={160} numberOfLines={1}>Select Contact</Text>
                                }
                            </>
                        )
                    },
                    headerBackVisible: false,
                    headerShadowVisible: false,
                    headerRight: () => {
                        return <>
                            {!showSearchBar && (
                                <>
                                    <IconButton icon="account-search" style={{ margin: 0 }}
                                        size={27} on onPress={() => setShowSearchBar(true)} />
                                    <IconButton icon="dots-vertical" style={{ margin: 0 }}
                                        size={27} />
                                </>
                            )
                            }
                        </>
                    }

                }} />

            <ScrollView>
                {user.map((message) => {
                    return <Chat item={message} />
                })}

            </ScrollView>
        </>
    )
}

export default AddUser
