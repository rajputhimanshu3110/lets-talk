import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { FONT } from '../../constants/theme'
import SessionService from '../../services/SessionService'



const Profile = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        const getToken = async () => {
            const userInfo = await SessionService.get.userInfo();
            setUser(userInfo);
        }
        getToken();
    }, [])
    if (user) {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Avatar.Image size={100} source={{ uri: user.profile }} />
                    </View>
                    <Text style={{ fontFamily: FONT.bold, textAlign: 'center', flex: 1 }} variant="headlineSmall">Hi, {user.name}</Text>
                    <View style={styles.DetailsContainer}>
                        <Text>Mobile Number :  {user.mobile || 'N/A'}</Text>
                        <Text>Email : {user.email}</Text>
                        <Text>About : {user.about}</Text>
                    </View>

                </View>
            </>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    imgContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    DetailsContainer: {
        flex: 3,
        marginHorizontal: 20
    }
})

export default Profile
