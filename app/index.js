import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, StatusBar as SB } from 'react-native';
import LoginComponent from './Screens/Login';
import { PaperProvider } from 'react-native-paper'
import { Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router'
import { COLORS, FONT } from "../constants/theme";
import HomeScreen from './Screens/HomeScreen';

export default function App() {
    return (
        <PaperProvider>
            {/* <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: ""
                }} />
            <View style={{ backgroundColor: COLORS.lightWhite }}>
                <LoginComponent />
                <StatusBar style="auto" />
            </View> */}
            <HomeScreen />
        </PaperProvider >

    );
}
