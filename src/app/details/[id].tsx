import { View, Text, StyleSheet, Platform, Pressable, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Jugador } from '@/src/jugador';
import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Cargando from '@/src/componentes/Cargando';
import { defaultJugadorImage } from '@/src/app.config';

export default function Detalle() {
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
    
    if (jugador == null)
        return  <Cargando />;
    else
        return <DetalleComponent jugador={jugador} />
}

function DetalleComponent({jugador}: {jugador: Jugador}){
    const router = useRouter();
    const imageUrl = jugador.Image ? jugador.Image : defaultJugadorImage;

    const verVideoPress = () => {
        router.navigate(`/multimedia/${encodeURIComponent(jugador.Video ? jugador.Video : "novideo")}`);
    };

    const imagePress = () => {
        router.navigate(`./image/${encodeURIComponent(imageUrl)}`);
    }

    return  (
    <View style={styles.container}>
        <Pressable onPress={() => imagePress()}>
            <Image 
                style={styles.logo}
                source={{uri: imageUrl}}
            />
        </Pressable>
        <Text>Nombre: {jugador.Nombre}</Text>
        <Text>Dorsal: {jugador.Dorsal}</Text>
        <Text>Posicion: {jugador.Posicion}</Text>
        <Text>Edad: {jugador.Edad}</Text>
        <Text>Altura: {jugador.Altura}</Text>
        <Text>Nacionalidad: {jugador.Nacionalidad}</Text>
        <Text>Descripcion: {jugador.Descripcion}</Text>

        <Pressable onPress={() => verVideoPress()}>
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