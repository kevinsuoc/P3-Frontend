import { View, Text, StyleSheet, Platform, Pressable, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Jugador } from '@/src/jugador';
import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Cargando from '@/src/componentes/Cargando';
import { defaultJugadorImage } from '@/src/app.config';

export default function detalle() {
    const router = useRouter();
    const [jugador, setJugador] = useState<Jugador | null>(null);
    const { id } = useLocalSearchParams<{ id: string }>();

    // Web
    useEffect(() => {
        if (!(Platform.OS === 'web'))
            return;
        
        async function getJugador() {
            const docRef = doc(getFirestore(), 'jugadores', id);
            const j = await getDoc(docRef);
            setJugador(j.data() as Jugador);
        }
        
        getJugador();
    }, []);
    
    const handlePress = () => {
        router.navigate(`/multimedia/${encodeURIComponent(jugador!.Video? jugador!.Video : "novideo")}`)
    }
  
    if (jugador == null)
        return  <Cargando />;

    const imageUrl = jugador.Image? jugador.Image: defaultJugadorImage;
    console.log(imageUrl)
    return (
    <View style={styles.container}>
        <Image 
            style={styles.logo}
            source={{
                uri: imageUrl,
            }}
        />
        <Text>Nombre: {jugador.Nombre}</Text>
        <Text>Dorsal: {jugador.Dorsal}</Text>
        <Text>Posicion: {jugador.Posicion}</Text>
        <Text>Edad: {jugador.Edad}</Text>
        <Text>Altura: {jugador.Altura}</Text>
        <Text>Nacionalidad: {jugador.Nacionalidad}</Text>
        <Text>Descripcion: {jugador.Descripcion}</Text>

        <Pressable onPress={() => handlePress()}>
            <Text>Ver video</Text>
        </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 200, 
      height: 200,
      resizeMode: 'contain',
    },
  });