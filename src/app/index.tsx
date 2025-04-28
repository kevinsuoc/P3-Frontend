import { Text, View, FlatList, Pressable, Button } from "react-native";
import { Jugador } from '../jugador'
import { firebaseConfig } from '../firebase.config';
import { useEffect, useState } from "react";
import { getApps, initializeApp } from '@react-native-firebase/app';
import { Platform } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { useRouter } from "expo-router";

export default function Render() {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [jugadorSelectedId, setJugadorSelectedId] = useState<String>('');
  const router = useRouter();

  // Web
  useEffect(() => {
    if (!(Platform.OS === 'web'))
      return ;

    if (getApps().length == 0)
      initializeApp(firebaseConfig);

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
    router.navigate('/details');
    console.log("Selected: ", jugadores.find((j: Jugador) => j.id === jugador.id))
  }

  const jugadorRender = ({ item }: { item: Jugador }) => (
    <Pressable
      onPress={() => handlePress(item)}
      style={({ pressed }: any) => [
        {
          padding: 10,
          backgroundColor: pressed || jugadorSelectedId === item.id ? '#D3D3D3' : 'transparent',
          borderRadius: 5,
          marginVertical: 5,
        },
      ]}
    >
    <View>
      <Text>Jugador Nº {item.Dorsal} - {item.Nombre}</Text>
    </View>
    </Pressable>
  );

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