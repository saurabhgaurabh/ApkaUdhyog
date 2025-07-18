import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    loginContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
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
})

export default styles;