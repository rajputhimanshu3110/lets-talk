import React, { useState } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Avatar, Searchbar, Text } from 'react-native-paper'
import { useRouter } from 'expo-router'
import users from '../../sample/Users'
import Chat from '../components/Chat'
const Chats = ({ showSearchBar }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [chatUsers, setChatUsers] = useState(users);

    const onSearch = (text) => {
        setSearchQuery(text);
        var filteredUser = users.filter(item => item.name && item.name.includes(text));
        setChatUsers(filteredUser);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={chatUsers}
                ListHeaderComponent={<Searchbar
                    placeholder="Enter to search user"
                    onChangeText={text => onSearch(text)}
                    value={searchQuery}
                    style={styles.searchBar(showSearchBar)}

                />}
                renderItem={({ item, index }) => {
                    return <Chat item={item} />
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.name}
            />

        </View>
    )
}

export default Chats

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 2,
        backgroundColor: '#fff',
    },
    userContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userDetails: {
        marginLeft: 15
    },
    userName: {
        fontSize: 18,
        color: '#333',
    },
    searchBar: (showSearchBar) => {
        return {
            margin: 10,
            display: showSearchBar ? '' : 'none',
        }
    }
})
