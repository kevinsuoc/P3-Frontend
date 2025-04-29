import { Text, View, FlatList, Pressable, StyleSheet, Image, TextInput } from "react-native";
import { Jugador } from '../jugador'
import { useEffect, useState } from "react";
import { Platform } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { useRouter, useLocalSearchParams } from "expo-router";
import Cargando from "../componentes/Cargando";
import { defaultJugadorImage } from "../app.config";
import { Picker } from '@react-native-picker/picker';

export default function index() {
  const router = useRouter();
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [jugadoresFiltrados, setJugadoresFiltrados] = useState<Jugador[]>([]);
  const [nombreField, setNombreField] = useState<string>('');
  const [posicionField, setPosicionField] = useState<string>('');
  const { posicion, nombre } = useLocalSearchParams();

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
      
      setNombreField(nombre as string)
      setPosicionField(posicion as string)
      setJugadores(jugadoresData);
      filtarJugadores(nombre as string, posicion as string, jugadoresData);
    }
    
    function onError(error: any) {console.error(error);}
    
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

  const handleJugadorPress = (jugador: Jugador) => {router.navigate(`/details/${jugador.id}`)}

  const filtarJugadores = (nombre: string, posicion: string, jugadores: Jugador[]) => {
    const filtrados: Jugador[] = jugadores.filter((jugador) => {
      const normalize = (str: string) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const nombreMatch = nombre ? normalize(jugador.Nombre).includes(normalize(nombre)): true;
      const posicionMatch = posicion ? normalize(jugador.Posicion).includes(normalize(posicion)): true;

      return nombreMatch && posicionMatch;
    });

    setJugadoresFiltrados(filtrados)
  }

  const updateFilter = (n: string, p: string) => {
    router.setParams({posicion: p, nombre: n, });
    filtarJugadores(n, p, jugadores);
  }

  const jugadorRender = ({ item }: { item: Jugador }) => (  
    <Pressable onPress={() => handleJugadorPress(item)}>
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
      <TextInput
        onChangeText={(nombre: string) => {setNombreField(nombre); updateFilter(nombre, posicionField)}}
        value={nombre as string}
        placeholder="Nombre o Apellido"
      />
      <Picker 
        onValueChange={(posicion: string) => {setPosicionField(posicion); updateFilter(nombreField, posicion)}}
        selectedValue={posicion as string}
      >
        <Picker.Item label="Todos" value="" />
        <Picker.Item label="Alero" value="Alero" />
        <Picker.Item label="Base" value="Base" />
        <Picker.Item label="Escolta" value="Escolta" />
        <Picker.Item label="Pivot" value="Pivot" />
        <Picker.Item label="Ala-Pivot" value="Ala-Pivot" />
      </Picker>
      <FlatList
        data={jugadoresFiltrados}
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