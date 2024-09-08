import { PaperProvider } from 'react-native-paper'
import HomeScreen from './Screens/HomeScreen';
import { ContextProvider } from '../context/SocketContext';

export default function App() {
    return (
        <PaperProvider>
            <HomeScreen />
        </PaperProvider >

    );
}
