import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/helpers/StackNavigator';
import { LanguageProvider } from './src/Components/Localization/LanguageContext';


function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}

export default App;