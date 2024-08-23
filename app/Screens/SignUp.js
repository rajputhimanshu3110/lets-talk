import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS, FONT } from '../../constants/theme'
import { Button, Text, TextInput } from 'react-native-paper'
import Stepper from 'react-native-stepper-ui'
import { Stack, Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import SessionService from '../../services/SessionService'
import AuthenticationService from '../../services/main/AuthenticationService'

const StepA = ({ formData, setFormData }) => {

    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="Mobile number" value={formData.mno} onChangeText={(text) => { setFormData({ ...formData, mno: text }) }} keyboardType='numeric' />
            <TextInput style={styles.input} mode="outlined" label="Name" value={formData.name} onChangeText={(text) => { setFormData({ ...formData, name: text }) }} />
        </View>
    );
};
const StepB = ({ formData, setFormData }) => {
    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="OTP" placeholder='Enter OTP' value={formData.otp} onChangeText={(text) => { setFormData({ ...formData, otp: text }) }} />
        </View>
    );
};
const StepC = ({ formData, setFormData }) => {
    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="Password" placeholder='Enter Password' value={formData.password} onChangeText={(text) => { setFormData({ ...formData, password: text }) }} />
            <TextInput style={styles.input} mode="outlined" label="Confirm Password" secureTextEntry placeholder='Re-Enter Password' value={formData.retype} onChangeText={(text) => { setFormData({ ...formData, retype: text }) }} />
        </View>
    );
};
const StepD = ({ formData, setFormData }) => {
    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="Email" keyboardType='email-address' value={formData.email} onChangeText={(text) => { setFormData({ ...formData, email: text }) }} />
            <TextInput style={styles.input} mode="outlined" label="About" value={formData.about} onChangeText={(text) => { setFormData({ ...formData, about: text }) }} />
        </View>
    );
};


const Signup = () => {
    const router = useRouter();
    const [active, setActive] = useState(0);
    const [validated, setIsValidated] = useState(false);
    const [formData, setFormData] = useState({ mno: '', name: '', about: '', password: '', retype: '', email: '' })


    const content = [
        <StepA formData={formData} setFormData={setFormData} validated={setIsValidated} />,
        // <StepB formData={formData} setFormData={setFormData} validated={setIsValidated} />,
        <StepC formData={formData} setFormData={setFormData} validated={setIsValidated} />,
        <StepD formData={formData} setFormData={setFormData} validated={setIsValidated} />
    ];

    const createAccount = () => {
        const param = {
            name: formData.name,
            mobile: formData.mno,
            about: formData.about,
            password: formData.password,
            email: formData.email,
            role: 2,
        }
        AuthenticationService.register(param, (res) => {
            if (res.status) {
                SessionService.set.token(res.data.token);
                SessionService.set.userInfo(res.data.user);
                setActive(0);
                setFormData({ mno: '', name: '', about: '', password: '', retype: '', email: '' })
                router.push('../../');
            }
        })
    }

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
                    onFinish={() => createAccount()}
                    onNext={() => setActive((p) => p + 1)}
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

export default Signup
