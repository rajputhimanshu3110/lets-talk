import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, BackHandler, Alert } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper';
import { useRouter, Stack, Link } from 'expo-router';
import { FONT, COLORS } from '../../constants/theme';
import AuthenticationService from '../../services/main/AuthenticationService';
import SessionService from '../../services/SessionService';

const LoginComponent = () => {
    const router = useRouter();
    const [login, setLogin] = useState({ username: '', password: '' });
    const [isPassword, setIsPassword] = useState(true);
    const [validation, setValidation] = useState({ show: false, msg: '' });




    const LoggedIn = async () => {
        var param = {
            email: login.username,
            password: login.password
        };
        AuthenticationService.login(param, (res) => {
            if (res.status) {
                SessionService.set.token(res.data.token);
                SessionService.set.userInfo(res.data.user);
                router.push('../../');
            } else {
                setValidation({ show: true, msg: res.message });
            }

        })

    }

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Exit App', 'Are you sure you want to exit app?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "",
                    headerBackVisible: false,
                }} />
            <View style={{ backgroundColor: COLORS.lightWhite }}>
                <View style={styles.container}>
                    <Text variant="headlineSmall" style={{ textAlign: 'center', marginBottom: 20, fontFamily: FONT.bold }}>Login to Chat</Text>
                    <Text style={{ textAlign: 'center', fontFamily: FONT.regular, fontSize: 12 }} variant='headlineSmall' >
                        Don't Have a account! <Link href='./Signup'>Sign up</Link>
                    </Text>
                    <View style={{ marginHorizontal: 25 }}>
                        <TextInput style={styles.input} mode="outlined"
                            label="Username" value={login.username} onChangeText={(text) => setLogin({ ...login, username: text })} placeholder='Enter Username' />

                        <TextInput style={styles.input} mode="outlined" onChangeText={(text) => setLogin({ ...login, password: text })}
                            label="Password" value={login.password} secureTextEntry={isPassword} placeholder='Enter Password' right={<TextInput.Icon icon="eye" onPress={() => { setIsPassword(!isPassword) }} />} />
                        <Text style={{ display: validation.show ? '' : 'none', color: 'red' }}>{validation.msg}</Text>
                        <Button icon="login" style={{ marginTop: 20 }} mode="contained" onPress={() => LoggedIn()}>
                            Login
                        </Button>
                    </View>
                </View>
                <StatusBar style="auto" />
            </View>
        </>



    )
}


const styles = StyleSheet.create({
    input: {
        marginVertical: 10,
        fontFamily: FONT.regular
    },
    container: {
        height: '100%',
        marginTop: 200,
    }
});


export default LoginComponent
