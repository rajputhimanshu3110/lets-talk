import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS, FONT } from '../../constants/theme'
import { Button, Text, TextInput } from 'react-native-paper'
import Stepper from 'react-native-stepper-ui'
import { Stack, Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const StepA = (props) => {
    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="Mobile number" keyboardType='numeric' />
            <TextInput style={styles.input} mode="outlined" label="Name" />
        </View>
    );
};
const StepB = (props) => {
    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="OTP" placeholder='Enter OTP' />
        </View>
    );
};
const StepC = (props) => {
    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="Password" placeholder='Enter Password' />
            <TextInput style={styles.input} mode="outlined" label="Confirm Password" secureTextEntry placeholder='Re-Enter Password' />
        </View>
    );
};
const StepD = (props) => {
    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="Email" keyboardType='email-address' />
        </View>
    );
};

const content = [
    <StepA />,
    <StepB />,
    <StepC />,
    <StepD />
];
const SignUp = () => {
    const [active, setActive] = useState(0);
    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: ""
                }} />
            <View style={{ backgroundColor: COLORS.lightWhite, height: '100%' }}>
                <Text style={{ textAlign: 'center', marginTop: 30, fontFamily: FONT.bold }} variant='headlineSmall' >Sign up to Let's Chat</Text>
                <Text style={{ textAlign: 'center', fontFamily: FONT.regular, fontSize: 12 }} variant='headlineSmall' >
                    Have a account! <Link href='./Login'>Sign In</Link>
                </Text>
                <Stepper
                    active={active}
                    content={content}
                    stepStyle={{ backgroundColor: 'red' }}
                    wrapperStyle={{ margin: 35, marginVertical: 30 }}
                    // stepTextStyle={{ backgroundColor: 'red' }}
                    onBack={() => setActive((p) => p - 1)}
                    onFinish={() => alert('Finish')}
                    onNext={() => setActive((p) => p + 1)}
                    buttonStyle={{ flex: 1 }}
                />
                <StatusBar style="auto" />
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 15
    }
})

export default SignUp
