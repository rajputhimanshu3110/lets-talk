import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Surface, Avatar } from 'react-native-paper'
const Message = ({ message }) => {
    return (
        <View style={{ alignItems: message.isReceived ? 'flex-start' : 'flex-end' }}>

            <Surface style={styles.messageBox(message.isReceived ? '#ededed' : 'skyblue')} elevation={1}>
                <Text style={styles.message(message.isReceived ? 'black' : 'brown')}>{message.message} </Text>
                <Text style={styles.time}>{message.time} </Text>
            </Surface>
        </View>

    )
}

export default Message

const styles = StyleSheet.create({
    messageBox: (color) => {
        return {
            padding: 10,
            paddingLeft: 20,
            backgroundColor: color,
            width: 'content-fit',
            maxWidth: 260,
            marginHorizontal: 10,
            marginVertical: 7,
            borderRadius: 18
        }
    },
    message: (color) => {
        return {
            color: color,
            fontSize: 14
        }
    },
    time: {
        color: 'grey',
        textAlign: 'right'
    }
})
