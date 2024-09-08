import React, { useState, useEffect } from 'react'
import { View, StyleSheet, BackHandler } from 'react-native'
import { COLORS, FONT } from '../../constants/theme'
import { Avatar, Button, Text, TextInput } from 'react-native-paper'
import Stepper from 'react-native-stepper-ui'
import { Stack, Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import SessionService from '../../services/SessionService'
import AuthenticationService from '../../services/main/AuthenticationService'
import * as ImagePicker from 'expo-image-picker';

const StepA = ({ formData, setFormData, handles }) => {
    const [error, setError] = useState({ show: false, msg: 'dfgvdf' });
    const validate = () => {
        if (formData.mno.length != 10) {
            setError({ show: true, msg: 'Invalid Mobile Number' });
            return;
        }

        if (formData.name.length < 3) {
            setError({ show: true, msg: 'Name must be at least 3 characters long.' });
            return;
        }
        setError({ show: false, msg: '' });
        handles.next();
    }
    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="Mobile number" value={formData.mno} onChangeText={(text) => { setFormData({ ...formData, mno: text }) }} keyboardType='numeric' />
            <TextInput style={styles.input} mode="outlined" label="Name" value={formData.name} onChangeText={(text) => { setFormData({ ...formData, name: text }) }} />
            <Text variant="labelMedium" style={{ color: 'red', display: (error.show ? '' : 'none') }}>{error.msg}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                <Button icon="arrow-right-bold" mode="contained" onPress={validate}>
                    Next
                </Button>
            </View>
        </View>
    );
};
const StepC = ({ formData, setFormData, handles }) => {
    const [error, setError] = useState({ show: false, msg: 'dfgvdf' });
    const validate = () => {
        if (!formData.password || !formData.retype) {
            setError({ show: true, msg: 'Password must haave some value' });
            return;
        }
        if (formData.password.length < 8) {
            setError({
                show: true, msg: 'Password must be at least 8 characters long.'
            });
            return;
        }
        if (formData.password !== formData.retype) {
            setError({
                show: true, msg: 'Both password must be same'
            });
            return;
        }

        setError({ show: false, msg: '' });
        handles.next();
    }
    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="Password" placeholder='Enter Password' value={formData.password} onChangeText={(text) => { setFormData({ ...formData, password: text }) }} />
            <TextInput style={styles.input} mode="outlined" label="Confirm Password" secureTextEntry placeholder='Re-Enter Password' value={formData.retype} onChangeText={(text) => { setFormData({ ...formData, retype: text }) }} />
            <Text variant="labelMedium" style={{ color: 'red', display: (error.show ? '' : 'none') }}>{error.msg}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                <Button icon="arrow-left-bold" mode="contained" onPress={handles.previous}>
                    Previous
                </Button>
                <Button icon="arrow-right-bold" mode="contained" onPress={validate}>
                    Next
                </Button>
            </View>
        </View>
    );
};
const StepD = ({ formData, setFormData, handles }) => {
    const [error, setError] = useState({ show: false, msg: 'dfgvdf' });
    const validate = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setError({ show: true, msg: 'Invalid email address' });
            return false;
        }
        setError({ show: false, msg: '' });
        handles.next();
    }
    return (
        <View style={{ marginVertical: 30 }}>
            <TextInput style={styles.input} mode="outlined" label="Email" keyboardType='email-address' value={formData.email} onChangeText={(text) => { setFormData({ ...formData, email: text }) }} />
            <TextInput style={styles.input} mode="outlined" label="About" value={formData.about} onChangeText={(text) => { setFormData({ ...formData, about: text }) }} />
            <Text variant="labelMedium" style={{ color: 'red', display: (error.show ? '' : 'none') }}>{error.msg}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                <Button icon="arrow-left-bold" mode="contained" onPress={handles.previous}>
                    Previous
                </Button>
                <Button icon="arrow-right-bold" mode="contained" onPress={validate}>
                    Next
                </Button>
            </View>
        </View>
    );
};

const AddProfile = ({ image, setImage, handles, finish }) => {
    const [error, setError] = useState({ show: false, msg: 'dfgvdf' });


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const validate = () => {
        setError({ show: false, msg: '' });
        handles.next();
    }
    return (
        <View style={{ marginVertical: 30 }}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginVertical: 20 }}>
                {image ? <Avatar.Image source={{ uri: image }} size={150} /> :
                    <Avatar.Icon size={150} icon="account" />}
            </View>
            <Button icon="arrow-up" mode="contained" onPress={pickImage}>
                Upload Profile
            </Button>


            <Text variant="labelMedium" style={{ color: 'red', display: (error.show ? '' : 'none') }}>{error.msg}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                <Button icon="arrow-left-bold" mode="contained" onPress={handles.previous}>
                    Previous
                </Button>
                <Button icon="check" mode="contained" onPress={finish}>
                    Finish
                </Button>
            </View>
        </View>
    );
};


const Signup = () => {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [active, setActive] = useState(3);
    const [formData, setFormData] = useState({ mno: '', name: '', about: '', password: '', retype: '', email: '' })

    const previous = () => {
        setActive(p => p - 1);
    }

    const next = () => {
        setActive(p => p + 1);
    }

    const createAccount = () => {
        const fd = new FormData();
        fd.append('image', {
            uri: image,
            name: 'photo.jpg',  // You can set the file name here
            type: 'image/jpeg', // Adjust the type based on the image format
        });
        const param = {
            name: formData.name,
            mobile: formData.mno,
            about: formData.about,
            password: formData.password,
            email: formData.email,
            role: 2,
        }

        AuthenticationService.uploadProfile(fd, (res) => {
            if (res.status) {
                AuthenticationService.register(param, (res) => {
                    if (res.status) {
                        SessionService.set.token(res.data.token);
                        SessionService.set.userInfo(res.data.user);
                        setActive(0);
                        setFormData({ mno: '', name: '', about: '', password: '', retype: '', email: '' })
                        // router.push('../../');
                    }
                })
            }
        })

    }

    const handles = { previous, next };

    const content = [
        <StepA formData={formData} setFormData={setFormData} handles={handles} />,
        // <StepB formData={formData} setFormData={setFormData} validated={setIsValidated} />,
        <StepC formData={formData} setFormData={setFormData} handles={handles} />,
        <StepD formData={formData} setFormData={setFormData} handles={handles} />,
        <AddProfile formData={formData} setFormData={setFormData} handles={handles} finish={createAccount} image={image} setImage={setImage} />
    ];


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
                    showButton={false}
                // stepTextStyle={{ backgroundColor: 'red' }}
                // buttonStyle={{
                //     flex: 1, backgroundColor: 'green', borderRadius: 99
                // }}
                // buttonTextStyle={{ textAlign: 'center', fontWeight: '900', fontFamily: FONT.regular }}
                // onBack={() => setActive((p) => p - 1)}
                // onFinish={() => createAccount()}
                // onNext={() => setActive((p) => p + 1)}
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
