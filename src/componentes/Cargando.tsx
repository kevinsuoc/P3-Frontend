import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Cargando(){
    return <View style={styles.container}><Text>Cargando...</Text></View>
}