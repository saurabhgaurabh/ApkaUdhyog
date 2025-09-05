import { StatusBar, StyleSheet } from "react-native";
import Colors from "./constants/color";
import Fonts from "./constants/fonts";

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
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  batch: {
    fontSize: 14,
    color: "#7f8378ff",
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  cost: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e91e63",
  },
  remarks: {
    fontSize: 12,
    color: "#7f8378ff",
    fontStyle: "italic",
  },
  ////////////////////
  itemBox: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  floatingBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  submitBtn: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    width: '50%',
  },
  btnBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  cancelBtn: {
    backgroundColor: "#f44336",
    height: 50,
    width: '50%',
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4, // Android shadow
  },
  submitBtn: {
    backgroundColor: "#4CAF50",
    height: 50,
    width: '50%',
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  dashTopBox: { display: 'flex', flexDirection: 'row', gap: 10, padding: 20,},
  dashBoxes: { flexDirection: 'column', flex: 1, backgroundColor: Colors.light, justifyContent: 'center', alignItems: 'center', borderRadius: 8, height: 60 },
  dashTextOne: { fontFamily: Fonts.boldItalic, fontSize: Fonts.sizes.regular, fontWeight: Fonts.weights.bold, color: Colors.primary },
  dashTextTwo: { fontFamily: Fonts.boldItalic, fontSize: Fonts.sizes.regular, fontWeight: Fonts.weights.bold, color: Colors.danger },

})

export default styles;