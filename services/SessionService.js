import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionService = {
    get: {
        token: async () => {
            const value = await AsyncStorage.getItem('token');
            return value;
        },
        userInfo: async () => {
            const value = await AsyncStorage.getItem('userInfo');
            return JSON.parse(value);
        }
    },
    set: {
        token: async (token) => {
            await AsyncStorage.setItem('token', token)
        },
        userInfo: async (data) => {
            await AsyncStorage.setItem('userInfo', JSON.stringify(data))
        }
    },
    signout: async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userInfo');
    },
    getAllkeys: async () => {
        const value = await AsyncStorage.getAllKeys();
        return value;
    }
}

export default SessionService;