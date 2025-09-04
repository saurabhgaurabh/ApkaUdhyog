import { StyleSheet } from 'react-native';
import MainComponent from './src/screens/main';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';


const App = () => {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
