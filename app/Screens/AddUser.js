import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, BackHandler, Alert, ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { COLORS, FONT } from '../../constants/theme'
import { IconButton, Text, Searchbar } from 'react-native-paper'
import Chat from '../components/Chat'
import users from '../../sample/Users'
import * as Contacts from 'expo-contacts';
import UserService from '../../services/main/UserService'

const AddUser = () => {
    const [user, setUser] = useState([]);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [contacts, setContacts] = useState([]);

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                var connections = [];
                data.forEach((people) => {
                    people.phoneNumbers.forEach((number) => {
                        connections.push({ name: people.name, number: number.number });
                    })
                })
                setContacts(connections);



                UserService.getAll((res) => {
                    if (res.status) {
                        const all = []
                        connections.forEach((u) => {
                            const num2 = u.number.replace(/\s+/g, '');
                            res.data.forEach(item => {
                                if (item.mobile === parseInt(num2)) {
                                    item.name = u.name;
                                    all.push(item);
                                }
                            });
                        });
                        setUser(all);
                    }
                })

            }
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

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
                {user.length ? user.map((message) => {
                    return <Chat item={message} />
                }) : <Text>No User Found</Text>}

            </ScrollView>
        </>
    )
}

export default AddUser
