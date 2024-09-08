import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { ContextProvider } from '../context/SocketContext';
import { SQLProvider } from '../services/main/SQL';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    })
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if (!fontsLoaded) return null;
    onLayoutRootView(); //have to fix this only for now it is
    return <>
        <ContextProvider>
            <SQLProvider>
                <Stack onLayout={onLayoutRootView} />
            </SQLProvider>
        </ContextProvider>
    </>
}

export default Layout
