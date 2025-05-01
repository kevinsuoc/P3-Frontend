import { StyleSheet } from "react-native";

export const indexStyles = StyleSheet.create({
    mainView: {   
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoJugador: {
      width: 50, 
      height: 50,
      resizeMode: 'stretch',
    },
    separador: {
        height: 3,
        backgroundColor: '#cccccc',
        marginVertical: 20,
    },
    elementoListaJugador: {
        width: '80%',
    },
    jugadorView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
  });