import React from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Avatar, Searchbar, Text } from 'react-native-paper'
import { useRouter } from 'expo-router'
import users from '../../sample/Users'
const Chats = ({ showSearchBar, setShowSearchBar }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const router = useRouter();
    const openChat = (user) => {
        router.push({ pathname: '../Screens/ChatScreen', params: user });
    }
    const RenderItem = ({ item }) => (

        <TouchableOpacity
            style={styles.userContainer}
            onPress={() => openChat(item)}
            key={item.name}
        >
            {item.avatar ?
                <Avatar.Image
                    source={{ uri: item.avatar }} size={40}
                /> :
                <Avatar.Icon size={40} icon="account" />
            }
            <View style={styles.userDetails}>
                <Text style={styles.userName} numberOfLines={1} width={180}>{item.name}</Text>
                <Text variant="labelSmall">Last Seen</Text>
            </View>
            <Text variant="labelLarge" style={{ marginLeft: 'auto' }}>3:30 PM</Text>

        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <Searchbar
                    placeholder="Enter to search user"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                />
                {users.map((item) => {
                    return <RenderItem item={item} />
                })}
            </ScrollView>

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
    searchBar: {
        margin: 10,
    }
})
