import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  loginHeading: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginInput: {
    marginBottom: 12,
  },
  LoginForgotText: {
    textAlign: 'right',
    color: '#447bf3ff',
    marginBottom: 16,
  },
  LoginButton: {
    marginVertical: 10,
    backgroundColor: '#4d67a1ff',
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
  },
  LoginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  LoginGoogleButton: {
    borderColor: '#db4437',
    marginTop: 10,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#777',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#2e6ef7',
    fontWeight: '600',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight || 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff' // Or use from your MainStyle
  },
  GradientText: {
    fontSize: 30,
    color: '#fff'
  },
  FlexContainer: {
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '5%',

  },
  FlexItems: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    width: '45%',
    borderRadius: 25,
    borderColor: '#7f8378ff',
    borderWidth: 1,
  },
  FlexText: {
    color: '#7f8378ff',
  },
  CardContainer: {
    // backgroundColor: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    padding: 10,
  },
  CardBody: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.5,
    shadowRadius: 2,
    width: '100%',
    height: 'auto',
  },
})

export default styles;