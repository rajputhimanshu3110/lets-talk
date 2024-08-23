import LoginComponent from './Screens/Login';
import { PaperProvider } from 'react-native-paper'
import HomeScreen from './Screens/HomeScreen';

export default function App() {
    return (
        <PaperProvider>
            <HomeScreen />
        </PaperProvider >

    );
}
