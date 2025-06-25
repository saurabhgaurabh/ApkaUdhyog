import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import MainComponent from './src/screens/main';
import style from './src/mainStyle'


const App = () => {
  return (
    <MainComponent />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
