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
  input: {
    marginBottom: 10,
    backgroundColor: "#ffffffff",
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  partyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  tag: {
    backgroundColor: "#ffe6e6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 10,
  },
  tagText: {
    fontSize: 12,
    color: "#ff4d4d",
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLeft: {
    flexDirection: "row",
  },
  column: {
    marginRight: 30,
  },
  label: {
    fontSize: 13,
    color: "#666",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  rowRight: {
    flexDirection: "row",
  },
  icon: {
    fontSize: 18,
    marginLeft: 15,
    color: "#444",
  },
  //  Item Screen CSS Starts

  itemBox: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  floatingBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#66BB6A",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  //  Item Screen CSS Ends

})

export default styles;