import { Text, View, FlatList, Pressable, StyleSheet, Image } from "react-native";
import { Jugador } from '../jugador'
import { useEffect, useState } from "react";
import { Platform } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { useRouter } from "expo-router";
import Cargando from "../componentes/Cargando";
import { defaultJugadorImage } from "../app.config";

export default function index() {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [jugadorSelectedId, setJugadorSelectedId] = useState<String>('');
  const router = useRouter();

  // Web
  useEffect(() => {
    if (!(Platform.OS === 'web'))
      return ;

    function onResult(QuerySnapshot: any) {
      const jugadoresData: Jugador[] = [];

      QuerySnapshot.forEach((element: any) => {
        const jugadorData = element.data();
        jugadoresData.push({
          ...jugadorData,
          id: element.id,
        });
      });
      
      setJugadores(jugadoresData);
    }
    
    function onError(error: any) {
      console.error(error);
    }
    
    const subscriber = onSnapshot(collection(getFirestore(), 'jugadores'), onResult, onError);
    
    return () => subscriber();
  
  }, [])

  const separator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: '#cccccc',
        marginVertical: 10,
      }}
    />
  );

  const handlePress = (jugador: Jugador) => {
    setJugadorSelectedId(jugador.id)
    router.navigate(`/details/${jugador.id}`)
  }

  const jugadorRender = ({ item }: { item: Jugador }) => (  
    <Pressable onPress={() => handlePress(item)}>
    <View>
      <Image 
          style={styles.logo}
          source={{
              uri: item.Image? item.Image: defaultJugadorImage,
          }}
      />
      <Text>Jugador Nº {item.Dorsal} - {item.Nombre}</Text>
    </View>
    </Pressable>
  );

  
  if (jugadores.length === 0)
    return  <Cargando />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={jugadores}
        renderItem={jugadorRender} 
        keyExtractor={(jugador: Jugador) => jugador.id}
        style={{ marginTop: 20, width: '80%' }}
        ItemSeparatorComponent={separator}  
      />
    </View>
  );
}


const styles = StyleSheet.create({
    logo: {
      width: 50, 
      height: 50,
      resizeMode: 'contain',
    },
  });