import {useState} from 'react'
import { Login } from '../Components/organisms/Login';
import Register from '../Components/organisms/Register';
import { ForgotPassword } from '../Components/organisms/ForgotPassword';
import Home from '../Components/organisms/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenHeaderBtn from '../Components/atoms/ScreenHeaderBtn';
import Products from '../Components/organisms/Products';
import { Image, TouchableOpacity } from 'react-native';
import Reports from '../Components/organisms/Reports';
import Stores from '../Components/organisms/Stores';
import Report from '../Components/organisms/Report';
import StoreDetails from '../Components/organisms/StoreDetails';
import ProductDetails from '../Components/organisms/ProductDetails';
import CodeVerification from '../Components/organisms/CodeVerification';
import ChangePassword from '../Components/organisms/ChangePassword';
import { 
          View, 
          Text } from 'react-native';
import MenuModal from '../Components/atoms/MenuModal';
import Settings from '../Components/organisms/Settings';
import { useLanguage } from '../Components/Localization/LanguageContext';
import { en, es } from '../Components/Localization';
import ReportView from '../Components/organisms/ReportView';
import FAQ from '../Components/organisms/FAQ';






import Ionicons from '@expo/vector-icons/Ionicons';


const Stack = createNativeStackNavigator();

const StackNavigator = ({}) => {
  const { language, setLanguage } = useLanguage();
  const LanguageObject = language === 'en' ? en : es;
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator initialRouteName='Login'>
          <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name='Login' component={Login}/>
              <Stack.Screen name='Register' component={Register} />
              <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
			  <Stack.Screen name='CodeVerification' component={CodeVerification} />
			  <Stack.Screen name='ChangePassword' component={ChangePassword} />

          </Stack.Group>
          <Stack.Group
            screenOptions={{
              headerRight: () => <ScreenHeaderBtn type={'icon'}/>,
              headerLeft: () => <ScreenHeaderBtn type={'image'} />,
              headerTitleAlign: 'center',
            }}
          >
              <Stack.Screen name='Home' component={Home} options={{headerTitle: LanguageObject.home}} />
              <Stack.Screen name='Products' component={Products} options={{headerTitle: ''}} />
              <Stack.Screen name='Reports' component={Reports} options={{headerTitle: ''}} />
              <Stack.Screen name='Stores' component={Stores} options={{headerTitle: ''}} />
              <Stack.Screen name='Report' component={Report} options={{headerTitle: ''}} />
              <Stack.Screen name='StoreDetails' component={StoreDetails} options={{headerTitle: ''}} />
              <Stack.Screen name='ProductDetails' component={ProductDetails} options={{headerTitle: ''}} />
              <Stack.Screen name='ReportView' component={ReportView} options={{headerTitle: ''}} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name='Settings' component={Settings} options={{headerTitle: LanguageObject.settings} }></Stack.Screen>
            <Stack.Screen name='FAQ' component={FAQ} options={{headerTitle: LanguageObject.faqTitle} }></Stack.Screen>
          </Stack.Group>
      </Stack.Navigator>
    </View>
  )
}

export default StackNavigator

