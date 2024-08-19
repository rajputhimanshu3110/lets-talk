import LoginComponent from './Screens/Login';
import { PaperProvider } from 'react-native-paper'
import HomeScreen from './Screens/HomeScreen';
import SignUp from './Screens/SignUp';

export default function App() {
    return (
        <PaperProvider>
            <HomeScreen />
        </PaperProvider >

    );
}
