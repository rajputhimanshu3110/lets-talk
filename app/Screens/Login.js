import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator, MD2Colors, Text, TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { FONT } from '../../constants/theme';
const LoginComponent = () => {
    const router = useRouter();
    const [login, setLogin] = useState({ username: '', password: '' });
    const [isPassword, setIsPassword] = useState(true);
    const LoggedIn = () => {
        router.push('./Screens/HomeScreen');
    }
    return (
        <View style={styles.container}>
            <Text variant="headlineSmall" style={{ textAlign: 'center', marginBottom: 20, fontFamily: FONT.bold }}>Login to Chat</Text>
            <View style={{ marginHorizontal: 25 }}>
                <TextInput style={styles.input} mode="outlined"
                    label="Username" value={login.username} onChangeText={(text) => setLogin({ ...login, username: text })} placeholder='Enter Username' />

                <TextInput style={styles.input} mode="outlined" onChangeText={(text) => setLogin({ ...login, password: text })}
                    label="Password" value={login.password} secureTextEntry={isPassword} placeholder='Enter Password' right={<TextInput.Icon icon="eye" onPress={() => { setIsPassword(!isPassword) }} />} />

                <Button icon="login" style={{ marginTop: 20 }} mode="contained" onPress={() => LoggedIn()}>
                    Login
                </Button>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    input: {
        marginVertical: 10,
        fontFamily: FONT.regular
    },
    container: {
        marginTop: 200,
    }
});


export default LoginComponent
