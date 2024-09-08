import React, { useContext, useEffect, useState } from 'react'
import { BackHandler, ScrollView } from 'react-native'
import { Stack, useNavigation } from 'expo-router'
import { COLORS, FONT } from '../../constants/theme'
import { IconButton, Text, Searchbar } from 'react-native-paper'
import Chat from '../components/Chat'
import users from '../../sample/Users'
import * as Contacts from 'expo-contacts';
import UserService from '../../services/main/UserService'
import { DBContext } from '../../services/main/SQL'

const AddUser = () => {
    const { getContacts, syncContact } = useContext(DBContext);
    const navigation = useNavigation();
    const [user, setUser] = useState([]);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [contacts, setContacts] = useState(getContacts());

    const getContact = async () => {
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
                UserService.getAll(async (res) => {
                    if (res.status) {
                        const all = []
                        connections.forEach((u) => {
                            const num2 = u.number.replace(/\s+/g, '');
                            res.data.forEach((item) => {
                                if (item.mobile === parseInt(num2)) {
                                    item.name = u.name;
                                    all.push(item);

                                }
                            });
                        });
                        setUser(all);
                        await syncContact(all);
                    }
                })

            }
        }
    };

    useEffect(() => {
        const getC = async () => {
            const res = await getContacts();
            if (res.length == 0) {
                getContact();
            } else {
                setUser(res);
            }
        }
        getC();

    }, []);

    const onSearch = (text) => {
        setSearchQuery(text);
        var filteredUser = users.filter(item => item.name && item.name.includes(text));
        setUser(filteredUser);
    }

    useEffect(() => {
        const backAction = () => {
            if (showSearchBar) {
                setShowSearchBar(false);
            } else {
                navigation.goBack();
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [showSearchBar]);

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
                                    <IconButton icon="refresh" style={{ margin: 0 }}
                                        size={27} on onPress={() => getContact()} />

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
