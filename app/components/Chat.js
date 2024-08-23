import React from 'react'
import { TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import { Text, Avatar } from 'react-native-paper'
import { useRouter } from 'expo-router'

const Chat = ({ item }) => {
    const router = useRouter();
    const openChat = (user) => {
        router.push({ pathname: '../Screens/ChatScreen', params: user });
    }
    return (
        <TouchableOpacity
            style={styles.userContainer}
            onPress={() => openChat(item)}
            onLongPress={() => Alert.alert("Hello")}
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
                <Text variant="labelSmall" numberOfLines={1} width={230}>{item.status}</Text>
            </View>
            <Text variant="labelLarge" style={{ marginLeft: 'auto' }}>3:30 PM</Text>

        </TouchableOpacity>
    )
}


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

export default Chat
